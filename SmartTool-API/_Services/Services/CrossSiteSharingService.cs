using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SmartTool_API._Repositories.Interfaces;
using SmartTool_API._Services.Interfaces;
using SmartTool_API.DTOs;
using SmartTool_API.Helpers;

namespace SmartTool_API._Services.Services
{
    public class CrossSiteSharingService : ICrossSiteSharingService
    {

        private readonly IKaizenBenefitsApplicationFormRepository _formRepository;
        private readonly IModelRepository _repoModel;
        private readonly IKaizenRepository _kaizen;
        private readonly IModelOperationRepository _modelOperationRepository;
        private readonly IMapper _mapper;

        public CrossSiteSharingService(IKaizenBenefitsApplicationFormRepository formRepository, 
        IModelRepository repoModel, IKaizenRepository kaizen, 
        IModelOperationRepository modelOperationRepository, IMapper mapper)
        {
            _formRepository = formRepository;
            _repoModel = repoModel;
            _kaizen = kaizen;
            _modelOperationRepository = modelOperationRepository;
            _mapper = mapper;
        }

        public async Task<CrossSiteSharingEditDTO> GetCrossSiteSharingEdit(string factory, string modelNO, string serialNo)
        {
            var form = _formRepository.FindAll(x=>x.to_factory_id.Trim() ==factory.Trim()  && x.model_no.Trim() == modelNO && x.serial_no == serialNo.ToInt());
            var model = _repoModel.FindAll();
            var kaizen = _kaizen.FindAll();   
            var modelOperation = _modelOperationRepository.FindAll();

            var data = await (from a in form 
                        join  b in model on new {a.factory_id,a.model_no} equals new {b.factory_id,b.model_no}
                        
                        join c in kaizen on new {a.factory_id,a.model_no,a.serial_no} 
                        equals new {c.factory_id,c.model_no,c.serial_no}
                        
                        join d in modelOperation on new {c.factory_id,c.model_no,c.operation_id} 
                        equals
                        new {d.factory_id,d.model_no,d.operation_id}
                        select new CrossSiteSharingEditDTO(){
                        crossSiteSharingDTO = _mapper.Map<Kaizen_Benefits_Application_FormDTO>(a),
                         kaizen_type_eliminate = c.kaizen_type_eliminate,
                         kaizen_type_reduce = c.kaizen_type_reduce,
                         kaizen_type_combine = c.kaizen_type_combine,
                         kaizen_type_smart_tool = c.kaizen_type_smart_tool,
                         kaizen_description = c.kaizen_description,
                         before_media = c.before_media,
                         after_media = c.after_media,
                         ct_before_sec = c.ct_before_sec,
                         ct_after_sec = c.ct_after_sec,
                         rft_before_percent = c.rft_before_percent,
                         rft_after_percent = c.rft_after_percent,
                         model_name = b.model_name,
                         operation_name_en = d.operation_name_en,
                         operation_name_zh = d.operation_name_zh
                        }).ToListAsync();
            return _mapper.Map<List<CrossSiteSharingEditDTO>>(data).FirstOrDefault();
        }

        public Task<List<CrossSiteSharingEditDTO>> GetCrossSiteSharingPDF(List<CrossSiteSharingDTO> filterParam)
        {
            throw new System.NotImplementedException();
        }

        public async Task<PagedList<CrossSiteSharingDTO>> Search(PaginationParams param, CrossSiteSharingParam filterParam)
        {
            var form = _formRepository.FindAll();
            var model = _repoModel.FindAll();
            var kaizen = _kaizen.FindAll();
            if(!string.IsNullOrEmpty(filterParam.factory_id))
            {
                form = form.Where(x=>x.to_factory_id.Trim() == filterParam.factory_id.Trim());
            }
             if(!string.IsNullOrEmpty(filterParam.model_no)) {
                 model = model.Where(x=>x.model_no.Contains(filterParam.model_no)
                 || x.model_name.Contains(filterParam.model_no));
             }
            var data = (from a in form join 
                        b in model on new {a.factory_id,a.model_no} equals new {b.factory_id,b.model_no}
                        join c in kaizen on new {a.factory_id,a.model_no,a.serial_no} equals 
                        new {c.factory_id,c.model_no,c.serial_no}
                        select new CrossSiteSharingDTO() {
                            doc_no =a.doc_no,
                            model_no = b.model_no,
                            model_name = b.model_name,
                            serial_no = a.serial_no,
                            kaizen_description = c.kaizen_description,
                            to_factory_id = a.to_factory_id,
                            IsChoise = false
                        }).OrderBy(x => x.doc_no == null ? 0 : 1).ThenByDescending(x => x.doc_no).ThenBy(x => x.model_no);
                return await PagedList<CrossSiteSharingDTO>.CreateAsync(data, param.PageNumber, param.PageSize);
        }

        public Task<OperationResult> UpdateCrossSiteSharing(Kaizen_Benefits_Application_FormDTO model)
        {
            throw new System.NotImplementedException();
        }
        
    }
}