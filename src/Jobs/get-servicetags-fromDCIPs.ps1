$dcips = Get-Content -Raw -Path "C:\Users\weixzha\Desktop\azure-dcips.json" | ConvertFrom-Json | Select -First 5
$svcTags = @()

foreach ($prop in $dcips.values)
{
    $svctag = @{
        Id = $prop.name
        Name = $prop.name
    }

    $svcTags = $svcTags + $svctag
}

$svcTags | ConvertTo-Json | Out-File "C:\Users\weixzha\Desktop\azure-servicetags.json"