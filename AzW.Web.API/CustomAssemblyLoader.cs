using System;
using System.Reflection;
using System.Runtime.Loader;
using Serilog.Core;

namespace AzW.Web.API
{
    public class CustomAssemblyLoadContext : AssemblyLoadContext
        {
            public CustomAssemblyLoadContext(Logger logger)
            {
                _logger = logger;
            }

            public IntPtr LoadUnmanagedLibrary(string absolutePath)
            {
                //_logger.Information($"LoadUnmanagedLibrary.absolutePath: {absolutePath}");
                
                return LoadUnmanagedDll(absolutePath);
            }
            protected override IntPtr LoadUnmanagedDll(string unmanagedDllName)
            {
                return LoadUnmanagedDllFromPath(unmanagedDllName);
            }
            protected override Assembly Load(AssemblyName assemblyName)
            {
                throw new NotImplementedException();
            }

            private Logger _logger;
        }
}