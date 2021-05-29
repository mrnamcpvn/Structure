using System;
using System.IO;
using System.Threading.Tasks;
using Aspose.Cells;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using SmartTool_API._Services.Interfaces;
using SmartTool_API.DTO;
using SmartTool_API.Helpers;

namespace SmartTool_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class KaizenReportController : ControllerBase
    {
        private readonly IKaizenReportService _serviceKaizenReport;
        private readonly IWebHostEnvironment _webHostEnvironment;
        private string factory;

        public KaizenReportController(IKaizenReportService serviceKaizenReport, IWebHostEnvironment webHostEnvironment, IConfiguration configuration)
        {
            _serviceKaizenReport = serviceKaizenReport;
            _webHostEnvironment = webHostEnvironment;
            factory = configuration.GetSection("AppSettings:Factory").Value;
        }

        [HttpPost("Search")]
        public async Task<IActionResult> Search([FromQuery] PaginationParams param, KaizenReportParam filter)
        {
            var result = await _serviceKaizenReport.Search(param, filter, factory);
            Response.AddPagination(result.CurrentPage, result.PageSize, result.TotalCount, result.TotalPages);
            return Ok(result);
        }
        [HttpPost("ExportExcel")]
        public async Task<IActionResult> ExportExcel(KaizenReportParam filter)
        {
            var data = await _serviceKaizenReport.GetModelKaizens(factory, filter);
            WorkbookDesigner designer = new WorkbookDesigner();
            var path = Path.Combine(_webHostEnvironment.ContentRootPath, "Resources\\Template\\KaizenReport.xlsx");
            designer.Workbook = new Workbook();
            Worksheet ws = designer.Workbook.Worksheets[0];
            designer.SetDataSource("result", data);
            designer.Process();

            MemoryStream stream = new MemoryStream();
            designer.Workbook.Save(stream, SaveFormat.Xlsx);
            byte[] result = stream.ToArray();

            return File(result, "application/xlsx", "Excel" + DateTime.Now.ToString("dd_MM_yyyy_HH_mm_ss") + ".xlsx");
        }

        [HttpGet("GetSeason/{upper_id}")]
        public async Task<IActionResult> GetSeason(string upper_id)
        {
            var result = await _serviceKaizenReport.GetSeasonByUpper(factory, upper_id);
            return Ok(result);
        }
        [HttpGet("GetEfficiencys")]
        public async Task<IActionResult> GetEfficiency(string upper_id, string season) => Ok(await _serviceKaizenReport.GetEfficiencys(factory, upper_id, season));

        [HttpGet("GetKaizens/{model_no}")]
        public async Task<IActionResult> GetKaizens([FromBody] PaginationParams param, string model_no)
        {
            var result = await _serviceKaizenReport.GetKaiZens(param, factory, model_no);
            Response.AddPagination(result.CurrentPage, result.PageSize, result.TotalCount, result.TotalPages);
            return Ok(result);
        }
        [HttpGet("GetKaizenDetail")]
        public async Task<IActionResult> GetKaizenDetail(string model_no, string factory, string serial_no)
        => Ok(await _serviceKaizenReport.GetKaizenDetail(factory, model_no, serial_no));

        [HttpPost("UpdateClickTimes")]
        public async Task<IActionResult> UpdateClickTime([FromBody] KaizenModelDetail model) => Ok(await _serviceKaizenReport.UpdateClickTimes(model));
    }
}