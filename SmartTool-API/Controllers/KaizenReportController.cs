using System;
using System.IO;
using System.Threading.Tasks;
using Aspose.Cells;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using SmartTool_API._Services.Interfaces;
using SmartTool_API.DTOs;
using SmartTool_API.Helpers;

namespace SmartTool_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
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

        [HttpGet("getKaizenDetail")]
        public async Task<IActionResult> GetKaizenDetails(string model_no, string serial_no) {
            var data = await _ikaizenReport.GetKaizenDetail(factory, model_no, serial_no);
            return Ok(data);
        }

        [HttpGet("getKaizens/{model_no}")]
        public async Task<IActionResult> GetKaizens([FromQuery]PaginationParams param,string model_no) {
            var result = await _ikaizenReport.GetKaiZens(param, factory, model_no);
            Response.AddPagination(result.CurrentPage, result.PageSize, result.TotalCount, result.TotalPages);
            return Ok(result);
        }

        [HttpPost("exportExcel")]
        public async Task<IActionResult> ExportExcel(KaizenReportParam filter) {
            var data = await _ikaizenReport.GetModelKaizens(factory, filter);
            WorkbookDesigner designer = new WorkbookDesigner();
            var path = Path.Combine(__webHostEnvironment.ContentRootPath, "Resources\\Template\\KaizenReport.xlsx");
            designer.Workbook = new Workbook(path);
            Worksheet ws = designer.Workbook.Worksheets[0];
            designer.SetDataSource("result", data);
            designer.Process();

            MemoryStream stream = new MemoryStream();
            designer.Workbook.Save(stream, SaveFormat.Xlsx);

            byte[] result = stream.ToArray();

            return File(result, "application/xlsx", "Excel" + DateTime.Now.ToString("dd_MM_yyyy_HH_mm_ss") + ".xlsx");
        }

        [HttpGet("getSeason/{upper_id}")]
        public async Task<IActionResult> GetSeasonByUpper(string upper_id) {
            var data = await _ikaizenReport.GetSeasonByUpper(factory,upper_id);
            return Ok(data);
        }

        [HttpPost("search")]
        public async Task<IActionResult> Search([FromQuery]PaginationParams param, KaizenReportParam filter) {
            var result = await _ikaizenReport.Search(param,filter, factory);
            Response.AddPagination(result.CurrentPage, result.PageSize, result.TotalCount, result.TotalPages);
            return Ok(result);
        }

        [HttpPost("updateClickTimes")]
        public async Task<IActionResult> UpdateClickTimes([FromBody]KaizenModelDetail model) {
            var result = await _ikaizenReport.UpdateClickTimes(model);
            return Ok(result);
        }
    }
}