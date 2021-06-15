using System.Threading.Tasks;
using AutoMapper;
using Microsoft.Extensions.Configuration;
using SmartTool_API._Repositories.Interfaces;
using SmartTool_API._Services.Interfaces;
using SmartTool_API.DTOs;
using SmartTool_API.Helpers;
using SmartTooling_API.Helpers;

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

        public Task<bool> Add(Model_OperationDTO model)
        {
            throw new System.NotImplementedException();
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

        public Task<Model_OperationDTO> GetModel_OperationDTO(ModelOperationEditParam modelOperationEditParam)
        {
            throw new System.NotImplementedException();
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