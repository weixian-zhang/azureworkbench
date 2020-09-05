package infra

import (
	"context"
	"fmt"
	"net/url"

	"github.com/Azure/azure-storage-blob-go/azblob"
)

type BlobStorage struct{}

const ContainerName string = "shareddiagrams"

var _container azblob.ContainerURL

func (bs *BlobStorage) Init() {

	//https://github.com/Azure-Samples/storage-blobs-go-quickstart/blob/master/storage-quickstart.go

	accountName, accountKey := Secrets.StorageAcctName, Secrets.StorageAcctKey

	credential, err := azblob.NewSharedKeyCredential(accountName, accountKey)

	Logger.Err(err)

	blobPipeline := azblob.NewPipeline(credential, azblob.PipelineOptions{})

	URL, _ := url.Parse(
		fmt.Sprintf("https://%s.blob.core.windows.net/%s", accountName, ContainerName))

	_container = azblob.NewContainerURL(*URL, blobPipeline)
}

//DeleteBlob deletes a single blob in "shareddiagrams"
func (bs BlobStorage) DeleteBlob(blobName string) bool {

	blockBlob := _container.NewBlockBlobURL(blobName)

	ctx := context.Background() // This example uses a never-expiring context

	_, err := blockBlob.Delete(ctx, azblob.DeleteSnapshotsOptionNone, azblob.BlobAccessConditions{})
	Logger.Err(err)

	return true
}
