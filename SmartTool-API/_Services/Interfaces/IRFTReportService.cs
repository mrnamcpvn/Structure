﻿using System.Collections.Generic;
using System.Threading.Tasks;
using SmartTooling_API.DTO;
using SmartTooling_API.Helpers;
using SmartTooling_API.Models;

namespace SmartTooling_API._Services.Interfaces
{
    public interface IRFTReportService
    {
        Task<PagedList<Model>> SearchRFTReport(PaginationParams paginationParams, RFTReportParam rftReportParam);

        //Task<PagedList<VW_RFTReportDetailDTO>> SearchRFTReportDetail(PaginationParams paginationParams, RFTReportParam rftReportParam);

        Task<List<VW_RFTReportDetailDTO>> SearchRFTReportDetail(RFTReportParam rftReportParam);

        Task<object> GetAVG(string factory_id, string model_no);

    }
}
