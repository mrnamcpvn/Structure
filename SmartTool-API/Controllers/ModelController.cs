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
        private readonly IModelService _modelS;
        private readonly IWebHostEnvironment _webHostEnvironment;
        private string factory;
        private string username;
        public ModelController(IModelService modelS, IWebHostEnvironment webHostEnvironment, IConfiguration configuration)
        {
            _webHostEnvironment = webHostEnvironment;
            _modelS = modelS;
            factory = configuration.GetSection("AppSettings:Factory").Value;
        }

        private string GetUserClaim()
        {
            return username = User.FindFirst(ClaimTypes.NameIdentifier).Value;
        }

        [HttpPost("model-list")]
        public async Task<IActionResult> Search([FromQuery] PaginationParam param, ModelParam modelParam)
        {
            var lists = await _modelS.SearchModel(param, modelParam);
            Response.AddPagination(lists.CurrentPage, lists.PageSize, lists.TotalCount, lists.TotalPages);
            return Ok(lists);
        }


        [HttpPost("createModel")]
        public async Task<IActionResult> CreateModel([FromBody] ModelDTO modelDto)
        {
            modelDto.update_by = GetUserClaim();
            modelDto.create_by = GetUserClaim();
            modelDto.factory_id = factory;
            string folder = _webHostEnvironment.WebRootPath + "\\uploaded\\" + factory + "\\Model\\";
            if (modelDto.model_picture == null || modelDto.model_picture == "")
            {
                var fileName = "no-image.jpg";
                modelDto.model_picture = factory + "/Model/" + fileName;
            }
            else
            {
                var source = modelDto.model_picture;
                string base64 = source.Substring(source.IndexOf(',') + 1);
                base64 = base64.Trim('\0');
                byte[] modelData = Convert.FromBase64String(base64);
                if (!Directory.Exists(folder))
                {
                    Directory.CreateDirectory(folder);
                }
                var fileName = factory + "_" + modelDto.model_no + ".jpg";
                string filePathImages = Path.Combine(folder, fileName);
                System.IO.File.WriteAllBytes(filePathImages, modelData);
                modelDto.model_picture = factory + "/Model/" + fileName;
            }
            var result = await _modelS.Add(modelDto);
            return Ok(result);
        }

        [HttpGet("edit/{modelNo}")]
        public async Task<ActionResult> GetByFactoryAndModelNo(string modelNo)
        {
            var modelRepo = await _modelS.GetByFactoryAndModelNo(factory, modelNo);
            if (modelRepo != null)
            {
                return Ok(modelRepo);
            }
            return NoContent();
        }

        [HttpPost("updateModel")]
        public async Task<IActionResult> updateModel([FromBody] ModelDTO modelDto)
        {
            modelDto.update_by = GetUserClaim();
            modelDto.update_time = DateTime.Now;
            string folder = _webHostEnvironment.WebRootPath + "\\uploaded\\" + factory + "\\Model\\";
            if (modelDto.model_picture.Length > 100)
            {
                var source = modelDto.model_picture;
                string base64 = source.Substring(source.IndexOf(',') + 1);
                base64 = base64.Trim('\0');
                byte[] modelData = Convert.FromBase64String(base64);
                if (!Directory.Exists(folder))
                {
                    Directory.CreateDirectory(folder);
                }
                var fileName = factory + "_" + modelDto.model_no + ".jpg";
                string filePathImages = Path.Combine(folder, fileName);
                // kiểm tra file cũ có chưa xóa đi
                if (System.IO.File.Exists(filePathImages))
                {
                    System.IO.File.Delete(filePathImages);
                }
                System.IO.File.WriteAllBytes(filePathImages, modelData);
                modelDto.model_picture = factory + "/Model/" + fileName;
            }

            var result = await _modelS.Update(modelDto);
            return Ok(result);
        }


        [HttpGet("model-type")]
        public async Task<IActionResult> GetAllModelType()
        {
            var data = await _modelS.GetModelType();
            return Ok(data);
        }

    }
}