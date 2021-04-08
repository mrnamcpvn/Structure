
using System.Collections.Generic;
using System.Threading.Tasks;
using SmartTool_API.DTO;
using SmartTool_API.Helpers;
using SmartTool_API.Models;

namespace SmartTool_API._Services.Interfaces
{
    public interface IKaizenReportService
    {
        Task<PagedList<Model>> Search(PaginationParams param, KaizenReportParam filter, string factory_id);
        Task<List<VW_ModelKaizen_Dto>> GetModelKaizens(string factory_id, KaizenReportParam filter);
        Task<List<string>> GetSeasonByUpper(string factory_id, string upper_id);

        // Load data Chart
        Task<List<Efficiency>> GetEfficiencys(string factory_id, string upper_id, string season);
        Task<PagedList<KaizenModelDetail>> GetKaiZens(PaginationParams param, string factory_id, string model_no);
        Task<bool> UpdateClickTimes(KaizenModelDetail model);
        Task<object> GetKaizenDetail(string factory_id, string model_no, string serial_no);
    }
}