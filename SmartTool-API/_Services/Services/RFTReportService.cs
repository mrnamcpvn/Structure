using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using SmartTool_API._Repositories.Interfaces;
using SmartTool_API._Services.Interfaces;
using SmartTool_API.DTOs;
using SmartTool_API.Helpers;
using SmartTool_API.Models;

namespace SmartTool_API._Services.Services
{
    
    public class RFTReportService : IRFTReportService
    {

        private readonly IModelRepository _repoModel;
        private readonly IViewRFTReportDetailRepository _repoViewRFTReport;
        private readonly IViewRFTAVGRepository _repoViewRFTAVG;
        private readonly IMapper _mapper;
        private readonly MapperConfiguration _configMapper;
        private readonly IConfiguration _configuration;

        public RFTReportService(IModelRepository repoModel, IViewRFTReportDetailRepository repoViewRFTReport, IViewRFTAVGRepository repoViewRFTAVG, IMapper mapper, MapperConfiguration configMapper, IConfiguration configuration)
        {
            _repoModel = repoModel;
            _repoViewRFTReport = repoViewRFTReport;
            _repoViewRFTAVG = repoViewRFTAVG;
            _mapper = mapper;
            _configMapper = configMapper;
            _configuration = configuration;
        }

        public async Task<object> GetAVG(string factory_id, string model_no)
        {
            _configuration.GetSection("AppSettings:DataSeach").Value =factory_id.Trim();
            var rftavgall = await _repoViewRFTAVG.FindAll(a => a.factory_id.Trim() == factory_id && a.model_no == model_no).ToListAsync();
            var avgdata = (from all in rftavgall
                           select new
                           {
                               cr2 = all.CR2,
                               sms = all.SMS,
                               cs1 = all.CS1,
                               cs2 = all.CS2,
                               cs3 = all.CS3,
                               prod1 = all.PROD1,
                               prod2 = all.PROD2,
                               mp1 = all.MP1,
                               mp2 = all.MP2,
                               mp3 = all.MP3
                           }).FirstOrDefault();
            List<double?> avglist = new List<double?>() { avgdata.cr2, avgdata.sms, avgdata.cs1, avgdata.cs2, avgdata.cs3, avgdata.prod1, avgdata.prod2, avgdata.mp1, avgdata.mp2, avgdata.mp3 };
            var avg = avglist.Average();
            var data = (from a in rftavgall
                        select new
                        {
                            rftavg = a,
                            totalavg = avg
                        }).FirstOrDefault();
        _configuration.GetSection("AppSettings:DataSeach").Value ="";
            return data;
        }

        public async Task<PagedList<Model>> SearchRFTReport(PaginationParams paginationParams, RFTReportParam rftReportParam)
        {
            if (!String.IsNullOrEmpty(rftReportParam.factory_id))
            {
             _configuration.GetSection("AppSettings:DataSeach").Value =rftReportParam.factory_id.Trim();
            }
            var data = await _repoModel.FindAll().ToListAsync();
            if (!String.IsNullOrEmpty(rftReportParam.factory_id))
            {
                data = data.Where(x => x.factory_id.Trim() == rftReportParam.factory_id.Trim()).OrderByDescending(x => x.prod_season).ThenByDescending(x => x.volume).ToList();
            }
            if (!String.IsNullOrEmpty(rftReportParam.model_no))
            {
                data = data.Where(x => x.model_no.Contains(rftReportParam.model_no) || x.model_name.Contains(rftReportParam.model_no)).OrderByDescending(x => x.prod_season).ThenByDescending(x => x.volume).ToList();
            }
             _configuration.GetSection("AppSettings:DataSeach").Value ="";
            return PagedList<Model>.Create(data, paginationParams.PageNumber, paginationParams.PageSize);
        }

        public async Task<List<VW_RFTReportDetailDTO>> SearchRFTReportDetail(RFTReportParam rftReportParam)
        {
            _configuration.GetSection("AppSettings:DataSeach").Value =rftReportParam.factory_id.Trim();
            
            var data = await _repoViewRFTReport.FindAll(x => x.factory_id.Trim() == rftReportParam.factory_id.Trim() && x.model_no == rftReportParam.model_no.Trim())
                .OrderBy(x => x.sequence).ToListAsync();
            var result = _mapper.Map<List<VW_RFTReportDetail>, List<VW_RFTReportDetailDTO>>(data);
            _configuration.GetSection("AppSettings:DataSeach").Value ="";
            return result;
        }
    }
}