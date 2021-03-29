using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using SmartTool_API._Repositories.Interfaces;
using SmartTool_API.Data;
using SmartTool_API.DTO;
using SmartTool_API.Models;

namespace SmartTool_API._Repositories.Repositories
{
    public class KaizenRepository : MainRepository<Kaizen, string>, IKaizenRepository
    {
        private readonly DataContext _context;

        public KaizenRepository(DataContext context,IConfiguration configuration) : base(context, configuration)
        {
            _context = context;
        }

        public async Task<bool> CheckExistsKaizen(ModelOperationDTO operationDTO)
        {
            if(await _context.Kaizen.AnyAsync(x => x.factory_id == operationDTO.factory_id
                                                && x.model_no == operationDTO.model_no
                                                && x.stage_id == operationDTO.stage_id
                                                && x.operation_id == operationDTO.operation_id))
            {
                return true;
            }
            else{
                return false;
            }
        }

        public async Task<bool> CheckKaizenDescriptionExist(KaizenDTO kaizenDTO)
        {
            if(await _context.Kaizen.AnyAsync(x => x.factory_id == kaizenDTO.factory_id &&
                                                   x.model_no == kaizenDTO.model_no &&
                                                   x.serial_no != kaizenDTO.serial_no &&
                                                   x.kaizen_description == kaizenDTO.kaizen_description))
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