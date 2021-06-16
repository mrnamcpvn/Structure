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

        public KaizenReportService(IModelRepository repoModel, IViewModelKaizenRepository repoViewModelKaizen, IEfficiencyRepository repoEfficiency, IKaizenRepository repoKaizen, IModelOperationRepository repoModelOperation, IMapper mapper)
        {
            _repoModel = repoModel;
            _repoViewModelKaizen = repoViewModelKaizen;
            _repoEfficiency = repoEfficiency;
            _repoKaizen = repoKaizen;
            _repoModelOperation = repoModelOperation;
            _mapper = mapper;
        }

        public  Task<List<Efficiency>> GetEfficiencys(string factory_id, string upper_id, string season)
        {
            throw new System.NotImplementedException();
        }

        public  Task<object> GetKaizenDetail(string factory_id, string model_no, string serial_no)
        {
            throw new System.NotImplementedException();
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