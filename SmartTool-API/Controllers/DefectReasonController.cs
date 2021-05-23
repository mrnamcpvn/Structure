using System;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using SmartTool_API._Services.Interfaces;
using SmartTool_API.DTO;
using SmartTool_API.Helpers;
using SmartTooling_API.Helpers;

namespace SmartTool_API.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class DefectReasonController : ControllerBase
    {
    private readonly IDefectReasonService _defectReasonService;
    private readonly IConfiguration _configuration;
    private string username;
    private string factory;

    public DefectReasonController(IDefectReasonService defectReasonService, IConfiguration configuration)
    {
        _configuration = configuration;
        _defectReasonService = defectReasonService;
    }

    //get user
    private string GetUserClaim() {
        return username = User.FindFirst(ClaimTypes.NameIdentifier).Value;
    }

    [HttpGet("GetDefectReasons")]
    public async Task<IActionResult> GetDefectReasons([FromBody] PaginationParams param) {
        var defectReason = await _defectReasonService.GetWithPaginations(param) ;
        Response.AddPagination(defectReason.CurrentPage, defectReason.PageSize, defectReason.TotalCount, defectReason.TotalPages);
        return Ok(defectReason);
    }
    [HttpGet("all" , Name = "GetAllDefectReasons")]
    public async Task<IActionResult> GetAll(){
        var defectReason = await _defectReasonService.GetAllAsync();
        return Ok(defectReason);
    }
    [HttpPost("search")]
    public async Task<IActionResult> Search([FromBody]PaginationParams param , DefectReasonParam filter) {
        var lists = await _defectReasonService.SearchDefectReason(param, filter);
        Response.AddPagination(lists.CurrentPage, lists.PageSize, lists.TotalPages, lists.TotalCount);
        return Ok(lists);
    }
    [HttpPost("create")]
    public async Task<IActionResult> CreateDefectReason(DefectReasonDTO defectReasonDTO)
    {
        defectReasonDTO.factory_id = factory;
        if(await _defectReasonService.CheckDefectReasonExists(defectReasonDTO.defect_reason_id)) {
            return BadRequest("Defect Reason ID đã tồn tại");
        }

        defectReasonDTO.update_by = GetUserClaim();
        defectReasonDTO.update_time = DateTime.Now;

        if(await _defectReasonService.Add(defectReasonDTO)) {
            return NoContent();
        }
        return Ok();
    }
    [HttpPost("update")]
    public async Task<IActionResult> UpdateDefectReason(DefectReasonDTO defectReasonDTO){
        defectReasonDTO.update_by = GetUserClaim();
        defectReasonDTO.update_time = DateTime.Now;
        if(await _defectReasonService.Update(defectReasonDTO)){
            return NoContent();
        }
        return BadRequest($"Cập nhật Defect Reason {defectReasonDTO.defect_reason_id} không thành công");
    }
  }
}