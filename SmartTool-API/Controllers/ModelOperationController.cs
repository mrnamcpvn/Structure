using System;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Configuration;
using SmartTool_API._Services.Interfaces;
using SmartTool_API.DTO;
using SmartTool_API.Helpers;
using SmartTool_API.Models.Hubs;

namespace SmartTool_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ModelOperationController : ControllerBase
    {
        private readonly IModelOperationService _modelOperationService;
        private readonly IRFTService _iRFTService;
        private readonly IHubContext<BroadcastHub, IHubClient> _hubContext;
        private string username;
        private string factory;
        public ModelOperationController(IModelOperationService modelOperationService, IRFTService iRFTService, IConfiguration configuration, IHubContext<BroadcastHub, IHubClient> hubContext)
        {
            _iRFTService = iRFTService;
            _hubContext = hubContext;
            _modelOperationService = modelOperationService;
            factory = configuration.GetSection("AppSettings:Factory").Value;
        }

        private string GetUserClaim()
        {
            return username = User.FindFirst(ClaimTypes.NameIdentifier).Value;
        }

        [HttpPost("modelOperation-list")]
        public async Task<IActionResult> Search([FromQuery] PaginationParam param, ModelOperationParam modelParam)
        {
            var lists = await _modelOperationService.SearchModelOperation(param, modelParam);
            Response.AddPagination(lists.CurrentPage, lists.PageSize, lists.TotalCount, lists.TotalPages);
            return Ok(lists);
        }

        [HttpPost("create-operation")]
        public async Task<IActionResult> CreateModelOperation([FromBody] ModelOperationDTO modelOperationDto)
        {
            modelOperationDto.factory_id = factory;
            var result = await _modelOperationService.Add(modelOperationDto);
            await _hubContext.Clients.All.BroadcastMessage();
            return Ok(result);
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

        [HttpGet("model-no")]
        public async Task<IActionResult> GetAllModel() => Ok(await _iRFTService.GetAllModel());

        [HttpGet("stage")]
        public async Task<IActionResult> GetAllStage() => Ok(await _iRFTService.GetAllStage());

        [HttpGet("process-type")]
        public async Task<IActionResult> GetAllProcessType() => Ok(await _modelOperationService.GetAllProcessType());

        [HttpPost("updateModelOperation")]
        public async Task<IActionResult> UpdateModelOperation(ModelOperationDTO modelOperationDTO)
        {
            modelOperationDTO.factory_id = factory;
            await _hubContext.Clients.All.BroadcastMessage();
            var result = await _modelOperationService.Update(modelOperationDTO);
            return Ok(result);
        }


        [HttpPost("deleteModelOperation")]
        public async Task<IActionResult> DeleteModelOperation(ModelOperationDTO operationDTO)
        {
            var result = await _modelOperationService.Delete(operationDTO);
            await _hubContext.Clients.All.BroadcastMessage();
            return Ok(result);
        }
    }
}