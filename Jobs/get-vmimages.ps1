$loc="southeastasia"

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
#'MicrosoftSQLServer'
'MicrosoftTestLinuxPPS'
'MicrosoftVisualStudio'
'MicrosoftWindowsDesktop'
'MicrosoftWindowsServer'
'MicrosoftWindowsServerHPCPack'
)

$vmImgs = @()

$images = az vm image list --all --output json | ConvertFrom-Json

foreach($img in $images) {

    #windows only
    if($msPublishers.Contains($img.publisher)) {

        #split by camelcase
        $newOffer = $img.offer -csplit '(?=[A-Z])' -ne '' -join ' '
        $newOffer = $newOffer -csplit '[-_]' -ne '' -join ' '
        $newSku = $img.sku -csplit '[-_]' -ne '' -join ' '
        $vmImg = @{
            DisplayName = $newOffer + ' ' + $newSku
            SearcheableName = $newOffer + ' ' + $newSku
            Publisher = $img.publisher
            Offer = $img.offer
            Sku = $img.sku
            Version = $img.version
            }

       $vmImgs = $vmImgs + $vmImg
    } else {

        $newurn = $img.urn -csplit '[-_:]' -ne '' -join ' '

        $vmimg = @{
                    DisplayName = $newurn
                    SearcheableName = $newurn
                    Publisher = $img.publisher
                    Offer = $img.offer
                    Sku = $img.sku
                    Version = $img.version
                  }

        $vmimgs = $vmimgs + $vmimg

    }
}

$vmImgs | ConvertTo-Json | Out-File 'C:\Users\weixzha\Desktop\azure-vmimages.json'