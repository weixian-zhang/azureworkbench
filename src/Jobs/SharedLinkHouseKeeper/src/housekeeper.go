package main

import (
	"encoding/json"
	"sync"
	"time"
	"context"
	"azwb.com/jobs/slhk/infra"
)

func main() {

	infra.InitD()

	mongo := infra.MongoDb{}
	blob := infra.BlobStorage{}
	blob.Init()

	wg := sync.WaitGroup{}
	wg.Add(1)


	// s, _ := json.Marshal(infra.Secrets)
	// infra.Logger.Info(string(s))

	ticker := time.NewTicker(time.Duration(infra.Secrets.JobRunFrequencyMins) * time.Minute)

	go runScheduler(ticker, mongo, blob)

	wg.Wait()
}

func runScheduler(tick *time.Ticker, mongo infra.MongoDb, blob infra.BlobStorage) {

	for t := range tick.C {
		_ = t

		infra.Logger.Info("job started")

		housekeep(mongo, blob)

		infra.Logger.Info("job completed")

	}

}

func housekeep(mongo infra.MongoDb, blob infra.BlobStorage) {
	expiredDiagrams := mongo.GetExpiredSharedDiagrams()

	for _, v := range expiredDiagrams {

		_, err := mongo.DeleteOneSharedDiagram(v.UID)

		if err == nil {
			blob.DeleteBlob(v.UID)
		}
	}
}
