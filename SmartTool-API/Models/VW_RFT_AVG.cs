using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartTool_API.Models
{
    public partial class VW_RFT_AVG
    {
[Required]
[StringLength(50)]
public string factory_id { get; set; }
[Required]
[StringLength(8)]
public string model_no { get; set; }
[Column(TypeName = "numeric(5, 2)")]
public decimal? CR2 { get; set; }
[Column(TypeName = "numeric(5, 2)")]
public decimal? SMS { get; set; }
[Column(TypeName = "numeric(5, 2)")]
public decimal? CS1 { get; set; }
[Column(TypeName = "numeric(5, 2)")]
public decimal? CS2 { get; set; }
[Column(TypeName = "numeric(5, 2)")]
public decimal? CS3 { get; set; }
[Column(TypeName = "numeric(5, 2)")]
public decimal? PROD1 { get; set; }
[Column(TypeName = "numeric(5, 2)")]
public decimal? PROD2 { get; set; }
[Column(TypeName = "numeric(5, 2)")]
public decimal? MP1 { get; set; }
[Column(TypeName = "numeric(5, 2)")]
public decimal? MP2 { get; set; }
[Column(TypeName = "numeric(5, 2)")]
public decimal? MP3 { get; set; }
    }
}
