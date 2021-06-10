namespace SmartTool_API.Helpers
{
    public static class ConvertUtility
    {

        
        public static bool ToBool (this object value) {
            if (value == null) {
                return false;
            }

            if (value.ToInt () == 1) {
                return true;
            }

            bool result = false;
            bool.TryParse (value.ToString (), out result);
            return result;
        }

        public static int ToInt (this object value) {
            if (value == null || value.ToString () == string.Empty)
                return 0;
            int result = 0;
            int.TryParse (value.ToString (), out result);
            return result;
        }

    }
}