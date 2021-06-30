using System;
using System.IO;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using SmartTool_API._Services.Interfaces;
using SmartTool_API.DTOs;
using SmartTool_API.Helpers;

namespace SmartTool_API.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class DefectReasonController : ControllerBase
    {
        private readonly IDefectReasonService _defectreason;
        private readonly IWebHostEnvironment _webHostEnvironment;
        private string factory;
        private string username;

        public DefectReasonController(IDefectReasonService defectreason, IConfiguration configuration, IWebHostEnvironment webHostEnvironment = null)
        {
            _defectreason = defectreason;
            factory = configuration.GetSection("AppSettings:Factory").Value;
            _webHostEnvironment = webHostEnvironment;
        }

        private string GetUserClaim()
        {
            return username = User.FindFirst(ClaimTypes.NameIdentifier).Value;
        }

        [HttpPost("create")]
         public async Task<IActionResult> CreateDefectReason(Defect_ReasonDTO defectReasonDTO)
        {
            defectReasonDTO.factory_id = factory;
            // 10/2 havent check exists
            if (await _defectreason.CheckDefectReasonExists(defectReasonDTO.defect_reason_id))
            {
                return BadRequest("Defect Reason ID already exists!");
            }
            defectReasonDTO.update_by = GetUserClaim();
            defectReasonDTO.update_time = DateTime.Now;
            if (await _defectreason.Add(defectReasonDTO))
            {
                return NoContent();
                // return CreatedAtRoute("GetDefectReasons", new { });
            }
            throw new Exception("Creating the Defect Reason failed on save");
        }

        [HttpGet("Pagination",Name = "GetDefectReasons")]
        public async Task<IActionResult> GetDefectReasons([FromQuery] PaginationParams param)
        {
            var defectreasons = await _defectreason.GetWithPaginations(param);
            return Ok(defectreasons);
        }

        [HttpGet("all", Name = "GetAllDefectReasons")]
        public async Task<IActionResult> GetAll()
        {
            var defectreasons = await _defectreason.GetAllAsync();
            return Ok(defectreasons);
        }


        [HttpPut("update")]
        public async Task<IActionResult> UpdateDefectReason(Defect_ReasonDTO defectReasonDTO)
        {
            defectReasonDTO.update_by = GetUserClaim();
            defectReasonDTO.update_time = DateTime.Now;
            if (await _defectreason.Update(defectReasonDTO))
            {
                return NoContent();
            }
            return BadRequest($"Updating Defect Reason {defectReasonDTO.defect_reason_id} failed on save");
        }


        [HttpPost("search")]
        public async Task<IActionResult> Search([FromQuery] PaginationParams param, DefectReasonParam filter)
        {
            var lists = await _defectreason.SearchDefectReason(param, filter);
            return Ok(lists);
        }

        //import Excel
        [HttpPost("import")]
        public async Task<ActionResult> ImportExcel(IFormFile files)
        {
            if (files != null)
            {
                string fileNameExtension = (files.FileName.Split("."))[(files.FileName.Split(".")).Length - 1];
                string fileName = "Upload_Excel_DefectReason_" + DateTime.Now.ToString().Replace(":", "").Replace("/", "").Replace(" ", "") + "." + fileNameExtension;

                string folder = _webHostEnvironment.WebRootPath + $@"\uploaded\excels\DefectReason";
                if (!Directory.Exists(folder))
                {
                    Directory.CreateDirectory(folder);
                }
                string filePath = Path.Combine(folder, fileName);
                using (FileStream fs = System.IO.File.Create(filePath))
                {
                    files.CopyTo(fs);
                    fs.Flush();
                }
                var result = await _defectreason.ImportExcel(filePath, User.FindFirst(ClaimTypes.NameIdentifier).Value);
                // if (result.Success)
                //     await _hubContext.Clients.All.LoadDataArticleCate();
                return Ok(result);
            }
            throw new Exception("Import Excel Article Category failed on save");
        }
    }
}