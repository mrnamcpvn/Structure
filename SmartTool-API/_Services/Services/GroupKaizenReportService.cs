using System.Collections.Generic;
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
    public class GroupKaizenReportService : IGroupKaizenReportService
    {


        private readonly IFactoryRepository _repoFactory;
        private readonly IModelRepository _repoModel;
        private readonly IViewModelKaizenRepository _repoViewModelKaizen;
        private readonly IEfficiencyRepository _repoEfficiency;
        private readonly IKaizenRepository _repoKaizen;
        private readonly IModelOperationRepository _repoModelOperation;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;
        private readonly IKaizenBenefitsApplicationFormRepository _formRepository;
        private OperationResult operationResult;

        public GroupKaizenReportService(IFactoryRepository repoFactory, 
        IModelRepository repoModel, 
        IViewModelKaizenRepository repoViewModelKaizen, IEfficiencyRepository repoEfficiency, 
        IKaizenRepository repoKaizen, IModelOperationRepository repoModelOperation, IMapper mapper, IConfiguration configuration, 
        IKaizenBenefitsApplicationFormRepository formRepository)
        {
            _repoFactory = repoFactory;
            _repoModel = repoModel;
            _repoViewModelKaizen = repoViewModelKaizen;
            _repoEfficiency = repoEfficiency;
            _repoKaizen = repoKaizen;
            _repoModelOperation = repoModelOperation;
            _mapper = mapper;
            _configuration = configuration;
            _formRepository = formRepository;
        }

        public Task<OperationResult> AddCross(Kaizen_Benefits_Application_FormDTO model)
        {
            throw new System.NotImplementedException();
        }

        public Task<List<Factory>> GetAllFactory()
        {
            throw new System.NotImplementedException();
        }

        public Task<List<Efficiency>> GetEfficiencys(string factory_id, string upper_id, string season)
        {
            throw new System.NotImplementedException();
        }

        public Task<object> GetKaizenDetail(string factory_id, string model_no, string serial_no)
        {
            throw new System.NotImplementedException();
        }

        public Task<PagedList<KaizenModelDetail>> GetKaiZens(PaginationParams param, string factory_id, string model_no)
        {
            throw new System.NotImplementedException();
        }

        public Task<Model> GetModelByModelNo(string factory_id, string model_No)
        {
            throw new System.NotImplementedException();
        }

        public Task<List<VW_ModelKaizen_Dto>> GetModelKaizens(KaizenReportGroupParam filterParam)
        {
            throw new System.NotImplementedException();
        }

        public Task<List<string>> GetSeasonByUpper(string factory_id, string upper_id)
        {
            throw new System.NotImplementedException();
        }

        public Task<PagedList<Model>> Search(PaginationParams param, KaizenReportGroupParam filterParam)
        {
            throw new System.NotImplementedException();
        }
    }
}