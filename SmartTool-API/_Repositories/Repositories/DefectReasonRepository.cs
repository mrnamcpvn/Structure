using System.Threading.Tasks;
using SmartTool_API._Repositories.Interfaces;
using SmartTool_API.Data;
using SmartTool_API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace SmartTool_API._Repositories.Repositories
{
  public class DefectReasonRepository : MainRepository<Defect_Reason>, IDefectReasonRepository
  {
    private readonly DataContext _context;
    public DefectReasonRepository(DataContext context, CBDataContext CBcontext, SHCDataContext SHCcontext,
                            SPCDataContext SPCcontext, TSHDataContext TSHcontext, IConfiguration configuration) :
                            base(context, CBcontext, SHCcontext, SPCcontext, TSHcontext, configuration)
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