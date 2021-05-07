using System;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using LinqKit;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using SmartTool_API._Repositories.Interfaces;
using SmartTool_API._Services.Interfaces;
using SmartTool_API.DTO;
using SmartTool_API.Helpers;
using SmartTool_API.Models;

namespace SmartTool_API._Services.Services
{
    public class ModelOperationService : IModelOperationService
    {
        private readonly IModelRepository _repoModel;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;
        private readonly IModelOperationRepository _repoModelOperation;
        private readonly IProcessTypeRepository _repoProcessType;
        private string factory;
        private readonly IMeasurement_RFTRepository _repoMeasurement;
        private readonly IKaizenRepository _repoKaizen;
        public ModelOperationService(IModelOperationRepository repoModelOperation, IConfiguration configuration, IMapper mapper, IModelRepository repoModel, IProcessTypeRepository repoProcessType, IMeasurement_RFTRepository repoMeasurement, IKaizenRepository repoKaizen)
        {
            _repoKaizen = repoKaizen;
            _repoMeasurement = repoMeasurement;
            _repoModelOperation = repoModelOperation;
            _configuration = configuration;
            _mapper = mapper;
            _repoModel = repoModel;
            _repoProcessType = repoProcessType;
            factory = configuration.GetSection("AppSettings:Factory").Value;
        }
        public async Task<OperationResult> Add(ModelOperationDTO model)
        {
            var modelParam = new ModelOperationEditParam();
            modelParam.factory_id = model.factory_id;
            modelParam.model_no = model.model_no;
            modelParam.stage_id = model.stage_id;
            modelParam.operation_id = model.operation_id;
            var operation = await GetModelOperation(modelParam);
            if (operation == null)
            {
                var modelOperation = _mapper.Map<Model_Operation>(model);
                _repoModelOperation.Add(modelOperation);
                if (await _repoModelOperation.SaveAll())
                    return new OperationResult { Caption = "Success", Message = "Add Model Operation Success", Success = true };
                else return new OperationResult { Caption = "Failed", Message = "Fail on Add Model", Success = false };
            }
            else return new OperationResult { Caption = "Failed", Message = "Fail on Add Model", Success = false };
        }

        public async Task<bool> CheckExistKaizenAndRTF(ModelOperationDTO operation)
        {
            if (await _repoKaizen.CheckExistsKaizen(operation) || await _repoMeasurement.CheckExistsRTF(operation))
                return true;
            return false;
        }

        public async Task<OperationResult> Delete(ModelOperationDTO operation)
        {
            if (await CheckExistKaizenAndRTF(operation))
            {
                return new OperationResult { Caption = "Failed", Message = "Fail on Delete Model Operation", Success = false };
            }
            else
            {
                var modelOperation = _mapper.Map<Model_Operation>(operation);
                _repoModelOperation.Remove(modelOperation);
                await _repoModelOperation.SaveAll();
                return new OperationResult { Caption = "Success", Message = "Delete Model Operation Success", Success = true };
            }
        }
        public async Task<object> GetAllProcessType()
        {
            return await _repoProcessType.FindAll(x => x.factory_id.Trim() == factory && x.is_active == true)
            .Select(x => new { x.process_type_id, x.process_type_name_en, x.sequence }).Distinct().OrderBy(x => x.sequence).ToListAsync();
        }

        public async Task<ModelOperationDTO> GetModelOperation(ModelOperationEditParam modelOperationEditParam)
        {
            var data = await _repoModelOperation.GetByModelOperation(modelOperationEditParam);
            var models = _mapper.Map<ModelOperationDTO>(data);
            return models;
        }

        public async Task<PagedList<ModelOperationDTO>> SearchModelOperation(PaginationParam param, ModelOperationParam modelParam)
        {
            var pred_Model = PredicateBuilder.New<Model_Operation>(true);
            if (!String.IsNullOrEmpty(modelParam.model_search))
            {
                pred_Model.And(x => x.model_no == modelParam.model_search);
            }
            if (!String.IsNullOrEmpty(modelParam.stage))
            {
                pred_Model.And(x => x.stage_id == modelParam.stage);
            }
            var listOperation = _repoModelOperation.FindAll(pred_Model).OrderBy(x => x.sequence).ThenBy(x => x.operation_id);
            var listProcessType = _repoProcessType.FindAll(x => x.factory_id.Trim() == factory && x.is_active == true);
            var listData = listOperation.Join(listProcessType, x => x.process_type_id, y => y.process_type_id,
                (x, y) => new ModelOperationDTO
                {
                    factory_id = x.factory_id,
                    model_no = x.model_no,
                    stage_id = x.stage_id,
                    operation_id = x.operation_id,
                    process_type_id = y.process_type_id,
                    process_type_name = y.process_type_name_en,
                    operation_name_local = x.operation_name_local,
                    operation_name_en = x.operation_name_en,
                    operation_name_zh = x.operation_name_zh,
                    sop_no = x.sop_no,
                    critical_quality = x.critical_quality,
                    critical_efficiency = x.critical_efficiency,
                    sequence = x.sequence,
                    create_by = x.create_by,
                    create_time = x.create_time,
                    update_time = x.update_time,
                    update_by = x.update_by,
                });
            return await PagedList<ModelOperationDTO>.CreateAsync(listData, param.PageNumber, param.PageSize);
        }

        public async Task<OperationResult> Update(ModelOperationDTO model)
        {
            var modelOperation = _mapper.Map<Model_Operation>(model);
            _repoModelOperation.Update(modelOperation);
            if (await _repoModelOperation.SaveAll())
            {
                return new OperationResult { Caption = "Success", Message = "Update Model Operation Success", Success = true };
            }
            return new OperationResult { Caption = "Failed", Message = "Fail on Update Model Operation", Success = false };
        }
    }
}