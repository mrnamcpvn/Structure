using System.Threading.Tasks;
using SmartTool_API.DTOs;
using SmartTool_API.Helpers;

namespace SmartTool_API._Services.Interfaces
{
    public interface IKaizenService : IMainService<KaizenDTO>
    {
        Task<PagedList<KaizenDTO>> Search(PaginationParams paginationParams, string model_no, string factory);
        Task<KaizenDTO> GetID(string modelNO);
        Task<object> getfactory(string factory);
        Task<object> getKaizenForm();
        Task<object> getStage(string factory);
        Task<object> getProcess(string modelNO, string stage, string factory);
        Task<object> getOpera(string model, string stage, string process, string factory);
        Task<KaizenDTO> getKaizenEdit(string modelNO, string seriaNO, string factory);
        Task<OperationResult> addKaizen(KaizenDTO model);
        Task<OperationResult> uppdateKaizen(KaizenDTO model);

    }
}