using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using SmartTool_API._Services.Interfaces;
using SmartTool_API.DTOs;
using SmartTool_API.Helpers;

namespace SmartTool_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RFTController : ControllerBase
    {
        private readonly IRFTService _iRFTService;
        private string username;
        private string factory;

        public RFTController(IRFTService iRFTService,IConfiguration configuration)
        {
            _iRFTService = iRFTService;
            factory =configuration.GetSection("AppSettings:Factory").Value;
        }

        private string GetUserClaim(){
            return username =User.FindFirst(ClaimTypes.NameIdentifier).Value;
        }
        [HttpGet("getallmodel")]
        public async Task<IActionResult> GetAllModel() => Ok(await _iRFTService.GetAllModel());

        [HttpGet("getallstage")]
        public async Task<IActionResult> GetAllStage() => Ok(await _iRFTService.GetAllStage());

        [HttpGet("process-type")]
        public async Task<IActionResult> GetAllProcessType(string model_no, string stage_id) =>Ok(await _iRFTService.GetAllProcessType(model_no, stage_id));
        [HttpGet("processoperation-for-edit")]
        public async Task<IActionResult> GetProcessOperationForEdit(string modelNO, string stage_id, string operation_id) =>Ok(await _iRFTService.GetProcessNOperation(modelNO,stage_id,operation_id));

        [HttpGet("getalldefectreason")]
        public async Task<IActionResult> GetAllDefectReason () => Ok(await _iRFTService.GetAllDefectReason());
        [HttpGet("getoperationname")]
        public async Task<IActionResult> GetOperationName(string modelNo, string stage, string processtype) =>Ok(await _iRFTService.GetOperationName(modelNo, stage,processtype));
        
        [HttpGet]
        public async Task<IActionResult> GetAllMeasure([FromQuery] PaginationParams param, string modelNo, string stage)
        {
            var lists = await _iRFTService.Search(param, modelNo, stage);
            return Ok(lists);
        }

        [HttpPost("create")]
        public async Task<IActionResult> create(Measurement_RFTDTO measurement_RFTDTO){
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

        [HttpPut("edit")]
        public async Task<IActionResult> update(Measurement_RFTDTO measurement_RFTDTO){
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