using System;
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
    public class ModelOperationController :ControllerBase
    {
        private readonly IModelOperationService _modelOperationService;
        private readonly IRFTService _iRFTService;
        private string username;
        private string factory;

        public ModelOperationController(IModelOperationService modelOperationService, IRFTService iRFTService, IConfiguration configuration)
        {
            _modelOperationService = modelOperationService;
            _iRFTService = iRFTService;
            factory = configuration.GetSection("AppSettings:Factory").Value;
        }

        private string GetUserClaim(){
            return username = User.FindFirst(ClaimTypes.NameIdentifier).Value; 
        }

        [HttpPost("create-operation")]
        public async Task<IActionResult> CreateModelOperation([FromBody] Model_OperationDTO model_OperationDTO){
            model_OperationDTO.update_by = GetUserClaim();
            model_OperationDTO.create_by = GetUserClaim();
            model_OperationDTO.update_time = DateTime.Now;
            model_OperationDTO.create_time = DateTime.Now;
            model_OperationDTO.factory_id = factory;
            if(await _modelOperationService.Add(model_OperationDTO)){
                return NoContent();
            }
            throw new Exception("Creating the Model Operation failed on save");
        }

        [HttpPost("deleteoperation")]
        public async Task<IActionResult> DeleteModelOperation(Model_OperationDTO operationDTO)
        {
            if (await _modelOperationService.Delete(operationDTO))
                return NoContent();
            return BadRequest($"The Model Operation is already in use, it cannot be deleted");
        }


        [HttpGet("model-no")]
        public async Task<IActionResult> GetAllModel() => Ok(await _iRFTService.GetAllModel());

        [HttpGet("stage")]
        public async Task<IActionResult> GetAllStage() => Ok(await _iRFTService.GetAllStage());

        [HttpGet("getallprocess")]
        public async Task<IActionResult> GetAllProcessType() => Ok( await _modelOperationService.GetAllProcessType());

        [HttpPost("modeloperation-list")]
        public async Task<IActionResult> Search([FromQuery] PaginationParams paginationParams, ModelOperationParam modelOperationParam){
            var list = await _modelOperationService.searchModelOperation(paginationParams, modelOperationParam);
            Response.AddPagination(list.CurrentPage, list.PageSize,list.TotalCount, list.TotalPages);
            return Ok(list);
        }

        [HttpPut("updateModelOperation")]
        public async Task<IActionResult> UpdateModelOperation(Model_OperationDTO modelOperationDTO)
        {
            modelOperationDTO.update_by = GetUserClaim();
            modelOperationDTO.update_time = DateTime.Now;
            if (await _modelOperationService.Update(modelOperationDTO))
                return NoContent();
            return BadRequest($"Updating Model Operation failed on save");
        }

        [HttpPost("getModelOperation")]
        public async Task<IActionResult> GetModelOperationDTO([FromBody] ModelOperationEditParam modelOperationEditParam)
        {
            var modelRepo = await _modelOperationService.GetModel_Operation(modelOperationEditParam);
            if (modelRepo != null)
            {
                return Ok(modelRepo);
            }
            return NoContent();
        }
    }
}