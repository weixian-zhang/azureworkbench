# $response = Invoke-WebRequest -Uri 'http://169.254.169.254/metadata/identity/oauth2/token?api-version=2018-02-01&client_id=af825a31-b0e0-471f-baea-96de555632f9&resource=https://management.azure.com/' -Method GET -Headers @{Metadata="true"}
# $content = $response.Content | ConvertFrom-Json
# $accessToken = $content.access_token
#Connect-AzAccount -AccessToken $accessToken


$loc = "southeastasia"
$result = @()
$sizes = AZVMSize -Location $loc | Select Name, NumberOfCores, MemoryInMB, MaxDataDiskCount

foreach($size in $sizes) {

   $nameSplitted = $size.Name.Split("_")

   $vmSize = @{
        QueryName = $nameSplitted[1]
        Name = $size.Name
        MemoryInMB = $size.MemoryInMB
        NumberOfCores = $size.NumberOfCores
        MaxNoOfDataDisks = $size.MaxDataDiskCount
   }

   $result = $result + $vmSize

}
$result | select -First 10

$result | ConvertTo-Json | Out-File ".\azure-vmsizes.json"

