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
    public class ModelController : ControllerBase
    {
        private readonly IModelService _modelService;

        private readonly IWebHostEnvironment _webHostEnvironment;

        private string username ;
        private string factory ;

        public ModelController(IModelService modelService, IWebHostEnvironment webHostEnvironment)
        {
            _modelService = modelService;
            _webHostEnvironment = webHostEnvironment;
        }

        private string GetUserClaim() {
            return username = User.FindFirst(ClaimTypes.NameIdentifier).Value;
        }

        [HttpPost("model-list")]
        public async Task<IActionResult> GetModelList()
        {
            return Ok(await _modelService.GetAllAsync());
        }

        [HttpPost("model-add")]
        public async Task<ActionResult> AddModel([FromBody] ModelDTO model)
        {
            return Ok(await _modelService.AddAsync(model));
        }

        [HttpPost("model-search")]
        public async Task<IActionResult> Search([FromQuery] PaginationParams param, ModelParam modelParam)
        {
            var lists = await _modelService.SearchModel(param, modelParam);
            Response.AddPagination(lists.CurrentPage, lists.PageSize, lists.TotalCount, lists.TotalPages);
            return Ok(lists);
        }

        [HttpPost("updateModel")]
        public async Task<IActionResult> updateModel([FromBody] ModelDTO modelDto)
        {
            modelDto.update_by = GetUserClaim();
            modelDto.update_time = DateTime.Now;    
            string folder = _webHostEnvironment.WebRootPath + "\\uploaded\\"+factory+"\\Model\\";
            if(modelDto.model_picture.Length > 100)
            {
                var source = modelDto.model_picture;
                string base64 = source.Substring(source.IndexOf(',') + 1);
                base64 = base64.Trim('\0');
                byte[] modelData = Convert.FromBase64String(base64);
                if (!Directory.Exists(folder))
                    {
                        Directory.CreateDirectory(folder);
                    }
                var fileName = factory + "_" + modelDto.model_no +".jpg";
                string filePathImages = Path.Combine(folder, fileName);
                 // kiểm tra file cũ có chưa xóa đi
                if (System.IO.File.Exists(filePathImages))
                {
                    System.IO.File.Delete(filePathImages);
                }
                System.IO.File.WriteAllBytes(filePathImages, modelData);
                modelDto.model_picture = factory+"/Model/"+ fileName;
            }
            
            if (await _modelService.Update(modelDto))
            {
                return NoContent();
            }
            throw new Exception("Creating the Model failed on save");
        }

        [HttpGet("edit-model")]
        public async Task<ActionResult> GetByFactoryAndModelNo(string modelNo)
        {
            var modelRepo = await _modelService.GetByFactoryAndModelNo(factory, modelNo);
            if (modelRepo != null)
            {
                return Ok(modelRepo);
            }
            return NoContent();
        }

        [HttpPost("delete-Model")]
        public async Task<IActionResult> DeleteModelOperation(ModelDTO modelDTO)
        {
            if (await _modelService.Delete(modelDTO))
                return NoContent();
            return BadRequest($"The Model is already in use, it cannot be deleted");
        }
    }


}