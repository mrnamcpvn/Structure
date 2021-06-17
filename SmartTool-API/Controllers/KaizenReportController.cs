using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using SmartTool_API._Services.Interfaces;

namespace SmartTool_API.Controllers
{
    [ApiController]
    [Route("api/controller")]
    public class KaizenReportController : ControllerBase
    {
        private readonly IKaizenReportService _ikaizenReport;
        private readonly IWebHostEnvironment __webHostEnvironment;
        private string factory;

        public KaizenReportController(IKaizenReportService ikaizenReport, IWebHostEnvironment webHostEnvironment, IConfiguration configuration)
        {
            _ikaizenReport = ikaizenReport;
            __webHostEnvironment = webHostEnvironment;
            factory =configuration.GetSection("AppSettings:Factory").Value;
        }

        [HttpGet("getEfficiencys")]
        public async Task<IActionResult> GetEfficiencys(string upper_id, string season) {
            var data = await _ikaizenReport.GetEfficiencys(factory,upper_id,season);
            return Ok(data);
        }

        [HttpGet("GetKaizenDetail")]
        public async Task<IActionResult> GetKaizenDetail(string model_no, string serial_no ){
            var data = await _ikaizenReport.GetKaizenDetail( factory, model_no,serial_no);
            return Ok(data);
        }
    }
}