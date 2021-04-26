using System.Threading.Tasks;
using SmartTool_API.DTO;
using SmartTool_API.Models;

namespace SmartTool_API._Repositories.Interfaces
{
    public interface IKaizenBenefitsApplicationFormRepository : IMainRepository<Kaizen_Benefits_Application_Form>
    {
          Task<bool> CheckKaizenDescriptionExist(Kaizen_Benefits_Application_FormDTO model,string factory);
    }
}