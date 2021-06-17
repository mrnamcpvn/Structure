using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using SmartTool_API._Services.Interfaces;

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
        [HttpGet("getallmodel")]
        public async Task<IActionResult> GetAllModel() => Ok(await _iRFTService.GetAllModel());
    }
}