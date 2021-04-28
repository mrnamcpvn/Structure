using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SmartTool_API._Services.Interfaces;
using SmartTool_API.Helpers;

namespace SmartTool_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RFTReportController : ControllerBase
    {
        private readonly IRFTReportService _serviceRFTReport;
        public RFTReportController(IRFTReportService serviceRftReport)
        {
            _serviceRFTReport = serviceRftReport;
        }

        [HttpPost("searchrftreport")]
        public async Task<IActionResult> SearchRFTReort([FromQuery] PaginationParam param, RFTReportParam filter)
        {
            var lists = await _serviceRFTReport.SearchRFTReport(param, filter);
            Response.AddPagination(lists.CurrentPage, lists.PageSize, lists.TotalCount, lists.TotalPages);
            return Ok(lists);
        }
        [HttpPost("searchrftreportdetail")]
        public async Task<IActionResult> SearchRFTReortDetailTest(RFTReportParam filter)
        {
            return Ok(await _serviceRFTReport.SearchRFTReportDetail(filter));
        }
        [HttpGet("countavg")]
        public async Task<IActionResult> CountAVG(string factory_id, string model_no)
        {
            return Ok(await _serviceRFTReport.GetAVG(factory_id, model_no));
        }
    }
}