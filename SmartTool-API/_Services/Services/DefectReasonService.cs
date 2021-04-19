using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using SmartTool_API._Repositories.Interfaces;
using SmartTool_API._Services.Interfaces;
using SmartTool_API.DTO;
using SmartTool_API.Helpers;
using SmartTool_API.Models;
using SmartTooling_API.Helpers;

namespace SmartTool_API._Services.Services
{
    public class DefectReasonService : IDefectReasonService
    {
        private readonly IDefectReasonRepository _defectReason;
        private readonly IMapper _mapper;
        private readonly MapperConfiguration _configMapper;
        public DefectReasonService(IDefectReasonRepository defectReason, IMapper mapper, MapperConfiguration configMapper)
        {
            _configMapper = configMapper;
            _mapper = mapper;
            _defectReason = defectReason;

        }
        public async Task<bool> Add(DefectReasonDTO model)
        {
            var defectreason = _mapper.Map<Defect_Reason>(model);
            _defectReason.Add(defectreason);
            return await _defectReason.SaveAll();
        }

        public async Task<bool> CheckDefectReasonExists(string defectReasonID)
        {
            return await _defectReason.CheckDefectReasonExists(defectReasonID);
        }

        public Task<bool> Delete(object id)
        {
            throw new System.NotImplementedException();
        }

        public Task<List<DefectReasonDTO>> GetAllAsync()
        {
            throw new System.NotImplementedException();
        }

        public DefectReasonDTO GetById(object id)
        {
            throw new System.NotImplementedException();
        }

        public Task<PagedList<DefectReasonDTO>> GetWithPaginations(PaginationParam param)
        {
            throw new System.NotImplementedException();
        }

        public Task<PagedList<DefectReasonDTO>> Search(PaginationParam param, object text)
        {
            throw new System.NotImplementedException();
        }

        public async Task<PagedList<DefectReasonDTO>> SearchDefectReason(PaginationParam paginationParam, DefectReasonParam defectReasonParam)
        {
            var query = _defectReason.FindAll();
            if(!string.IsNullOrEmpty(defectReasonParam.active)){
                //active selected
                if(defectReasonParam.active != "all"){
                    query = query.Where(a => a.defect_reason_id.Contains(defectReasonParam.defect_Reason));
                    query = query.Where(a => a.is_active == defectReasonParam.active.ToBool());
                }
                //all
                else{
                    //defect reason id input trim != empty
                    if(!String.IsNullOrEmpty(defectReasonParam.defect_Reason))
                        query = query.Where(a => a.defect_reason_id.Contains(defectReasonParam.defect_Reason) || a.defect_reason_name.Contains(defectReasonParam.defect_Reason));
                }
            }
            var list = query.ProjectTo<DefectReasonDTO>(_configMapper).OrderBy(x => x.sequence);
            return await PagedList<DefectReasonDTO>.CreateAsync(list, paginationParam.PageNumber, paginationParam.PageSize);
        }

        public async Task<bool> Update(DefectReasonDTO model)
        {
            var defectreason = _mapper.Map<Defect_Reason>(model);
            _defectReason.Update(defectreason);
            return await _defectReason.SaveAll();
        }
    }
}