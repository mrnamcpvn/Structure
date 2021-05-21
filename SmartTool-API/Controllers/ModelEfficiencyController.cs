using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using SmartTool_API._Services.Interfaces;

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
    }
    private string GetUserClaim(){
        return username = User.FindFirst(ClaimTypes.NameIdentifier).Value;
    }

    [HttpGet("uppperId")]
    public async Task<IActionResult> GetAllProcessType()=> Ok(await _modelEfficiencyService.GetAllUpperID());

    [HttpGet("modelName")]
    public async Task<IActionResult> GetModelName(string uppperId) => Ok(await _modelEfficiencyService.GetModelName(uppperId , factory ));

    //[HttpPost(getModelEfficiency)]
    //public async Task<IActionResult> GetModelEfficiency();

  }
}