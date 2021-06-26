using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace SmartTool_API._Services.Interfaces
{
    public interface IUploadFIleService
    {
         Task<string> UploadFiles(List<IFormFile> files, string name, string fileFolder);
        Task<string> UploadFile(IFormFile file, string name, string fileFolder);
        void DeleteFileUpload(string files, string fileFolder);
        string CheckTrueFalse(bool param);
    }
}