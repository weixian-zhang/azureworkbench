package main

import (
	"azwb.com/jobs/slhk/infra"
	"time"
	"sync"
	"fmt"
)

var (
	_logger infra.StrucLogger
	_secrets infra.Secret
	mdb infra.MongoDb
)

func main() {

	secretstore := infra.SecretStore{}
	_secrets = secretstore.Init()

	_logger = infra.StrucLogger{}
	_logger.Init()

	mdb.New(_secrets, _logger)

	wg := sync.WaitGroup{}
	wg.Add(1)

	ticker := time.NewTicker(time.Duration(_secrets.JobRunFrequencyMins) * time.Minute)

	go runScheduler(ticker, _secrets, _logger)

	wg.Wait()
}

func runScheduler(tick *time.Ticker, secrets infra.Secret, logger infra.StrucLogger) {
	
	for t := range tick.C {
		_  = t
		
		logger.Info("job started")

		housekeep(secrets, logger)
	
		logger.Info("job completed")

	}

}

func housekeep(secrets infra.Secret, logger infra.StrucLogger) {
	expiredDiagrams :=  mdb.GetExpiredSharedDiagrams()

	for _, v := range expiredDiagrams {
		fmt.Println(v)
	}
}
