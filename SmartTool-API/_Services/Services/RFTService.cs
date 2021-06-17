using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using SmartTool_API._Repositories.Interfaces;
using SmartTool_API._Services.Interfaces;
using SmartTool_API.DTOs;
using SmartTool_API.Helpers;

namespace SmartTool_API._Services.Services
{
    public class RFTService : IRFTService
    {

        private readonly IStageRepository _iStageRepo;
        private readonly IMeasurement_RFTRepository _iMeasurementRepo;
        private readonly IModelOperationRepository _iModelOperaRepo;
        private readonly IProcessTypeRepository _repoProcessType;
        private readonly IModelRepository _iModelRepo;
        private readonly IDefectReasonRepository _iDefectReasonRepo;
        private readonly IMapper _mapper;
        private readonly MapperConfiguration _configMapper;
        private string factory;

        public RFTService(  IStageRepository iStageRepo, 
                            IMeasurement_RFTRepository iMeasurementRepo, 
                            IModelOperationRepository iModelOperaRepo, 
                            IModelRepository iModelRepo, IMapper mapper, 
                            MapperConfiguration configMapper, 
                            IConfiguration configuration, 
                            IProcessTypeRepository repoProcessType, 
                            IDefectReasonRepository iDefectReasonRepo)
        {
            _iStageRepo = iStageRepo;
            _iMeasurementRepo = iMeasurementRepo;
            _iModelOperaRepo = iModelOperaRepo;
            _iModelRepo = iModelRepo;
            _iDefectReasonRepo = iDefectReasonRepo;
            _mapper = mapper;
            _configMapper = configMapper;
            factory = configuration.GetSection("AppSettings:Factory").Value;
            _repoProcessType = repoProcessType;
        }
        public Task<bool> Add(Measurement_RFTDTO model)
        {
            throw new System.NotImplementedException();
        }

        public Task<object> GetAllDefectReason()
        {
            throw new System.NotImplementedException();
        }

        public async Task<object> GetAllModel() {
            return await _iModelRepo.FindAll(x => x.factory_id == factory && x.is_active)
                                            .OrderByDescending(x => x.prod_season).ThenByDescending(x => x.volume)
                                            .Select(x => new { x.model_no, x.model_name, x.upper_id })
                                            .Distinct().ToListAsync();
        }

        public Task<object> GetAllProcessType(string modelNo, string StageId)
        {
            throw new System.NotImplementedException();
        }

        public Task<object> GetAllStage()
        {
            throw new System.NotImplementedException();
        }

        public Task<object> GetOperationNam(string modelNo, string stage, string processType)
        {
            throw new System.NotImplementedException();
        }

        public Task<object> GetProcessNOperation(string modelNO, string stageId, string operation)
        {
            throw new System.NotImplementedException();
        }

        public Task<PagedList<Measurement_RFTDTO>> Search(PaginationParams paginationParams, string modelNo, string stageId)
        {
            throw new System.NotImplementedException();
        }

        public Task<bool> Updata(Measurement_RFTDTO model)
        {
            throw new System.NotImplementedException();
        }
    }
}