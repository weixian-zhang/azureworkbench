$loc="southeastasia"

$vmImgs = @()



$publishers = Get-AzVMImagePublisher -Location $loc | Select PublisherName -First 3

foreach ($pub in $publishers) {

    $offers = Get-AzVMImageOffer -Location $loc -PublisherName $pub.PublisherName | Select Offer -First 3

    foreach($offer in $offers) {

        $skus = Get-AzVMImageSku -Location $loc -PublisherName $pub.PublisherName -Offer $offer.Offer | Select Sku -First 3

        foreach($sku in $skus) {

                $vmImg = @{
                    DisplayName = $pub.PublisherName
                    Publisher = $pub.PublisherName
                    Offer = $offer.Offer
                    Sku = $sku.Sku
                }

            $vmImgs = $vmImgs + $vmImg
        }

    }

}

$vmImgs | ConvertTo-Json | Out-File 'C:\Users\adadmin\Desktop\azure-vmimages.json'