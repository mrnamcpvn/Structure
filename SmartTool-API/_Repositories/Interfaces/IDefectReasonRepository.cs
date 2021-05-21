using System.Threading.Tasks;
using SmartTool_API.Models;
 

namespace SmartTool_API._Repositories.Interfaces
{
  public interface IDefectReasonRepository : IMainRepository<Defect_Reason>
  {
    Task<bool> CheckDefectReasonExists(string defectreasonID);
  }
}