using System.Threading.Tasks;
using SmartTool_API.Models;
using SmartTool_API.DTO;
namespace SmartTool_API._Repositories.Interfaces
{
    public interface IKaizenBenefitsApplicationFormRepository : IMainRepository<KaizenBenefitsApplicationForm>
    {
          Task<bool> CheckKaizenDescriptionExist(KaizenBenefitsApplicationFormDTO model,string factory);
    }
}