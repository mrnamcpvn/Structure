using System;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using SmartTool_API._Services.Interfaces;
using SmartTool_API.DTO;
using SmartTool_API.Helpers;

namespace SmartTool_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DefectReasonController : ControllerBase
    {
        private string username;
        private string factory;
        private readonly IDefectReasonService _defectReason;
        public DefectReasonController(IDefectReasonService defectReason, IConfiguration configuration)
        {
            _defectReason = defectReason;
            factory = configuration.GetSection("AppSettings:Factory").Value;
        }
        private string GetUserClaim()
        {
            return username = User.FindFirst(ClaimTypes.NameIdentifier).Value;
        }
        [HttpPost("search")]
        public async Task<IActionResult> Search([FromQuery] PaginationParam param, DefectReasonParam filter)
        {
            var lists = await _defectReason.SearchDefectReason(param, filter);
            Response.AddPagination(lists.CurrentPage, lists.PageSize, lists.TotalCount, lists.TotalPages);
            return Ok(lists);
        }
        [HttpPost("edit")]
        public async Task<IActionResult> UpdateDefectReason(DefectReasonDTO defectReasonDTO)
        {
            defectReasonDTO.update_by = GetUserClaim();
            defectReasonDTO.update_time = DateTime.Now;
            if (await _defectReason.Update(defectReasonDTO))
            {
                return NoContent();
            }
            return BadRequest($"Updating Defect Reason {defectReasonDTO.defect_reason_id} failed on save");
        }
        

        [HttpPost("create")]
        public async Task<IActionResult> CreateDefectReason(DefectReasonDTO defectReasonDTO)
        {
            defectReasonDTO.factory_id = factory;
            if (await _defectReason.CheckDefectReasonExists(defectReasonDTO.defect_reason_id))
            {
                return BadRequest("Defect Reason ID already exists!");
            }
            defectReasonDTO.update_by = GetUserClaim();
            defectReasonDTO.update_time = DateTime.Now;
            if (await _defectReason.Add(defectReasonDTO))
            {
                return NoContent();
            }

            throw new Exception("Creating the Defect Reason failed on save");
        }
    }
}