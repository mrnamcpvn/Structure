using System.ComponentModel.DataAnnotations;

namespace SmartTool_API.Models
{
  public class Factory
  {
    [Key]
    [StringLength(50)]
    public string factory_id { get; set; }
    [StringLength(50)]
    public string factory_name { get; set; }
    [StringLength(50)]
    public string customer_name { get; set; }
    [StringLength(50)]
    public string location { get; set; }
  }
}