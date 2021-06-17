using Microsoft.AspNetCore.Mvc;
using SmartTool_API._Services.Interfaces;

namespace SmartTool_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ModelOperationController :ControllerBase
    {
        private readonly IModelOperationService _modelOperationService;
    }
}