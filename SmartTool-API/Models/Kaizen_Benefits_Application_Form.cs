using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartTool_API.Models
{
    public partial class Kaizen_Benefits_Application_Form
    {
[Key]
[StringLength(50)]
public string factory_id { get; set; }
[Key]
[StringLength(8)]
public string model_no { get; set; }
[Key]
public int serial_no { get; set; }
[Key]
[StringLength(50)]
public string to_factory_id { get; set; }
[StringLength(11)]
public string doc_no { get; set; }
[Column(TypeName = "date")]
public DateTime? fill_in_date { get; set; }
[StringLength(50)]
public string proposed_by_facility { get; set; }
[StringLength(10)]
public string proposed_by_dept { get; set; }
[StringLength(200)]
public string proposed_by_name_id { get; set; }
[StringLength(4000)]
public string team_member { get; set; }
public bool? benefits_category_hse { get; set; }
public bool? benefits_category_delivery { get; set; }
public bool? benefits_category_quality { get; set; }
public bool? benefits_category_efficiency { get; set; }
public bool? benefits_category_others { get; set; }
[Column(TypeName = "numeric(18, 2)")]
public decimal? estimated_savings_per_month { get; set; }
[Column(TypeName = "numeric(18, 2)")]
public decimal? estimated_roi { get; set; }
[Required]
[StringLength(50)]
public string create_by { get; set; }
[Column(TypeName = "datetime")]
public DateTime create_time { get; set; }
[Required]
[StringLength(50)]
public string update_by { get; set; }
[Column(TypeName = "datetime")]
public DateTime update_time { get; set; }
    }
}
