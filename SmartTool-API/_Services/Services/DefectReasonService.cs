using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using OfficeOpenXml;
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
        private OperationResult operationResult;

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

        public async Task<PageListUtility<Defect_ReasonDTO>> GetWithPaginations(PaginationParams param)
        {
            var lists = _defectReason.FindAll().ProjectTo<Defect_ReasonDTO>(_mapperConfiguration).OrderByDescending(x => x.update_time);
            return await PageListUtility<Defect_ReasonDTO>.PageListAsync(lists, param.PageNumber, param.PageSize);
        }

        public async Task<OperationResult> ImportExcel(string pathFile, string user)
        {
            using (var package = new ExcelPackage(new FileInfo(pathFile)))
            {
                ExcelWorksheet workSheet = package.Workbook.Worksheets[0];
                int totalRows = workSheet.Dimension.Rows;
                for (int i = 2; i <= totalRows; i++)
                {
                    Defect_ReasonDTO new_defect_reason = new Defect_ReasonDTO();
                    new_defect_reason.factory_id ="SHC";
                    new_defect_reason.defect_reason_id = workSheet.Cells[i, 1].Value.ToString().Trim();
                    new_defect_reason.defect_reason_name = workSheet.Cells[i, 2].Value.ToString().Trim();
                    new_defect_reason.sequence = workSheet.Cells[i, 3].Value.ToInt();
                    new_defect_reason.is_active = workSheet.Cells[i, 4].Value.ToBool();
                    new_defect_reason.update_by = user;
                    new_defect_reason.update_time = DateTime.Now;

                    try
                    {
                        await Add(new_defect_reason);
                        operationResult = new OperationResult { Message = "Import Success", Success = true };
                    }
                    catch
                    {
                        operationResult = new OperationResult { Message = "Import Faild", Success = false };
                    }
                }
            }
            return await Task.FromResult(operationResult);
        }

        public async Task<PageListUtility<Defect_ReasonDTO>> Search(PaginationParams param, object text)
        {
            var lists = _defectReason.FindAll().ProjectTo<Defect_ReasonDTO>(_mapperConfiguration).Where(x => x.defect_reason_id.Contains(text.ToString()))
            .OrderBy(x => x.defect_reason_id);
            return await PageListUtility<Defect_ReasonDTO>.PageListAsync(lists, param.PageNumber, param.PageSize);
        }

        public async Task<PageListUtility<Defect_ReasonDTO>> SearchDefectReason(PaginationParams paginationParams, DefectReasonParam defectReasonParam)
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
            return await PageListUtility<Defect_ReasonDTO>.PageListAsync(list, paginationParams.PageNumber, paginationParams.PageSize);       
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