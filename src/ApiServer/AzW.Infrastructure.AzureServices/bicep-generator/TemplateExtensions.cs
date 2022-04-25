namespace AzW.Infrastructure.AzureServices
{
    public static class TemplateExtensions
    {
        public static string Stringify(this TemplateKey key)
        {
            var keyType =  key.GetType();

            var members = keyType.GetMembers();

            if (members != null &&  members.Length > 0)
            {
                var attrs =  members[0].GetCustomAttributes(false);

                foreach(var attr in attrs)
                {
                    if (attr is NameAttribute)
                    {
                        return ((NameAttribute)attr).Name;
                    }
                }
            }

            return key.ToString();
        }
    }
}