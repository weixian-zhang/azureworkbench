
$result = @()

$msPublishers = @(
'MicrosoftAzureSiteRecovery'
'MicrosoftBizTalkServer'
'microsoftcmotest'
'MicrosoftDynamicsAX'
'MicrosoftDynamicsGP'
'MicrosoftDynamicsNAV'
'microsoftfarmbeats'
'MicrosoftHybridCloudStorage'
'MicrosoftOSTC'
'MicrosoftPowerBI'
'MicrosoftRServer'
'MicrosoftSharePoint'
'MicrosoftSQLServer'
'MicrosoftTestLinuxPPS'
'MicrosoftVisualStudio'
'MicrosoftWindowsDesktop'
'MicrosoftWindowsServer'
'MicrosoftWindowsServerHPCPack'
)

$publishers = az vm image list-publishers -l 'southeastasia' --query [].name -o tsv --output json
$publishers = $publishers | ConvertFrom-Json

foreach($pub in $publishers) {
    $SearchableName = $pub -csplit '[-_.]' -ne '' -join ' '

    if($msPublishers.Contains($img.publisher)) {
        $SearchableName = $SearchableName -csplit '(?=[A-Z])' -ne '' -join ' '
    }

    $newPub = @{
        Publisher = $pub
        SearchableName = $SearchableName
    }

    $result = $result + $newPub
}

$result | ConvertTo-Json | Out-File 'C:\Users\weixzha\Desktop\azure-vmimage-publisher.json'

<#
"vmimage-publisher-a10networks "
"vmimage-offersku-a10networks "
#>