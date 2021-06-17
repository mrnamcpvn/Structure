using System;
using System.IO;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using SmartTool_API._Services.Interfaces;
using SmartTool_API.DTOs;
using SmartTool_API.Helpers;

namespace SmartTool_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ModelController : ControllerBase
    {
        private string username;
        private string factory;
        private readonly IModelService _imodelservice;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public ModelController(IModelService imodelservice, IWebHostEnvironment webHostEnvironment, IConfiguration configuration) 
        {
            _imodelservice = imodelservice;
            _webHostEnvironment = webHostEnvironment;
            factory= configuration.GetSection("AppSettings:Factory").Value;
        }

        private string GetUserClaim(){
            return username = User.FindFirst(ClaimTypes.NameIdentifier).Value;
        }
        [HttpGet ("modeltype")]
        public async Task<IActionResult> GetAll()
        {
            var data = await _imodelservice.GetModelType();
            return Ok(data);
        }

        [HttpPut ("update")]
        public async Task<IActionResult> update([FromBody] ModelDTO modelDto){
            modelDto.update_by = GetUserClaim();
            modelDto.create_by = GetUserClaim();
            string folder = _webHostEnvironment.WebRootPath + "\\uploaded\\"+factory+"\\Model\\";
            if(modelDto.model_picture.Length > 100)
            {
                modelDto.model_picture = await GetNamePicture(modelDto, folder, 2);
            }
            
            if (await _imodelservice.Update(modelDto))
            {
                return NoContent();
            }
            throw new Exception("Creating the Model failed on save");

        }


        [HttpPost("model-list")]
        public async Task<IActionResult> Search([FromQuery] PaginationParams param, ModelParam modelParam)
        {
            var lists = await _imodelservice.SearchModel(param, modelParam);
            Response.AddPagination(lists.CurrentPage, lists.PageSize, lists.TotalCount, lists.TotalPages);
            return Ok(lists);
        }


        [HttpPost("createmodel")]
        public async Task<IActionResult> CreateModel([FromBody] ModelDTO modelDto)
        {
             modelDto.update_by = GetUserClaim();
            modelDto.create_by = GetUserClaim();
            modelDto.factory_id = factory;
            string folder = _webHostEnvironment.WebRootPath + "\\uploaded\\"+factory+"\\Model\\";
            if(modelDto.model_picture == null || modelDto.model_picture == "") {
                var fileName = "no-image.jpg";
                modelDto.model_picture = factory+"/Model/"+ fileName;
            } 
            else {
                modelDto.model_picture = await GetNamePicture(modelDto, folder, 1);
            }
            if (await _imodelservice.Add(modelDto))
            {
                return NoContent();
            }
            throw new Exception("Creating the Model failed on save");
        }

        [HttpPut("edit/{modelNo}")]
        public async Task<ActionResult> GetByFactoryAndModelNo(string modelNo)
        {
            var modelRepo = await _imodelservice.GetByFactoryAndModelNo(factory, modelNo);
            if (modelRepo != null)
            {
                return Ok(modelRepo);
            }
            return NoContent();
        }

        private async Task<string> GetNamePicture(ModelDTO modelDto, string folder, int checkUpdate) {
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

            if(checkUpdate != 1){
                // kiểm tra file cũ có chưa xóa đi
                if (System.IO.File.Exists(filePathImages))
                {
                    System.IO.File.Delete(filePathImages);
                }
            }

            System.IO.File.WriteAllBytes(filePathImages, modelData);
            modelDto.model_picture = factory+"/Model/"+ fileName;
            return await Task.FromResult<string>(modelDto.model_picture);
        }

    }
}