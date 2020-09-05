package infra

import (
	"io/ioutil"
	"os"
	"strconv"

	"gopkg.in/yaml.v2"
)

type SecretStorer interface {
	Init() (Secret)
}

type Secret struct {
	MongoConnString string `yaml:"mongoconnstring"`
	SharedLinkRetentionDays int `yaml:"sharedlinkedretentiondays"`
	JobRunFrequencyMins int `yaml:"jobRunFrequencyMins"`
	StorageAcctName string `yaml:"storageAcctName"`
	StorageAcctKey string `yaml:"storageAcctKey"`
}

type SecretStore struct {
}

func (ss *SecretStore) Init() (Secret) {

	if env := os.Getenv("env"); env != "dev" {
		return GetEnvSecret()
	} else {
		return GetLocalSecret()
	}
}

func GetLocalSecret() (Secret) {
	secretFilePath := "../secret.env"

	yamlcon, err := ioutil.ReadFile(secretFilePath)
	if err != nil {
		Logger.Err(err)
	}

	secret := Secret{}

	merr := yaml.Unmarshal([]byte(yamlcon), &secret)

	if merr != nil {
		Logger.Err(merr)
	}

	return secret;
}

func GetEnvSecret() (Secret) {

	connstring := os.Getenv("mongoconnstring")
	retDays, _ := strconv.ParseInt(os.Getenv("sharedlinkedretentiondays"),10, 32)
	freq, _ := strconv.ParseInt(os.Getenv("jobRunFrequencyMins"),10, 32)
	strgacct := os.Getenv("storageAcctName")
	strgacctkey := os.Getenv("storageAcctKey")

	return Secret{
		MongoConnString: connstring,
		SharedLinkRetentionDays: int(retDays),
		JobRunFrequencyMins: int(freq),
		StorageAcctName: strgacct,
		StorageAcctKey: strgacctkey,
	}	
}