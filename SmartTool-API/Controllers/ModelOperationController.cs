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
    public class ModelOperationController : ControllerBase
    {
        private readonly IModelOperationService _modelOperationService;
        private readonly IRFTService _iRFTService;
        private string username;
        private string factory;
        public ModelOperationController(IModelOperationService modelOperationService, IRFTService iRFTService, IConfiguration configuration)
        {
            _iRFTService = iRFTService;
            _modelOperationService = modelOperationService;
            factory = configuration.GetSection("AppSettings:Factory").Value;
        }

        private string GetUserClaim()
        {
            return username = User.FindFirst(ClaimTypes.NameIdentifier).Value;
        }

        [HttpPost("modelOperation-list")]
        public async Task<IActionResult> Search([FromQuery] PaginationParams param, ModelOperationParam modelParam)
        {
            var lists = await _modelOperationService.SearchModelOperation(param, modelParam);
            Response.AddPagination(lists.CurrentPage, lists.PageSize, lists.TotalCount, lists.TotalPages);
            return Ok(lists);
        }

        [HttpGet("model-no")]
        public async Task<IActionResult> GetAllModel() => Ok(await _iRFTService.GetAllModel());

        [HttpGet("stage")]
        public async Task<IActionResult> GetAllStage() => Ok(await _iRFTService.GetAllStage());

        [HttpGet("process-type")]
        public async Task<IActionResult> GetAllProcessType() => Ok(await _modelOperationService.GetAllProcessType());

        [HttpPost("create-operation")]
        public async Task<IActionResult> CreateModelOperation([FromBody] ModelOperationDTO modelOperationDto)
        {
            // modelOperationDto.update_by = GetUserClaim();
            //modelOperationDto.create_by = GetUserClaim();
            modelOperationDto.update_by = "administrator";
            modelOperationDto.create_by = "administrator";
            modelOperationDto.create_time = DateTime.Now;
            modelOperationDto.factory_id = factory;
            if (await _modelOperationService.Add(modelOperationDto))
            {
                return NoContent();
            }
            throw new Exception("Creating the Model Operation failed on save");
        }

        [HttpPost("getModelOperation")]
        public async Task<IActionResult> GetModelOperation([FromBody] ModelOperationEditParam modelOperationEditParam)
        {
            var modelRepo = await _modelOperationService.GetModelOperation(modelOperationEditParam);
            if (modelRepo != null)
            {
                return Ok(modelRepo);
            }
            return NoContent();
        }

        [HttpPost("updateModelOperation")]
        public async Task<IActionResult> UpdateModelOperation(ModelOperationDTO modelOperationDTO)
        {
            //modelOperationDTO.update_by = GetUserClaim();
            modelOperationDTO.update_time = DateTime.Now;
            if (await _modelOperationService.Update(modelOperationDTO))
                return NoContent();
            return BadRequest($"Updating Model Operation failed on save");
        }


        [HttpPost("deleteModelOperation")]
        public async Task<IActionResult> DeleteModelOperation(ModelOperationDTO operationDTO)
        {
            if (await _modelOperationService.Delete(operationDTO))
                return NoContent();
            return BadRequest($"The Model Operation is already in use, it cannot be deleted");
        }
    }
}