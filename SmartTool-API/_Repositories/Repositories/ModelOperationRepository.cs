using System.Linq;
using System.Threading.Tasks;
using AutoMapper.Configuration;
using Microsoft.EntityFrameworkCore;
using SmartTool_API._Repositories.Interfaces;
using SmartTool_API.Data;
using SmartTool_API.Helpers;
using SmartTool_API.Models;

namespace SmartTool_API._Repositories.Repositories
{
  public class ModelOperationRepository : MainRepository<ModelOperation>,IModelOperationRepository
  {
    private readonly DataContext _context;
    public ModelOperationRepository(DataContext context, IConfiguration configuration) : base(context, configuration)
    {
        _context = context;
    }

    public async Task<ModelOperation> GetByModelOperation(ModelOperationEditParam modelParam)
    {
      return await _context.ModelOperation.Where(x => x.factory_id == modelParam.factory_id
      && x.model_no == modelParam.model_no
      && x.stage_id == modelParam.stage_id
      && x.operation_id == modelParam.operation_id).FirstOrDefaultAsync();
    }
  }
}