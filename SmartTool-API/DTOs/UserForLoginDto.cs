namespace SmartTool_API.DTOs
{
    public class UserForLoginDto
    {
        public string Account { get; set; }
        public string Password { get; set; }
        public string OldPassword { get; set; }
    }
}