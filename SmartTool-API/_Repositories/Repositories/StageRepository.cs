using Microsoft.Extensions.Configuration;
using SmartTool_API._Repositories.Interfaces;
using SmartTool_API.Data;
using SmartTool_API.Models;

namespace SmartTool_API._Repositories.Repositories
{
    public class StageRepository : MainRepository<Stage, string>, IStageRepository
    {
        private readonly DataContext _context;

        public StageRepository(DataContext context, IConfiguration configuration) : base(context, configuration)
        {
            _context = context;
        }
    }
}