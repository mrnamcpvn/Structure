using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using LinqKit;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
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
    private readonly IModelOperationRepository _repoModelOperation;
    private readonly IMapper _mapper;
    private readonly MapperConfiguration _configMapper;
    private readonly IModelRepository _repoModel;
    private readonly IProcessTypeRepository _repoProcessType;
    private IConfiguration _configuration;
    private string factory;
    public ModelOperationService(IModelOperationRepository repoModelOperation,
                                 IMapper mapper,
                                 MapperConfiguration configMapper,
                                 IModelRepository repoModel,
                                 IProcessTypeRepository repoProcessType,
                                 IConfiguration configuration)
    {
        
      _repoModelOperation = repoModelOperation;
      _mapper = mapper;
      _configMapper = configMapper;
      _repoModel = repoModel;
      _repoProcessType = repoProcessType;
      _configuration = configuration;
      factory = configuration.GetSection("AppSettings:Factory").Value;
    }

    public async Task<bool> Add(ModelOperationDTO model)
    {
      var modelParam = new ModelOperationEditParam();
            modelParam.factory_id = model.factory_id;
            modelParam.model_no = model.model_no;
            modelParam.stage_id = model.stage_id;
            modelParam.operation_id = model.operation_id;
            var operation = await GetModelOperation(modelParam);
            if (operation == null)
            {
                var modelOperation = _mapper.Map<ModelOperation>(model);
                _repoModelOperation.Add(modelOperation);
                return await _repoModelOperation.SaveAll();
            }
            else return false;
    }

    public Task<bool> CheckExistKaizenAndRTF(ModelOperationDTO operation)
    {
      throw new System.NotImplementedException();
    }

    public async Task<bool> Delete(ModelOperationDTO operation)
    {
      if(await CheckExistKaizenAndRTF(operation)) {
                return false;
            } else {
                var modelOperation = _mapper.Map<ModelOperation>(operation);
                _repoModelOperation.Remove(modelOperation);
                return await _repoModelOperation.SaveAll();
            }
    }

    public async Task<object> GetAllProcessType()
    {
       return await _repoProcessType.FindAll(x => x.factory_id.Trim() == factory && x.is_active == true)
            .Select(x => new { x.process_type_id, x.process_type_name_en, x.sequence}).Distinct().OrderBy(x => x.sequence).ToListAsync();
    }

    public async Task<ModelOperationDTO> GetModelOperation(ModelOperationEditParam modelOperationEditParam)
    {
                  var data = await _repoModelOperation.GetByModelOperation(modelOperationEditParam);
            var models = _mapper.Map<ModelOperation, ModelOperationDTO>(data);
            return models;
    }

    public async Task<PagedList<ModelOperationDTO>> SearchModelOperation(PaginationParams param, ModelOperationParam modelParam)
    {
      var pred_Model = PredicateBuilder.New<ModelOperation>(true);
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

    public async Task<bool> Update(ModelOperationDTO model)
    {
      var modelOperation = _mapper.Map<ModelOperation>(model);
            _repoModelOperation.Update(modelOperation);
            return await _repoModelOperation.SaveAll();
    }
  }
}