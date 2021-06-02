using Microsoft.Extensions.Configuration;
using SmartTool_API._Repositories.Interfaces;
using SmartTool_API.Data;
using SmartTool_API.Models;

namespace SmartTool_API._Repositories.Repositories
{
  public class ViewRFTAVGRepository : MainRepository<VW_RFT_AVG>, IViewRFTAVGRepository
  {
    private readonly DataContext _context;
    public ViewRFTAVGRepository(DataContext context, CBDataContext CBcontext, SHCDataContext SHCcontext,
                        SPCDataContext SPCcontext, TSHDataContext TSHcontext, IConfiguration configuration) :
                        base(context, CBcontext, SHCcontext, SPCcontext, TSHcontext, configuration)
    {
      _context = context;
    }
  }
}
