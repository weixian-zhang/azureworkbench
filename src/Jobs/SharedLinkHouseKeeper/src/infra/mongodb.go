package infra

import (
	"context"

	"fmt"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

const dbName = "azworkbench"
const slCollection = "AnonyDiagram"
const logCollection = "Log-SLHouseKeeper"
const blobContainer = "shareddiagrams"

type MongoDb struct{}

type SharedLinkDiagram struct {
	UID           string    `bson:"UID,omitempty"`
	DiagramName   string    `bson:"DiagramName,omitempty"`
	DiagramXml    string    `bson:"DiagramXml,omitempty"`
	SharedLink    string    `bson:"SharedLink,omitempty"`
	DateTimeSaved time.Time `bson:"DateTimeSaved,omitempty"`
}

func connect() mongo.Client {

	ctx, _ := context.WithTimeout(context.Background(), time.Second*10)
	clientOptions := options.Client().ApplyURI(Secrets.MongoConnString).SetDirect(true)
	client, err := mongo.NewClient(clientOptions)

	if err != nil {
		Logger.Err(err)
	}

	cerr := client.Connect(ctx)

	if cerr != nil {
		Logger.Err(cerr)
	}

	return *client
}

func (mdb *MongoDb) InsertOne(collection string, bsonDoc interface{}) bool {
	client := connect()
	ctx := context.Background()
	defer client.Disconnect(ctx)

	coll := client.Database(dbName).Collection(collection)
	_, err := coll.InsertOne(context.Background(), bsonDoc)

	if err != nil {
		return false
	}

	return true
}

//DeleteOneSharedDiagram delete single sared link diagrams
func (mdb *MongoDb) DeleteOneSharedDiagram(sharedDiagramUID string) (*mongo.DeleteResult, error) {
	client := connect()
	ctx := context.Background()
	defer client.Disconnect(ctx)

	slColl := client.Database(dbName).Collection(slCollection)
	query := bson.M{"UID": sharedDiagramUID}
	return slColl.DeleteOne(context.Background(), query)
}

//GetExpiredSharedDiagrams gets "expired" shared link diagrams
func (mdb *MongoDb) GetExpiredSharedDiagrams() []SharedLinkDiagram {
	client := connect()
	ctx := context.Background()
	defer client.Disconnect(ctx)

	var retentionDays int = Secrets.SharedLinkRetentionDays
	retentionDays = -retentionDays
	dateBeforeRetention := time.Now().AddDate(0, 0, retentionDays)

	fmt.Println(dateBeforeRetention.Format(time.RFC3339))

	diagrams := []SharedLinkDiagram{}

	query := bson.M{"DateTimeSaved": bson.M{"$lt": dateBeforeRetention}}

	slColl := getSharedDiagCollection(&client)

	//https://stackoverflow.com/questions/51092006/querying-mongodb-date-between-date-range-using-golang-mgo?rq=1
	cursor, err := slColl.Find(ctx, query)

	if err = cursor.All(ctx, &diagrams); err != nil {
		Logger.Err(err)
	}

	for _, d := range diagrams {
		fmt.Println("id: %v, datetime: %v", d.UID, d.DateTimeSaved.Format(time.RFC3339))
	}

	return diagrams
}

func getSharedDiagCollection(client *mongo.Client) *mongo.Collection {
	return client.Database(dbName).Collection(slCollection)
}
