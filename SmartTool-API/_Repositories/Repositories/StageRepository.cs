using Microsoft.Extensions.Configuration;
using SmartTool_API._Repositories.Interfaces;
using SmartTool_API.Data;
using SmartTool_API.Models;

namespace SmartTool_API._Repositories.Repositories
{
    public class StageRepository : MainRepository<Stage>, IStageRepository
    {
        public StageRepository(DataContext context, IConfiguration configuration) : base(context, configuration)
        {
        }
    }
}