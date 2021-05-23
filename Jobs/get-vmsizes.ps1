$loc = "southeastasia"
$result = @()
$sizes = AZVMSize -Location $loc | Select Name, NumberOfCores, MemoryInMB, MaxDataDiskCount

foreach($size in $sizes) {

   $vmSize = @{
        Name = $size.Name
        MemoryInMB = $size.MemoryInMB
        NumberOfCores = $size.NumberOfCores
        MaxNoOfDataDisks = $size.MaxDataDiskCount
   }

   $result = $result + $vmSize

}

$result | ConvertTo-Json | Out-File ".\azure-vmsizes.json"

