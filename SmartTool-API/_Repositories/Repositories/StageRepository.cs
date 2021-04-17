using Microsoft.Extensions.Configuration;
using SmartTooling_API._Repositories.Interfaces;
using SmartTooling_API.Data;
using SmartTooling_API.Models;

namespace SmartTooling_API._Repositories.Repositories
{
    public class StageRepository : MainRepository<Stage>, IStageRepository
    {
        public StageRepository(DataContext context,IConfiguration configuration) : 
                            base(context,configuration)
        {
        }
    }
}