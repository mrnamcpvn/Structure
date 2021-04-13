using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using SmartTool_API._Services.Interfaces;

namespace SmartTool_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ModelController : ControllerBase
    {

        private readonly IModelService _modelService;
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;

        private string factory;
        public ModelController(IModelService modelService, IMapper mapper, IConfiguration configuration)
        {
            _mapper = mapper;
            _modelService = modelService;
            _configuration = configuration;
            factory = configuration.GetSection("AppSettings:Factory").Value;
        }

        [HttpGet("getall")]
        public async Task<IActionResult> GetAll()
        {
            var allList = await _modelService.GetAllModel();
            return Ok(allList);
        }
        [HttpGet("edit/{modelNo}")]
        public async Task<ActionResult> GetByFactoryAndModelNo(string modelNo)
        {
            var modelRepo = await _modelService.GetByFactoryAndModelNo(factory, modelNo);
            if (modelRepo != null)
            {
                return Ok(modelRepo);
            }
            return NoContent();
        }
    }
}
