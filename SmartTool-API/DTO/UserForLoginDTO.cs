namespace SmartTool_API.DTO
{
    public class UserForLoginDTO
    {
        public string Account { get; set; }
        public string Password { get; set; }
        public string OldPassword { get; set; }
    }
}