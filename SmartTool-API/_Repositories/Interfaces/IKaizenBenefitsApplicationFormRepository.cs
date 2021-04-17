using System.Threading.Tasks;
using SmartTooling_API.Models;
using SmartTooling_API.DTO;
namespace SmartTooling_API._Repositories.Interfaces
{
    public interface IKaizenBenefitsApplicationFormRepository : IMainRepository<Kaizen_Benefits_Application_Form>
    {
          Task<bool> CheckKaizenDescriptionExist(Kaizen_Benefits_Application_FormDTO model,string factory);
    }
}