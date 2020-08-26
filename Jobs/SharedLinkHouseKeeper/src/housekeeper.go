package main

import (
	"azwb.com/jobs/slhk/infra"
)

func main() {
	secretstore := infra.SecretStore{}
	_secrets := secretstore.Init()

	housekeep(_secrets)
}

func housekeep(secrets infra.Secret) {
	for {
		
	}
}
