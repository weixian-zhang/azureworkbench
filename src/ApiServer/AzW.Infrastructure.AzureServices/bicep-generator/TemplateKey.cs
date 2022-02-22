namespace AzW.Infrastructure.AzureServices
{
    public enum TemplateKey
    {
        [Name("Main")]
        Main,

        [Name("VNet")]
        VNet
    }

    public class NameAttribute : System.Attribute
    {
        public NameAttribute(string name)
        {
            Name = name;
        }

        public string Name { get; set; }
    }
}