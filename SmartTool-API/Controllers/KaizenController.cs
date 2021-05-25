using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using SmartTool_API._Services.Interfaces;
using SmartTool_API.Helpers;

namespace SmartTool_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class KaizenController : ControllerBase
    {
    private readonly IWebHostEnvironment _iWebHostEnvironment;
    private readonly IKaizenService _kaizenService;
    private readonly IConfiguration _configuration;
    private string factory;

        public KaizenController(IWebHostEnvironment iWebHostEnvironment, IKaizenService kaizenService, IConfiguration configuration)
            {
                _iWebHostEnvironment =iWebHostEnvironment;
                _kaizenService = kaizenService;
                _configuration = configuration;
                factory = configuration.GetSection("AppSettings:Factory").Value;
            }

        [HttpGet("kaizen-list")]
        public async Task<IActionResult> Search([FromQuery] PaginationParams param, string modelNo){
            var lists = await _kaizenService.Search(param, modelNo ,factory);
            Response.AddPagination(lists.CurrentPage, lists.PageSize, lists.TotalCount, lists.TotalPages);
            return Ok(lists);
        }
        [HttpGet("getmodel")]
        public async Task<IActionResult> GetAllModelNo(){
            var data = await _kaizenService.GetModelNo(factory);
            return Ok(data);
        }
        [HttpGet("getprocess")]
        public async Task<IActionResult> GetAllProcess(string modelNo,string stage) {
            var data = await _kaizenService.GetProcess(modelNo,stage,factory);
            return Ok(data);
        }

    }
}