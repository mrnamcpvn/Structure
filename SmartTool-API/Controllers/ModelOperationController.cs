using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using SmartTool_API._Services.Interfaces;
using SmartTool_API.Helpers;

namespace SmartTool_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ModelOperationController : ControllerBase
    {
        private readonly IModelOperationService _modelOperationService;

        public ModelOperationController(IModelOperationService modelOperationService)
        {
            _modelOperationService = modelOperationService;
        }

        [HttpPost("modelOperation-list")]
        public async Task<IActionResult> GetModelList()
        {
            return Ok(await _modelOperationService.GetAllAsync());
        }
    }
}