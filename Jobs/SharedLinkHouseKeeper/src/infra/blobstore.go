package infra

import (
	"github.com/Azure/azure-storage-blob-go/azblob"
	"net/url"
	"fmt"
	"context"
)

type BlobStorage struct {}

const ContainerName string = "shateddiagrams"
var _container azblob.ContainerURL
var _secrets Secret
var _logger StrucLogger

func (bs BlobStorage) New(secrets Secret, logger StrucLogger) {

	_secrets = secrets
	_logger = logger

	//https://github.com/Azure-Samples/storage-blobs-go-quickstart/blob/master/storage-quickstart.go
	
	accountName, accountKey := secrets.StorageAcctName, secrets.StorageAcctKey

	credential, err := azblob.NewSharedKeyCredential(accountName, accountKey)

	_logger.Err(err)

	blobPipeline := azblob.NewPipeline(credential, azblob.PipelineOptions{})

	URL, _ := url.Parse(
		fmt.Sprintf("https://%s.blob.core.windows.net/%s", accountName, ContainerName))

	_container = azblob.NewContainerURL(*URL, blobPipeline)
}

func (bs BlobStorage) DeleteBlob(blobName string) (bool) {

	blockBlob := _container.NewBlockBlobURL(blobName)

	ctx := context.Background() // This example uses a never-expiring context
	
	blockBlob.Delete(ctx, azblob.DeleteSnapshotsOptionNone, azblob.BlobAccessConditions{})

	return true
}