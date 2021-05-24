using System;
using System.Collections.Generic;
using System.IO;
using System.Reflection;
using System.Text.RegularExpressions;
using AzW.Model;
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
    }
}