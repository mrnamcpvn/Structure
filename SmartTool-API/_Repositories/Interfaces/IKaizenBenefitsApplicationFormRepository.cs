using System.Threading.Tasks;
using SmartTool_API.DTOs;

namespace SmartTool_API._Repositories.Interfaces
{
    public interface IKaizenBenefitsApplicationFormRepository
    {
         Task<bool> CheckKaizenDescriptionExist(Kaizen_Benefits_Application_FormDTO model,string factory);
    }
}