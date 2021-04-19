using System.Collections.Generic;
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
    public class ModelEfficiencyController : ControllerBase
    {
        private string factory;
        private string username;
        private readonly IModelEfficiencyService _modelEfficiency;
        public ModelEfficiencyController(IModelEfficiencyService modelEfficiency, IConfiguration configuration)
        {
            _modelEfficiency = modelEfficiency;
            factory = configuration.GetSection("AppSettings:Factory").Value;

        }

        private string GetUserClaim()
        {
            return username = User.FindFirst(ClaimTypes.NameIdentifier).Value;
        }

        [HttpGet("upperId")]
        public async Task<IActionResult> GetAllProcessType() => Ok(await _modelEfficiency.GetAllUpperID());

        [HttpGet("modelName")]
        public async Task<IActionResult> GetModelName(string upperId) => Ok(await _modelEfficiency.GetModelName(upperId, factory));

        [HttpPost("getModelEfficiency")]
        public async Task<IActionResult> GetModelEfficiency (ModelEfficiencyEditParam modelEfficiencyEditParram){
            modelEfficiencyEditParram.factory = factory;
            var listEfficiency = await _modelEfficiency.ModelEfficiencyEdit(modelEfficiencyEditParram);
            return Ok(listEfficiency);
        }


        [HttpPost("updateModelEfficiency")]
        public async Task<IActionResult> UpdateModelEfficiency(List<ModelEfficiencyDTO> modelEfficiencyDTO)
        {
            var usernameParam = GetUserClaim();
            if (await _modelEfficiency.UpdateOrInsert(modelEfficiencyDTO, factory, usernameParam))
                return NoContent();
            return BadRequest($"Updating Model Efficiency failed on save");
        }
    }
}