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
    public class RFTController : ControllerBase
    {
        private readonly IRFTService _iRFTService;
        private readonly IConfiguration _configuration;
        private string factory;
        private string username;
        public RFTController(IRFTService iRFTService, IConfiguration configuration)
        {
            _iRFTService = iRFTService;
            _configuration = configuration;
            factory = configuration.GetSection("AppSettings:Factory").Value;
        }
        private string GetUserClaim()
        {
            return username = User.FindFirst(ClaimTypes.NameIdentifier).Value;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllMeasure([FromQuery] PaginationParams param, string modelNo, string stage)
        {
            var lists = await _iRFTService.Search(param, modelNo, stage);
            Response.AddPagination(lists.CurrentPage, lists.PageSize, lists.TotalCount, lists.TotalPages);
            return Ok(lists);
        }

        [HttpGet("GetAllModel")]
        public async Task<IActionResult> GetAllModel() => Ok(await _iRFTService.GetAllModel());

        [HttpGet("ProcessType")]
        public async Task<IActionResult> GetAllProcessType(string model_no, string stage_id) => Ok(await _iRFTService.GetAllProcessType(model_no, stage_id));

        [HttpGet("GetAllDefectReason")]
        public async Task<IActionResult> GetAllDefectReason() => Ok(await _iRFTService.GetAllDefectReason());

        [HttpGet("GetProcessOperationForEdit")]
        public async Task<IActionResult> GetProcessOperationForEdit(string model_no, string model, string stage_id) => Ok(await _iRFTService.GetProcessOperation(model_no, model, stage_id));


        [HttpGet("GetOperationName")]
        public async Task<IActionResult> GetOptionName(string model_no, string process_id, string stage_id) => Ok(await _iRFTService.GetOperationName(model_no, process_id, stage_id));

        [HttpPost("Create")]
        public async Task<IActionResult> CreateRFT([FromBody] Measurement_RFTDTO measurement_RFTDTO)
        {
            measurement_RFTDTO.factory_id = factory;
            measurement_RFTDTO.create_by = GetUserClaim();
            measurement_RFTDTO.create_time = DateTime.Now;
            measurement_RFTDTO.update_by = GetUserClaim();
            measurement_RFTDTO.update_time = DateTime.Now;
            if (await _iRFTService.Add(measurement_RFTDTO))
            {
                return NoContent();
            }
            throw new Exception("Creating the Measurement RFT failed on save");
        }

        [HttpGet("GetAllStage")]
        public async Task<IActionResult> GetAllStage() => Ok(await _iRFTService.GetAllStage());

        [HttpPost("Edit")]
        public async Task<IActionResult> UpdateRFT(Measurement_RFTDTO measurement_RFTDTO)
        {
            measurement_RFTDTO.update_by = GetUserClaim();
            measurement_RFTDTO.update_time = DateTime.Now;
            if (await _iRFTService.Update(measurement_RFTDTO))
            {
                return NoContent();
            }
            return BadRequest($"Updating Measurement RFT {measurement_RFTDTO.model_no} failed on save");
        }

    }

}