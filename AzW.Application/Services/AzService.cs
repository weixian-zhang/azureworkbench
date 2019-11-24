namespace AzW.Application
{
    public class AzService : IAzService
    {
        public IARMService ArmService { get; set; }
        public IComputeService ComputeService { get; set; }
        public IDeployService DeployService { get; set; }
    }
}