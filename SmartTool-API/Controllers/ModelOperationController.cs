using System;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using SmartTool_API._Services.Interfaces;
using SmartTool_API.DTO;
using SmartTool_API.Helpers;

namespace SmartTool_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ModelOperationController : ControllerBase
    {
        private readonly IModelOperationService _modelOperationService;
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _webHostEnvironment;
        private string username;
        private string factory;

        public ModelOperationController(IModelOperationService modelOperationService, IConfiguration configuration, IWebHostEnvironment webHostEnvironment)
        {
            _modelOperationService = modelOperationService;
            _configuration = configuration;
            _webHostEnvironment = webHostEnvironment;
            factory = configuration.GetSection("AppSettings:Factory").Value;
        }

        private string GetUserClaim() {
            return username = User.FindFirst(ClaimTypes.NameIdentifier).Value;
        }

        [HttpPost("modelOperation-list")]
        public async Task<IActionResult> GetModelList()
        {
            return Ok(await _modelOperationService.GetAllAsync());
        }

        [HttpPost("add-operation")]
        public async Task<IActionResult> AddModelOperation([FromBody] ModelOperationDTO modelOperationDTO)
        {
            return Ok(await _modelOperationService.AddAsync(modelOperationDTO));
        }

        [HttpGet("get-ModelOperation")]
        public async Task<IActionResult> GetModelOperation([FromBody] ModelOperationEditParam modelOperationEditParam)
        {
            var modelRepo = await _modelOperationService.GetModelOperation(modelOperationEditParam);
            if (modelRepo != null)
            {
                return Ok(modelRepo);
            }
            return NoContent();
        }

        [HttpPost("update-ModelOperation")]
        public async Task<IActionResult> UpdateModelOperation(ModelOperationDTO modelOperationDTO)
        {
            modelOperationDTO.update_by = GetUserClaim();
            modelOperationDTO.update_time = DateTime.Now;
            if (await _modelOperationService.Update(modelOperationDTO))
                return NoContent();
            return BadRequest($"Updating Model Operation failed on save");
        }


        [HttpPost("delete-ModelOperation")]
        public async Task<IActionResult> DeleteModelOperation([FromBody] ModelOperationDTO modelOperationDTO)
        {
            return Ok(await _modelOperationService.Delete(modelOperationDTO));
        }
    }
    }