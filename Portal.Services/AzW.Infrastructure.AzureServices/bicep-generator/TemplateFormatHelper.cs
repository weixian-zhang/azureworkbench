using System;
using System.Collections.Generic;
using System.IO;
using System.Reflection;
using System.Text.RegularExpressions;
using AzW.Model;
using GenFu;
using Newtonsoft.Json.Linq;
using RandomNameGeneratorLibrary;

namespace AzW.Infrastructure.AzureServices
{
    public class TemplateFormatHelper
    {
        private static char[] bicepRscNameViolationChars = new char[]{'_', '-', ' ', ',', '@', '~', '`'};

        public static bool HasNextItem(int current, int total)
        {
            if(current < total - 1){
                return false;
            } else {
                return true;
            }
        }

        public static string GetBicepRscName(string rscType, string rscName, bool randomName = false)
        {
            if(randomName)
            {
                var placeGenerator = new PlaceNameGenerator();
                string randName = placeGenerator.GenerateRandomPlaceName();
                return rscType + randName;
            }

            var cleanChars = rscName.Split(bicepRscNameViolationChars, StringSplitOptions.RemoveEmptyEntries);
            string cleaned = String.Join("", cleanChars);
            return cleaned;
        }

        public static string ReplaceMultiLinBreaksWithSingle(string bicepTemplate)
        {
            bicepTemplate = Regex.Replace(bicepTemplate, @"(\r\n){1,}", Environment.NewLine);
            return bicepTemplate;
        }


        public static string FormatBicep(string bicepTemplate)
        {
            bicepTemplate = bicepTemplate.Replace("%MARKER_SPACE%", "  ").Trim();

            bicepTemplate = bicepTemplate.Replace("%MARKER_TAB%", "\t").Trim();

            return bicepTemplate;
        }

        public static string GetVMNICBicepName(string vmName)
        {
            string vmBicepName = TemplateFormatHelper.GetBicepRscName(ResourceType.NIC, vmName);
            return "nic" + vmBicepName;
        }

        public static string GetVMPrivateIP(string vmName)
        {
            //
            string nicBicep =  TemplateFormatHelper.GetVMNICBicepName(vmName);
            nicBicep = nicBicep + ".properties.ipConfigurations[0].properties.privateIPAddress";
            return nicBicep;
        }

        public class RandName { public string Title { get; set; }}
        public static string RandomName()
        {
            string name = A.New<RandName>().Title.ToLower();
            name = name.Trim().Replace(" ", "");
            if(name.Length > 10)
                name = name.Substring(0,9);
            return name;
        }
    }
}