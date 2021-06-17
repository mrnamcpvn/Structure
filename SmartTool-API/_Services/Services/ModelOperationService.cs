using System.Threading.Tasks;
using AutoMapper;
using Microsoft.Extensions.Configuration;
using SmartTool_API._Repositories.Interfaces;
using SmartTool_API._Services.Interfaces;
using SmartTool_API.DTOs;
using SmartTool_API.Helpers;
using SmartTool_API.Models;

namespace SmartTool_API._Services.Services
{
    public class ModelOperationService : IModelOperationService
    {
        private readonly IModelOperationRepository _repoModelOperation;
        private readonly IProcessTypeRepository _repoProcessType;
        private readonly IModelTypeRepository _repoModel;
        private readonly IStageRepository _repoStage;
        private readonly IKaizenRepository _repoKaizen;
        private readonly IMeasurement_RFTRepository _repoMeasuremt;
        private readonly IMapper _mapper;
        private readonly MapperConfiguration _configMapper;

        private string factory;
        public ModelOperationService(
            IModelOperationRepository repoModelOperation, 
            IProcessTypeRepository repoProcessType, 
            IModelTypeRepository repoModel, 
            IStageRepository repoStage, 
            IKaizenRepository repoKaizen, 
            IMeasurement_RFTRepository repoMeasuremt, 
            IMapper mapper, 
            MapperConfiguration configMapper, 
            IConfiguration configuration)
        {
            _repoModelOperation = repoModelOperation;
            _repoProcessType = repoProcessType;
            _repoModel = repoModel;
            _repoStage = repoStage;
            _repoKaizen = repoKaizen;
            _repoMeasuremt = repoMeasuremt;
            _mapper = mapper;
            _configMapper = configMapper;
            factory =configuration.GetSection("AppSettings:Factory").Value;
        }

        public async Task<bool> Add(Model_OperationDTO model)
        {
            var modelParam =new ModelOperationEditParam();
            modelParam.factory_id = model.factory_id;
            modelParam.model_no = model.model_no;
            modelParam.stage_id = model.stage_id;
            modelParam.operation_id = model.operation_id;
            var operation =await GetModel_OperationDTO(modelParam);
            if(operation == null){
                var modelOperation = _mapper.Map<Model_Operation>(model);
                _repoModelOperation.Add(modelOperation);
                return await _repoModelOperation.SaveAll();
            }else{
                return false;
            }
        }

        public Task<bool> CheckExistKaizenAndRTF(Model_OperationDTO operation)
        {
            throw new System.NotImplementedException();
        }

        public Task<bool> Delete(Model_OperationDTO operation)
        {
            throw new System.NotImplementedException();
        }

        public Task<object> GetAllProcessType()
        {
            throw new System.NotImplementedException();
        }

        public async Task<Model_OperationDTO> GetModel_OperationDTO(ModelOperationEditParam modelOperationEditParam)
        {
            var data = await _repoModelOperation.GetByModelOperation(modelOperationEditParam);
            var models = _mapper.Map<Model_Operation, Model_OperationDTO>(data);
            return models;
        }

        public Task<PagedList<Model_OperationDTO>> searchModelOperation(PaginationParams paginationParams, ModelOperationParam modelParam)
        {
            throw new System.NotImplementedException();
        }

        public Task<bool> Update(Model_OperationDTO model)
        {
            throw new System.NotImplementedException();
        }
    }
}