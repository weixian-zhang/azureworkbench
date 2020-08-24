package secret

import (
	"gopkg.in/yaml.v2"
	"io/ioutil"
	"os"
	"main/logger"
	"strconv"
)

var _logger *logger.StrucLogger

type SecretStorer interface {
	Init() (Secret)
}

type Secret struct {
	MongoConnString string `mongoconnstring:"c"`
	SharedLinkRetentionDays int `yaml:sharedlinkedretentiondays`
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
		_logger.Err(err)
	}

	secret := Secret{}

	merr := yaml.Unmarshal([]byte(yamlcon), &secret)

	if merr != nil {
		_logger.Err(merr)
	}

	return secret;
}

func GetEnvSecret() (Secret) {

	connstring := os.Getenv("mongoconnstring")
	retDays, err := strconv.ParseInt(os.Getenv("sharedlinkedretentiondays"),10, 32)

	if err != nil {
		_logger.Err(err)
	}

	return Secret{
		MongoConnString: connstring,
		SharedLinkRetentionDays: int(retDays),
	}	
}