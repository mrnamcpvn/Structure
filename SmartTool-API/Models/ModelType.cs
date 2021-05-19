using System.ComponentModel.DataAnnotations;

namespace SmartTool_API.Models
{
  public class ModelType
  {
    [Key]
    [StringLength(50)]
    public string factory_id { get; set; }
    [Key]
    [StringLength(5)]
    public string model_type_id { get; set; }
    [StringLength(100)]
    public string model_type_name { get; set; }
    public bool is_active { get; set; }
  }
}