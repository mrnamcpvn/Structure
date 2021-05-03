using System.Collections.Generic;
using System.Threading.Tasks;
using SmartTool_API.DTO;
using SmartTool_API.Helpers;

namespace SmartTool_API._Services.Interfaces
{
    public interface ICrossSiteSharingService
    {
        Task<PagedList<CrossSiteSharingDTO>> Search(PaginationParam param, CrossSiteSharingParam filterParam);
        Task<CrossSiteSharingEditDTO> GetCrossSiteSharingEdit(string factory, string modelNo, string serialNo);
        Task<List<CrossSiteSharingEditDTO>> GetCrossSiteSharingPDF(List<CrossSiteSharingDTO> filterParam);
        Task<OperationResult> UpdateCrossSiteSharing(Kaizen_Benefits_Application_FormDTO model);
    }
}