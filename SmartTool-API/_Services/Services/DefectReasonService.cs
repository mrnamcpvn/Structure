using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using SmartTool_API._Repositories.Interfaces;
using SmartTool_API._Services.Interfaces;
using SmartTool_API.DTO;
using SmartTool_API.Helpers;
using SmartTool_API.Models;

namespace SmartTool_API._Services.Services
{
    public class DefectReasonService : IDefectReasonService
    {
        private readonly IDefectReasonRepository _defectReason;
        private readonly IMapper _mapper;
        private readonly MapperConfiguration _configMapper;

        public DefectReasonService( IDefectReasonRepository defectReasonRepository, 
                                    IMapper mapper, 
                                    MapperConfiguration configMapper) {
            _configMapper = configMapper;
            _mapper = mapper;
            _defectReason = defectReasonRepository;
        }

        public async Task<bool> CheckDefectReasonExists(string defectreasonID)
        {
            return await _defectReason.CheckDefectReasonExists(defectreasonID);
        }

        // call by spa
        public async Task<PagedList<DefectReasonDTO>> SearchDefectReason(PaginationParams paginationParams, DefectReasonParam defectReasonParam)
        {
            var query = _defectReason.FindAll();
            if (!String.IsNullOrEmpty(defectReasonParam.active))
            {
                // active has been select
                if (defectReasonParam.active != "all")
                {
                    query = query.Where(a => a.defect_reason_id.Contains(defectReasonParam.defect_Reason) || a.defect_reason_name.Contains(defectReasonParam.defect_Reason));
                    query = query.Where(a => a.is_active == defectReasonParam.active.ToBool());
                }
                // all
                else
                {
                    // defect reason id input trim != empty
                    if (!String.IsNullOrEmpty(defectReasonParam.defect_Reason))
                    {
                        query = query.Where(a => a.defect_reason_id.Contains(defectReasonParam.defect_Reason) || a.defect_reason_name.Contains(defectReasonParam.defect_Reason));
                    }
                }
            }
            var list = query.ProjectTo<DefectReasonDTO>(_configMapper).OrderBy(x => x.sequence);
            return await PagedList<DefectReasonDTO>.CreateAsync(list, paginationParams.PageNumber, paginationParams.PageSize);
        }

        // disable
        public async Task<PagedList<DefectReasonDTO>> Search(PaginationParams param, object text)
        {
            //throw new System.NotImplementedException();
            var lists = _defectReason.FindAll().ProjectTo<DefectReasonDTO>(_configMapper)
            .Where(x => x.defect_reason_id.Contains(text.ToString()))
            .OrderBy(x => x.sequence);
            return await PagedList<DefectReasonDTO>.CreateAsync(lists, param.PageNumber, param.PageSize);
        }

        // disable
        public async Task<List<DefectReasonDTO>> GetAllAsync()
        {
            //throw new System.NotImplementedException();
            return await _defectReason.FindAll().ProjectTo<DefectReasonDTO>(_configMapper).OrderByDescending(x => x.update_time).ToListAsync();
        }

        // disable
        public DefectReasonDTO GetById(object id)
        {
            throw new System.NotImplementedException();
        }

        public async Task<PagedList<DefectReasonDTO>> GetWithPaginations(PaginationParams param)
        {
            var lists = _defectReason.FindAll().ProjectTo<DefectReasonDTO>(_configMapper).OrderByDescending(x => x.update_time);
            return await PagedList<DefectReasonDTO>.CreateAsync(lists, param.PageNumber, param.PageSize);
        }

        public async Task<bool> Add(DefectReasonDTO model)
        {
            var defectreason = _mapper.Map<Defect_Reason>(model);
            _defectReason.Add(defectreason);
            return await _defectReason.SaveAll();
        }
        public async Task<bool> Update(DefectReasonDTO model)
        {
            var defectreason = _mapper.Map<Defect_Reason>(model);
            _defectReason.Update(defectreason);
            return await _defectReason.SaveAll();
        }

        // disable
        public Task<bool> Delete(object id)
        {
            throw new System.NotImplementedException();
        }

        public Task<OperationResult> AddAsync(DefectReasonDTO model)
        {
            throw new NotImplementedException();
        }

        public Task<OperationResult> Delete(DefectReasonDTO model)
        {
            throw new NotImplementedException();
        }

        public Task<PagedList<DefectReasonDTO>> GetWithPagination(PaginationParams param)
        {
            throw new NotImplementedException();
        }
    }
}