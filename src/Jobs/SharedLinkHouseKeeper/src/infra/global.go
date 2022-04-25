package infra

var (
	Secrets Secret
	Logger  StrucLogger
	Blob    BlobStorage
)

func InitD() {
	secretstore := SecretStore{}
	Secrets = secretstore.Init()

	Logger = StrucLogger{}
	Logger.Init()

	Blob = BlobStorage{}
	Blob.Init()
}