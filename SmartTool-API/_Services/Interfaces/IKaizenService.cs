using System.Collections.Generic;
using System.Threading.Tasks;
using SmartTool_API.DTO;
using SmartTool_API.Helpers;

namespace SmartTool_API._Services.Interfaces
{
    public interface IKaizenService : IMainService<KaizenDTO>
    {
        Task<PagedList<KaizenDTO>> Search(PaginationParams param, string model_no, string factory);
        Task<KaizenDTO> GetbyID(string modelNo);
        Task<object> GetModelNo(string factory);
        Task<object> GetKaizenFrom();
        Task<object> GetStage(string factory);
        Task<object> GetProcess(string modelNo, string stage, string factory);
        Task<object> Getopera(string modelNo, string stage, string process, string factory);
        Task<KaizenDTO> GetKaizenEdit(string modelNo, string serialNo, string factory);
        Task<OperationResult> AddKaizen(KaizenDTO model);
        Task<OperationResult> UpdateKaizen(KaizenDTO model);
    }
}