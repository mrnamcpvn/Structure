using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartTool_API.Models
{
    public partial class Model_Type
    {
[Key]
[StringLength(50)]
public string factory_id { get; set; }
[Key]
[StringLength(5)]
public string model_type_id { get; set; }
[Required]
[StringLength(100)]
public string model_type_name { get; set; }
public bool is_active { get; set; }
    }
}
