using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartTool_API.Models
{
    public partial class VW_RFTReportDetail
    {
        [Required]
        [StringLength(50)]
        public string factory_id { get; set; }
        [Required]
        [StringLength(8)]
        public string model_no { get; set; }
        public int sequence { get; set; }
        [Required]
        [StringLength(200)]
        public string operation_name_local { get; set; }
        [Required]
        [StringLength(200)]
        public string operation_name_en { get; set; }
        [Required]
        [StringLength(50)]
        public string operation_id { get; set; }
        [Column(TypeName = "numeric(18, 2)")]
        public decimal? CR2 { get; set; }
        [Column(TypeName = "numeric(18, 2)")]
        public decimal? SMS { get; set; }
        [Column(TypeName = "numeric(18, 2)")]
        public decimal? CS1 { get; set; }
        [Column(TypeName = "numeric(18, 2)")]
        public decimal? CS2 { get; set; }
        [Column(TypeName = "numeric(18, 2)")]
        public decimal? CS3 { get; set; }
        [Column(TypeName = "numeric(18, 2)")]
        public decimal? PROD1 { get; set; }
        [Column(TypeName = "numeric(18, 2)")]
        public decimal? PROD2 { get; set; }
        [Column(TypeName = "numeric(18, 2)")]
        public decimal? MP1 { get; set; }
        [Column(TypeName = "numeric(18, 2)")]
        public decimal? MP2 { get; set; }
        [Column(TypeName = "numeric(18, 2)")]
        public decimal? MP3 { get; set; }
    }
}
