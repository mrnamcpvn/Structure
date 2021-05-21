using System.Collections.Generic;
using System.Threading.Tasks;
using SmartTool_API.Helpers;
using SmartTool_API.Models;
using SmartTooling_API.Helpers;

namespace SmartTool_API._Services.Interfaces
{
    public interface IRFTReportService
    {
        Task<PagedList<Model>> SearchRFTReport(PaginationParams paginationParams, RFTReportParam rftReportParam);

        //Task<PagedList<VW_RFTReportDetailDTO>> SearchRFTReportDetail(PaginationParams paginationParams, RFTReportParam rftReportParam);


        Task<object> GetAVG(string factory_id, string model_no);

    }
}
