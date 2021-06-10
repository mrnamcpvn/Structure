using System.Collections.Generic;
using System.Threading.Tasks;
using SmartTool_API._Services.Interfaces;
using SmartTool_API.DTOs;
using SmartTool_API.Helpers;
using SmartTool_API.Models;

namespace SmartTool_API._Services.Services
{
    public class KaizenReportService : IKaizenReportService
    {
        public KaizenReportService()
        {
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