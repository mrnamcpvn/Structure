using System.Threading.Tasks;
using SmartTooling_API.Models;

namespace SmartTooling_API._Repositories.Interfaces
{
  public interface IDefectReasonRepository : IMainRepository<Defect_Reason>
  {
    Task<bool> CheckDefectReasonExists(string defectreasonID);
  }
}