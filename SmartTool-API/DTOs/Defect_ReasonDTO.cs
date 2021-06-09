using System;

namespace SmartTool_API.DTOs
{
    public class Defect_ReasonDTO
    {
        public string factory_id { get; set; }
        public string defect_reason_id { get; set; }
        public string defect_reason_name { get; set; }
        public int sequence { get; set; }
        public bool is_active { get; set; }
        public string update_by { get; set; }
        public DateTime update_time { get; set; }

        public Defect_ReasonDTO()
        {
            this.update_time = DateTime.Now;
        }
    }
}