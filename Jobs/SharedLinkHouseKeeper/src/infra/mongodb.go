 package infra


import (
	"context"
	"go.mongodb.org/mongo-driver/bson"
	//"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"time"
	"fmt"
)

const dbName = "azworkbench"
const slCollection = "AnonyDiagram"
const logCollection = "Log-SLHouseKeeper"
const blobContainer = "shareddiagrams"

var (
	client mongo.Client
	slColl *mongo.Collection
	logColl *mongo.Collection
)

type MongoDb struct {}

type SharedLinkDiagram struct {
	UID string 				`bson:"UID,omitempty"`
	DiagramName string 		`bson:"DiagramName,omitempty"`
	DiagramXml string 		`bson:"DiagramXml,omitempty"`
	SharedLink string 		`bson:"SharedLink,omitempty"`
	DateTimeSaved time.Time 	`bson:"DateTimeSaved,omitempty"`
}

func (mdb *MongoDb) New(secrets Secret, logger StrucLogger) {}

func connect() (*mongo.Client) {

	ctx, _ := context.WithTimeout(context.Background(), time.Second*10)
	clientOptions := options.Client().ApplyURI(_secrets.MongoConnString).SetDirect(true)
	client, err := mongo.NewClient(clientOptions)

	if err != nil {
		_logger.Err(err)
	}

	cerr := client.Connect(ctx)

	if cerr != nil {
		_logger.Err(cerr)
	}

	return client
}

func (mdb *MongoDb) InsertOne(string, interface{}) {
	// client := connect()
	// ctx := context.Background()
	// defer client.Disconnect(ctx)

	// db := client.Database(dbName)
}

func (mdb *MongoDb) GetExpiredSharedDiagrams() ([]SharedLinkDiagram) {
	client := connect()
	ctx := context.Background()
	defer client.Disconnect(ctx)

	slColl := client.Database(dbName).Collection(slCollection)

	var retentionDays int  = _secrets.SharedLinkRetentionDays
	retentionDays = -retentionDays
	dateBeforeRetention := time.Now().AddDate(0,0,retentionDays)

	fmt.Println(dateBeforeRetention.Format(time.RFC3339))

	var diagrams []SharedLinkDiagram

	query := bson.M{"DateTimeSaved": bson.M{"$lt": dateBeforeRetention}}
		
	//https://stackoverflow.com/questions/51092006/querying-mongodb-date-between-date-range-using-golang-mgo?rq=1
	cursor, err := slColl.Find(ctx, query)

	if err = cursor.All(ctx, &diagrams); err != nil {
		_logger.Err(err)
	}

	for _, d := range diagrams {
		fmt.Println("id: %v, datetime: %v", d.UID, d.DateTimeSaved.Format(time.RFC3339))
	}

	return diagrams
}