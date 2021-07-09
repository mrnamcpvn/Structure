using Microsoft.Extensions.Configuration;
using SmartTool_API._Repositories.Interfaces;
using SmartTool_API.Data;
using SmartTool_API.Models;

namespace SmartTool_API._Repositories.Repositories
{
    public class ViewRFTReportDetailRepository : MainRepository<VW_RFTReportDetail>, IViewRFTReportDetailRepository
    {
        private readonly DataContext _context;
        public ViewRFTReportDetailRepository(DataContext context,SHCDataContext SHCcontext,IConfiguration configuration) : 
                            base(context,SHCcontext,configuration)
        {
            _context = context;
        }
    }
}