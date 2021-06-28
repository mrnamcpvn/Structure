using System;
using System.IO;
using System.Security.Claims;
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
    public class GroupKaizenReportController : ControllerBase
    {
        private readonly IGroupKaizenReportService _service;
        private readonly IKaizenReportService _serviceKaizenReport;
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly IConfiguration _configuration;

        public GroupKaizenReportController(IGroupKaizenReportService service, IKaizenReportService serviceKaizenReport, 
                                            IWebHostEnvironment webHostEnvironment, IConfiguration configuration)
        {
            _service = service;
            _serviceKaizenReport = serviceKaizenReport;
            _webHostEnvironment = webHostEnvironment;
            _configuration = configuration;
        }

        [HttpGet("getAllFactory")]
        public async Task<IActionResult> GetAllFactory() {
            return Ok(await _service.GetAllFactory());
        }


        [HttpPost("search")]
        public async Task<IActionResult> Search([FromQuery]PaginationParams param, KaizenReportGroupParam filterParam){
            var result = await _service.Search(param,filterParam);
            Response.AddPagination(result.CurrentPage, result.PageSize, result.TotalCount, result.TotalPages);
            return Ok(result);
        }

        [HttpGet("exportExcel")]
        public async Task<IActionResult> ExportExcel([FromQuery] KaizenReportGroupParam filterParam, int check) {
            var data = await _service.GetModelKaizens(filterParam);
            WorkbookDesigner designer = new WorkbookDesigner(); // khai bao bien designer kieu du lieu WorkbookDesigner
            var path = Path.Combine(_webHostEnvironment.ContentRootPath, "Resources\\Template\\KaizenReport.xlsx"); //khai bao 1 path la duong dan vao file excel co san
            designer.Workbook = new Workbook(path); //dung designer va truyen path vao
            Worksheet ws = designer.Workbook.Worksheets[0]; //dung trang 1, mang la vi tri [0]
            designer.SetDataSource("result", data);
            designer.Process(); //set data vao designer, voi ten result

            MemoryStream stream = new MemoryStream();
            string fileKind = "";
            string fileExtension = "";
            if (check == 1)
            {
                designer.Workbook.Save(stream, SaveFormat.Xlsx);
                fileKind = "application/xlsx";
                fileExtension = ".xlsx";
            }
            if (check == 2)
            {
                // custom size ( width: in, height: in )
                //ws.PageSetup.CustomPaperSize(12.5, 8);
                ws.PageSetup.FitToPagesTall = 0;
                ws.PageSetup.SetHeader(0, "&D &T");
                ws.PageSetup.SetHeader(1, "&B Article Category");
                ws.PageSetup.SetFooter(0, "&B SYSTEM BY MINH HIEU");
                ws.PageSetup.SetFooter(2, "&P/&N");
                ws.PageSetup.PrintQuality = 1200;
                designer.Workbook.Save(stream, SaveFormat.Pdf);
                fileKind = "application/pdf";
                fileExtension = ".pdf";
            }

            byte[] result = stream.ToArray();

            return File(result, fileKind, "Excel" + DateTime.Now.ToString("dd_MM_yyyy_HH_mm_ss") + fileExtension); // luu file truyen vao result, dinh dang Xlsx, 
                                                                                                                        // ten  co Excel_ngay_thang_nam.xlsx
        }

        [HttpGet("getSeason")]
        public async Task<IActionResult> GetSeasonByUpper(string factory_id,string upper_id) {
            var data = await _service.GetSeasonByUpper(factory_id, upper_id);
            return Ok(data);
        }

        [HttpGet("getEfficiencys")]
        public async Task<IActionResult> GetEfficiencys(string factory_id, string upper_id, string season) {
            var data = await _service.GetEfficiencys(factory_id,upper_id,season);
            return Ok(data);
        }

        [HttpGet("getKaiZens")]
        public async Task<IActionResult> GetKaiZens([FromQuery]PaginationParams param,string factory_id, string model_no) {
            var result = await _service.GetKaiZens(param, factory_id, model_no);
            Response.AddPagination(result.CurrentPage, result.PageSize, result.TotalCount, result.TotalPages);
            return Ok(result);
        }

        [HttpPost("updateClickTimes")]
        public async Task<IActionResult> UpdateClickTimes([FromBody]KaizenModelDetail model) {
            _configuration.GetSection("AppSettings:DataSeach").Value =model.factory_id.Trim();
            var result = await _serviceKaizenReport.UpdateClickTimes(model);
            _configuration.GetSection("AppSettings:DataSeach").Value ="";
            return Ok(result);
        }

        [HttpGet("getKaizenDetail")]
        public async Task<IActionResult> GetKaizenDetail(string factory_id, string model_no, string serial_no) {
            var data = await _service.GetKaizenDetail(factory_id, model_no, serial_no);
            return Ok(data);
        }

        [HttpGet("getFactory")]
        public async Task<IActionResult> GetFactory() {
            var data = _configuration.GetSection("AppSettings:Factory").Value;
            var result = await Task.FromResult(data);
            return Ok(result);
        }


        [HttpPost("addCrossSiteSharing")]
        public async Task<IActionResult> AddCrossSiteSharing([FromBody]Kaizen_Benefits_Application_FormDTO model) {
          var username = User.FindFirst(ClaimTypes.NameIdentifier).Value;
           var factory =  _configuration.GetSection("AppSettings:Factory").Value;
            _configuration.GetSection("AppSettings:DataSeach").Value =model.factory_id.Trim();
           model.to_factory_id = factory;
           model.update_by = username;
           model.create_by = username;
          var result = await _service.AddCross(model);
           _configuration.GetSection("AppSettings:DataSeach").Value ="";
            return Ok(result);
        }
    }
}