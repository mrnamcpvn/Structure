using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SmartTool_API._Repositories.Interfaces;
using SmartTool_API._Services.Interfaces;
using SmartTool_API.DTOs;
using SmartTool_API.Helpers;
using SmartTool_API.Models;

namespace SmartTool_API._Services.Services
{
    public class KaizenReportService : IKaizenReportService
    {
        private readonly IModelRepository _repoModel;
        private readonly IViewModelKaizenRepository _repoViewModelKaizen;
        private readonly IEfficiencyRepository _repoEfficiency;
        private readonly IKaizenRepository _repoKaizen;
        private readonly IModelOperationRepository _repoModelOperation;
        private readonly IMapper _mapper;
        public KaizenReportService( IModelRepository repoModel,
                                    IMapper mapper,
                                    IEfficiencyRepository repoEfficiency,
                                    IKaizenRepository repoKaizen,
                                    IModelOperationRepository repoModelOperation,
                                    IViewModelKaizenRepository repoViewModelKaizen)
        {
            _repoModel = repoModel;
            _repoViewModelKaizen = repoViewModelKaizen;
            _repoEfficiency = repoEfficiency;
            _repoKaizen = repoKaizen;
            _repoModelOperation = repoModelOperation;
            _mapper = mapper;
        }

        public async Task<List<Efficiency>> GetEfficiencys(string factory_id, string upper_id, string season)
        {
            var data = await _repoEfficiency.FindAll(x => x.factory_id.Trim() == factory_id.Trim() && x.upper_id.Trim() == upper_id.Trim()
                    && x.season.Trim() == season.Trim()).OrderBy(x => x.sequence).ToListAsync();
            return data;
        }

        public async  Task<object> GetKaizenDetail(string factory_id, string model_no, string serial_no)
        {
            var modelOperations = _repoModelOperation.FindAll();
            var kaizens = _repoKaizen.FindAll();
            var models = _repoModel.FindAll();
            var data =await (
                from a in kaizens
                join b in models
                    on new { factoryId= a.factory_id.Trim(), modelNo =a.model_no.Trim()} equals new { factoryId =b.factory_id.Trim(), modelNo =b.model_no.Trim()}
                join c in modelOperations
                on new {factoryId =a.factory_id.Trim(), modelNo =a.model_no.Trim(), operationId =a.operation_id.Trim(), stageId =a.stage_id.Trim()}
                equals new {factoryId =c.factory_id.Trim(), modelNo =c.model_no.Trim(), operationId =c.operation_id.Trim(), stageId =c.stage_id.Trim() }
                where a.factory_id.Trim() == factory_id.Trim() && a.model_no.Trim() == model_no.Trim() && a.serial_no.ToString() == serial_no.Trim()
                select new 
                {
                    kaizen =a,
                    Model = b,
                    modelOperation =c
                }).FirstOrDefaultAsync();
            return data;
        }

        public Task<PagedList<KaizenModelDetail>> GetKaiZens(PaginationParams param, string factory_id, string model_no)
        {
            throw new System.NotImplementedException();
        }

        public Task<List<VW_ModelKaizen_Dto>> GetModelKaizens(string factory_id, KaizenReportParam filter)
        {
            throw new System.NotImplementedException();
        }

        public Task<List<string>> GetSeasonByUpper(string factory_id, string upper_id)
        {
            throw new System.NotImplementedException();
        }

        public Task<PagedList<Model>> Search(PaginationParams param, KaizenReportParam filter, string factory_id)
        {
            throw new System.NotImplementedException();
        }

        public Task<bool> UpdateClickTimes(KaizenModelDetail model)
        {
            throw new System.NotImplementedException();
        }
    }
}