using System;
using System.IO;
using System.IO.Compression;
using System.Text;
using ByteSizeLib;

namespace AzW.Infrastructure.Data
{
    public class StringZipper
    {
        //to base64 compressed string
        public static string Zip(string str) {
        var bytes = Encoding.UTF8.GetBytes(str);

            using (var msi = new MemoryStream(bytes)) {
                using (var mso = new MemoryStream()) {
                    using (var gs = new GZipStream(mso, CompressionMode.Compress)) {
                        CopyTo(msi, gs);
                    }

                    return Convert.ToBase64String(mso.ToArray());
                }
            }
        }

        public static string Unzip(string base64ZippedString) {

            byte[] bytes = Convert.FromBase64String(base64ZippedString);

            if(!IsGZip(bytes)) //handle prev created diagram that is not compressed
                return base64ZippedString;

            using (var msi = new MemoryStream(bytes))
            using (var mso = new MemoryStream()) {
                using (var gs = new GZipStream(msi, CompressionMode.Decompress)) {
                    CopyTo(gs, mso);
                }

                return Encoding.UTF8.GetString(mso.ToArray());
            }
        }

        private static void CopyTo(Stream src, Stream dest) {
            byte[] bytes = new byte[4096];

            int cnt;

            while ((cnt = src.Read(bytes, 0, bytes.Length)) != 0) {
                dest.Write(bytes, 0, cnt);
            }
        }

        public static bool IsGZip(byte[] arr)
        {
            return arr.Length >= 2 && arr[0] == 31 && arr[1] == 139;
        }

        public static bool IsDiagramStringMoreThanTwoMB(string diagram)
        {
            int stringSizeInByte = System.Text.ASCIIEncoding.ASCII.GetByteCount(diagram);
            var bs = ByteSize.FromBytes(Convert.ToDouble(stringSizeInByte));

             if(bs.MegaBytes > 2)
                return true;
            else
                return false;
        }
    }
}