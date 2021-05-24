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
    private readonly IModelEfficiencyService _modelEfficiencyService;
    private readonly IConfiguration _configuration;
    private string factory;
    private string username;

    public ModelEfficiencyController(IModelEfficiencyService modelEfficiencyService, IConfiguration configuration)
    {
        _modelEfficiencyService = modelEfficiencyService;
        _configuration = configuration;
        factory = configuration.GetSection("AppSettings:Factory").Value;
    }
    private string GetUserClaim(){
        return username = User.FindFirst(ClaimTypes.NameIdentifier).Value;
    }

    [HttpGet("upperId")]
    public async Task<IActionResult> GetAllProcessType() => Ok(await _modelEfficiencyService.GetAllUpperID());

    [HttpGet("modelName")]
    public async Task<IActionResult> GetModelName(string upperId) => Ok(await _modelEfficiencyService.GetModelName(upperId , factory));

    [HttpPost("getModelEfficiency")]
    public async Task<IActionResult> GetModelEfficiency(ModelEfficiencyEditParam modelEfficiencyEditPram){
       modelEfficiencyEditPram.factory = factory;
       var listEfficiency = await _modelEfficiencyService.ModelEfficiencyEdit(modelEfficiencyEditPram);
       return Ok(listEfficiency);
    }

   [HttpPost("updateModelEfficiency")]
    public async Task<IActionResult> UpdateModelEfficiency(List<ModelEfficiencyDTO> modelEfficiencyDTO){
       var username = GetUserClaim();
       if(await _modelEfficiencyService.UpdateOrInsert(modelEfficiencyDTO, factory, username))
          return NoContent();
       return BadRequest("Updating Model efficiency failed on save !");
    }
  }
}