using System.Collections.Generic;
using System.Threading.Tasks;
using SmartTool_API.DTO;
using SmartTool_API.Helpers;
using SmartTool_API.Models;

namespace SmartTool_API._Services.Interfaces
{
    public interface IRFTReportService
    {
        Task<PagedList<Model>> SearchRFTReport(PaginationParams paginationParams, RFTReportParam rftReportParam);
        Task<List<VW_RFTReportDetailDTO>> SearchRFTReportDetail(RFTReportParam rftReportParam);
        Task<object> GetAVG(string factory_id, string model_no);
    }
}