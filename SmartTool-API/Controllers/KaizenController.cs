using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using SmartTool_API._Services.Interfaces;
using SmartTool_API.Helpers;

namespace SmartTool_API.Controllers
{
    [ApiController]
    [Route ("api/[controller]")]
    public class KaizenController : ControllerBase
    {
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly IKaizenService _kaizenService;
        private string factory;

        public KaizenController(IWebHostEnvironment webHostEnvironment, IKaizenService kaizenService, IConfiguration configuration)
        {
            _webHostEnvironment = webHostEnvironment;
            _kaizenService = kaizenService;
            factory = configuration.GetSection("AppSetting:Factory").Value;
        }

        [HttpGet("kaizenlist")]
        public async Task<IActionResult> Search ([FromQuery] PaginationParams param, string modelNo)
        {
            var lists = await _kaizenService.Search(param, modelNo,factory);
            Response.AddPagination (lists.CurrentPage, lists.PageSize, lists.TotalCount, lists.TotalPages);
            return Ok(lists);
        }

        [HttpGet("getmodel")]
        public async Task<IActionResult> getfactory()
        {
            var data = await _kaizenService.getfactory(factory);
            return Ok(data);
        }

        [HttpGet("getprocess")]
        public async Task<IActionResult> GetAllProcess(string modelNO,string stage)
        {
            var data = await _kaizenService.getProcess(modelNO,stage,factory);
            return Ok(data);
        }

        [HttpGet("getstage")]
        public async Task<IActionResult> GetAllStage()
        {
            var data = await _kaizenService.getfactory(factory);
            return Ok(data);
        }
    }
}