using System.Collections.Generic;
using System.Threading.Tasks;
using SmartTool_API.DTOs;
using SmartTool_API.Helpers;
using SmartTool_API.Models;

namespace SmartTool_API._Services.Interfaces
{
    public interface IGroupKaizenReportService
    {
         Task<List<Factory>> GetAllFactory();
        Task<PageListUtility<Model>> Search(PaginationParams param, KaizenReportGroupParam filterParam);
        Task<List<VW_ModelKaizen_Dto>> GetModelKaizens(KaizenReportGroupParam filterParam);
        Task<Model> GetModelByModelNo(string factory_id, string model_No);
        Task<List<string>> GetSeasonByUpper(string factory_id, string upper_id);

        // Load data Chart
        Task<List<Efficiency>> GetEfficiencys(string factory_id, string upper_id, string season);
        Task<PageListUtility<KaizenModelDetail>> GetKaiZens(PaginationParams param, string factory_id, string model_no);
        Task<object> GetKaizenDetail(string factory_id, string model_no, string serial_no);
        Task<OperationResult> AddCross(Kaizen_Benefits_Application_FormDTO model);
    }
}