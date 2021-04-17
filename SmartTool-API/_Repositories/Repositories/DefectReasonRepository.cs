using System.Threading.Tasks;
using SmartTooling_API._Repositories.Interfaces;
using SmartTooling_API.Data;
using SmartTooling_API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace SmartTooling_API._Repositories.Repositories
{
  public class DefectReasonRepository : MainRepository<Defect_Reason>, IDefectReasonRepository
  {
    private readonly DataContext _context;
    public DefectReasonRepository(DataContext context ,IConfiguration configuration) : 
                            base(context,configuration)
    {
      _context = context;
    }

    public async Task<bool> CheckDefectReasonExists(string defectreasonID)
    {
      if (await _context.Defect_Reason.AnyAsync(x => x.defect_reason_id == defectreasonID))
      {
        return true;
      }
      else
      {
        return false;
      }
    }
  }
}