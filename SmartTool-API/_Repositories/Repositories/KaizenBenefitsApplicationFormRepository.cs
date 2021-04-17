using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using SmartTooling_API._Repositories.Interfaces;
using SmartTooling_API.Data;
using SmartTooling_API.DTO;
using SmartTooling_API.Models;

namespace SmartTooling_API._Repositories.Repositories {
    public class KaizenBenefitsApplicationFormRepository : MainRepository<Kaizen_Benefits_Application_Form>, IKaizenBenefitsApplicationFormRepository {

        public KaizenBenefitsApplicationFormRepository (DataContext context, IConfiguration configuration) : base (context, configuration) {
        }

        public async Task<bool> CheckKaizenDescriptionExist (Kaizen_Benefits_Application_FormDTO model,string factory) {
            {
                return false;
            }
        }
    }
}