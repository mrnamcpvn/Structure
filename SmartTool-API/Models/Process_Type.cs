using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartTool_API.Models
{
    public partial class Process_Type
    {
[Key]
[StringLength(50)]
public string factory_id { get; set; }
[Key]
[StringLength(20)]
public string process_type_id { get; set; }
[Required]
[StringLength(100)]
public string process_type_name_local { get; set; }
[Required]
[StringLength(100)]
public string process_type_name_en { get; set; }
[Required]
[StringLength(100)]
public string process_type_name_zh { get; set; }
public int? sequence { get; set; }
public bool is_active { get; set; }
    }
}
