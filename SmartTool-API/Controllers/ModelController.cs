using System;
using System.IO;
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
    public class ModelController : ControllerBase
    {
        private readonly IModelService _modelService; 
        private readonly IWebHostEnvironment _webHostEnvironment;

        private string username;
        private string factory;

        public ModelController(IModelService modelService, IWebHostEnvironment webHostEnvironment, IConfiguration configuration) {
            _modelService = modelService;
            _webHostEnvironment = webHostEnvironment;
            factory = configuration.GetSection("AppSettings:Factory").Value;
        }

        public string GetUserClaim() {
            return username = User.FindFirst(ClaimTypes.NameIdentifier).Value;
        }

        [HttpPost("model-list")]

        public async Task<IActionResult> Search([FromQuery] PaginationParams param, ModelParam modelParam) {
            var lists = await _modelService.SearchModel(param, modelParam);
            Response.AddPagination(lists.CurrentPage, lists.PageSize, lists.TotalCount, lists.TotalPages);
            return Ok(lists);
        }

        [HttpPost("createModel")]
        public async Task<IActionResult> CreateModel([FromBody] ModelDTO modelDTO) {
            modelDTO.update_by = GetUserClaim();
            modelDTO.create_by = GetUserClaim();
            modelDTO.factory_id = factory;
            string folder = _webHostEnvironment.WebRootPath + "\\uploaded\\"+factory+"\\Model\\";
            if(modelDTO.model_picture == null || modelDTO.model_picture == "") {
                var fileName = "no-image.jpg";
                modelDTO.model_picture = factory+"/Model/"+ fileName;
            }
            else {
                var source = modelDTO.model_picture;
                string base64 = source.Substring(source.IndexOf(',') + 1);
                base64 = base64.Trim('\0');
                byte[] modelData = Convert.FromBase64String(base64);
                if (!Directory.Exists(folder))
                    {
                        Directory.CreateDirectory(folder);
                    }
                var fileName = factory + "_" + modelDTO.model_no +".jpg";
                string filePathImages = Path.Combine(folder, fileName);
                System.IO.File.WriteAllBytes(filePathImages, modelData);
                modelDTO.model_picture = factory+"/Model/"+ fileName;
            }
            if (await _modelService.Add(modelDTO))
            {
                return NoContent();
            }
            throw new Exception("Creating the Model failed on save");
        }

        [HttpGet("model-type")]
        public async Task<IActionResult> GetAllModelType() {
            var data = await _modelService.GetModelType();
            return Ok(data);
        }

        [HttpPost("updateModel")]
        public async Task<IActionResult> updateModel([FromBody] ModelDTO modelDTO) {
            modelDTO.update_by = GetUserClaim();
            modelDTO.update_time = DateTime.Now;    
            string folder = _webHostEnvironment.WebRootPath + "\\uploaded\\"+factory+"\\Model\\";
            if(modelDTO.model_picture.Length > 100)
            {
                var source = modelDTO.model_picture;
                string base64 = source.Substring(source.IndexOf(',') + 1);
                base64 = base64.Trim('\0');
                byte[] modelData = Convert.FromBase64String(base64);
                if (!Directory.Exists(folder))
                    {
                        Directory.CreateDirectory(folder);
                    }
                var fileName = factory + "_" + modelDTO.model_no +".jpg";
                string filePathImages = Path.Combine(folder, fileName);
                 // kiểm tra file cũ có chưa xóa đi
                if (System.IO.File.Exists(filePathImages))
                {
                    System.IO.File.Delete(filePathImages);
                }
                System.IO.File.WriteAllBytes(filePathImages, modelData);
                modelDTO.model_picture = factory+"/Model/"+ fileName;
            }
            
            if (await _modelService.Update(modelDTO))
            {
                return NoContent();
            }
            throw new Exception("Creating the Model failed on save");
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