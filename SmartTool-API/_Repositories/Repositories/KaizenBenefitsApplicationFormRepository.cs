using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using SmartTool_API._Repositories.Interfaces;
using SmartTool_API.Data;
using SmartTool_API.DTO;
using SmartTool_API.Models;

namespace SmartTool_API._Repositories.Repositories {
    public class KaizenBenefitsApplicationFormRepository : MainRepository<Kaizen_Benefits_Application_Form>, IKaizenBenefitsApplicationFormRepository {
         private readonly SHCDataContext _SHCcontext;
        public KaizenBenefitsApplicationFormRepository (DataContext context, SHCDataContext SHCcontext, IConfiguration configuration) 
        : base (context,  SHCcontext, configuration) {
            _SHCcontext = SHCcontext;
        }

        public async Task<bool> CheckKaizenDescriptionExist (Kaizen_Benefits_Application_FormDTO model,string factory) {
          if(factory.Trim()=="SHC" && await _SHCcontext.Kaizen_Benefits_Application_Form.AnyAsync(x => x.factory_id == model.factory_id &&
                                                   x.model_no == model.model_no &&
                                                   x.serial_no == model.serial_no &&
                                                   x.to_factory_id == model.to_factory_id))
            {
                return true;
            }
             if(factory.Trim()=="TSH" && await _SHCcontext.Kaizen_Benefits_Application_Form.AnyAsync(x => x.factory_id == model.factory_id &&
                                                   x.model_no == model.model_no &&
                                                   x.serial_no == model.serial_no &&
                                                   x.to_factory_id == model.to_factory_id))
            {
                return true;
            }
             if(factory.Trim()=="SPC" && await _SHCcontext.Kaizen_Benefits_Application_Form.AnyAsync(x => x.factory_id == model.factory_id &&
                                                   x.model_no == model.model_no &&
                                                   x.serial_no == model.serial_no &&
                                                   x.to_factory_id == model.to_factory_id))
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