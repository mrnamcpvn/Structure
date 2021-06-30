using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using SmartTool_API._Repositories.Interfaces;
using SmartTool_API._Services.Interfaces;
using SmartTool_API.DTOs;
using SmartTool_API.Helpers;
using SmartTool_API.Models;

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
        public async Task<bool> Add(Measurement_RFTDTO model)
        {
            var measurement = _mapper.Map<Measurement_RFT>(model);
            _iMeasurementRepo.Add(measurement);
            return await _iMeasurementRepo.SaveAll();
        }

        public async Task<object> GetAllDefectReason()
        {
            return await _iDefectReasonRepo.FindAll(x =>x.factory_id ==factory && x.is_active)
                    .OrderBy(x =>x.sequence).Select(x => new{x.defect_reason_id, x.defect_reason_name}).ToListAsync();
        }

        public async Task<object> GetAllModel() {
            return await _iModelRepo.FindAll(x => x.factory_id == factory && x.is_active)
                                            .OrderByDescending(x => x.prod_season).ThenByDescending(x => x.volume)
                                            .Select(x => new { x.model_no, x.model_name, x.upper_id })
                                            .Distinct().ToListAsync();
        }

        public  async Task<object> GetAllProcessType(string modelNo, string StageId)
        {
            var modelOpera = _iModelOperaRepo.FindAll(x => x.critical_quality && x.factory_id ==factory && x.model_no ==modelNo && x.stage_id ==StageId);
            var mesasurement = _iMeasurementRepo.FindAll(x => x.factory_id == factory && x.model_no == modelNo && x.stage_id == StageId);
            var process = _repoProcessType.FindAll(x =>x.factory_id ==factory && x.is_active);
            var operationdata =await(from a in modelOpera
                                    join b in mesasurement on new { factory =a.factory_id, model_no =a.model_no, stage_id =a.stage_id, operation_id =a.operation_id}
                                    equals new {factory =b.factory_id, model_no = b.model_no, stage_id =b.stage_id, operation_id=b.operation_id}
                                    into groupjoin
                                    from c in groupjoin.DefaultIfEmpty()
                                    orderby a.sequence
                                    select new {b2opretion = c.operation_id}).Where(x =>x.b2opretion == null).ToListAsync();
            if(operationdata.Count ==0){
                return operationdata;
            }
            else{
                var prodata = await( from a in modelOpera
                                    join b in process on new {Factory =a.factory_id, process_type_id = a.process_type_id}
                                    equals new {Factory = b.factory_id, process_type_id =b.process_type_id}
                                    into groupjoin
                                    from c in groupjoin.DefaultIfEmpty()
                                    select new {a.process_type_id, c.process_type_name_local}).Distinct().ToListAsync();
                return prodata;
            }
        }

        public async Task<object> GetAllStage()
        {
            var model = _iStageRepo.FindAll(x =>x.factory_id == factory && x.is_active)
                                    . Select(x => new {x.stage_id, x.stage_name, x.sequence})
                                    .Distinct();
            var model2 = await model.OrderBy(x => x.sequence).ToListAsync();
            return model2;
        }

        public async Task<object> GetOperationName(string modelNo, string stage, string processType)
        {
            var modelopera =_iModelOperaRepo.FindAll(x=>x.critical_quality && x.factory_id ==factory && x.model_no ==modelNo && x.stage_id ==stage && x.process_type_id ==processType);
            var imeasurment = _iMeasurementRepo.FindAll(x =>x.model_no == modelNo && x.stage_id == stage && x.factory_id ==factory);
            var data = await(from T1 in modelopera
                                join T2 in imeasurment on new {factory =T1.factory_id, model_no =T1.model_no, stage_id =T1.stage_id, operation_id =T1.operation_id}
                                equals new {factory =T2.factory_id, model_no =T2.model_no, stage_id =T2.stage_id, operation_id =T2.operation_id}
                                into groupjoin from a in groupjoin.DefaultIfEmpty()
                                orderby T1.sequence
                                select new {T1.operation_id, T1.operation_name_local, ttt=a.operation_id}).Where(x =>x.ttt ==null).ToListAsync();
            return data;
        }

        public async Task<object> GetProcessNOperation(string modelNO, string stageId, string operation)
        {
            var MOp = _iModelOperaRepo.FindAll(x => x.critical_quality && x.factory_id == factory && x.model_no == modelNO && x.stage_id == stageId && x.operation_id == operation);
            var process = _repoProcessType.FindAll().Where(x => x.factory_id == factory && x.is_active);
            var data = await (from T1 in MOp
                                join T2 in process on T1.process_type_id equals T2.process_type_id
                                into groupjoin
                                from B in groupjoin.DefaultIfEmpty()
                                select new
                                {
                                    T1.operation_id,
                                    T1.operation_name_local,
                                    B.process_type_id,
                                    B.process_type_name_local
                                }).ToListAsync();
            return data; 
        }

        public async Task<PageListUtility<Measurement_RFTDTO>> Search(PaginationParams paginationParams, string modelNo, string stageId)
        {
            var queryMea =_iMeasurementRepo.FindAll(x =>x.factory_id ==factory);
            var queryModelOpera = _iModelOperaRepo.FindAll();
            if(!string.IsNullOrEmpty(modelNo))
                queryMea = queryMea.Where(x=>x.model_no==modelNo);
            if(!string.IsNullOrEmpty(stageId))
                queryMea =queryMea.Where(x =>x.stage_id ==stageId);
            
            var datagroup =queryMea.Join(queryModelOpera,
                                x =>  new {x.factory_id, x.model_no, x.operation_id},
                                y => new {y.factory_id, y.model_no, y.operation_id},
                                (x,y) =>x).ProjectTo<Measurement_RFTDTO>(_configMapper);
            return await PageListUtility<Measurement_RFTDTO>.PageListAsync(datagroup,paginationParams.PageNumber, paginationParams.PageSize);
        }

        public async Task<bool> Update(Measurement_RFTDTO model)
        {
            var measurement = _mapper.Map<Measurement_RFT>(model);
            _iMeasurementRepo.Update(measurement);
            return await _iMeasurementRepo.SaveAll();
        }
    }
}