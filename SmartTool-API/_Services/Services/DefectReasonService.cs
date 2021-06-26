using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using SmartTool_API._Repositories.Interfaces;
using SmartTool_API._Services.Interfaces;
using SmartTool_API.DTOs;
using SmartTool_API.Helpers;
using SmartTool_API.Models;

namespace SmartTool_API._Services.Services
{
    public class DefectReasonServcie : IDefectReasonService
    {

        private readonly IMapper _mapper;
        private readonly MapperConfiguration _mapperConfiguration;
        private readonly IDefectReasonRepository _defectReason;

        public DefectReasonServcie(IMapper mapper, MapperConfiguration mapperConfiguration, IDefectReasonRepository defectReason)
        {
            _mapper = mapper;
            _mapperConfiguration = mapperConfiguration;
            _defectReason = defectReason;
        }

        public async Task<bool> Add(Defect_ReasonDTO model)
        {
            var defectreason = _mapper.Map<Defect_Reason>(model);
            _defectReason.Add(defectreason);
            return await _defectReason.SaveAll();
        }

        public async Task<bool> CheckDefectReasonExists(string defectreasonID)
        {
            return await _defectReason.CheckDefectReasonExists(defectreasonID);
        }

        public Task<bool> Delete(object id)
        {
            throw new System.NotImplementedException();
        }

        public void DeleteFileUpload(string files, string fileFolder)
        {
            throw new NotImplementedException();
        }

        public async Task<List<Defect_ReasonDTO>> GetAllAsync()
        {
            return await _defectReason.FindAll().ProjectTo<Defect_ReasonDTO>(_mapperConfiguration).OrderByDescending(x =>x.update_time).ToListAsync();
        }

        public Defect_ReasonDTO GetById(object id)
        {
            throw new System.NotImplementedException();
        }

        public async Task<PagedList<Defect_ReasonDTO>> GetWithPaginations(PaginationParams param)
        {
            var lists = _defectReason.FindAll().ProjectTo<Defect_ReasonDTO>(_mapperConfiguration).OrderByDescending(x => x.update_time);
            return await PagedList<Defect_ReasonDTO>.CreateAsync(lists, param.PageNumber, param.PageSize);
        }

        public async Task<PagedList<Defect_ReasonDTO>> Search(PaginationParams param, object text)
        {
            var lists = _defectReason.FindAll().ProjectTo<Defect_ReasonDTO>(_mapperConfiguration).Where(x => x.defect_reason_id.Contains(text.ToString()))
            .OrderBy(x => x.sequence);
            return await PagedList<Defect_ReasonDTO>.CreateAsync(lists, param.PageNumber, param.PageSize);
        }

        public async Task<PagedList<Defect_ReasonDTO>> SearchDefectReason(PaginationParams paginationParams, DefectReasonParam defectReasonParam)
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
                    if (!String.IsNullOrEmpty(defectReasonParam.defect_Reason))
                    {
                        query = query.Where(a => a.defect_reason_id.Contains(defectReasonParam.defect_Reason) || a.defect_reason_name.Contains(defectReasonParam.defect_Reason));
                    }
                }
            }
            var list = query.ProjectTo<Defect_ReasonDTO>(_mapperConfiguration).OrderBy(x => x.sequence);
            return await PagedList<Defect_ReasonDTO>.CreateAsync(list, paginationParams.PageNumber, paginationParams.PageSize);       
        }

        public async Task<bool> Update(Defect_ReasonDTO model)
        {
            var derr =_mapper.Map<Defect_Reason>(model);
            _defectReason.Update(derr);
            return await _defectReason.SaveAll(); 
        }

        public Task<string> UploadFile(IFormFile file, string name, string fileFolder)
        {
            throw new NotImplementedException();
        }

        public Task<string> UploadFiles(List<IFormFile> files, string name, string fileFolder)
        {
            throw new NotImplementedException();
        }
    }
}