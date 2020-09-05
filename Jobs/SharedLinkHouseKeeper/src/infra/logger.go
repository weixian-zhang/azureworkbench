package infra

import (
	"fmt"
	"time"

	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
)

var (
	zaplog   *zap.Logger
	Struclog = &StrucLogger{}
)

type Loggerer interface {
	Info(msg string)
	Err(err error)
}

type StrucLogger struct {
}

const LogSLHousekeeperCllection string = "Log-SLHousekeeper"

type Log struct {
	Message       string    `bson:"Message,omitempty"`
	DateTimeSaved time.Time `bson:"DateTimeSaved,omitempty"`
}

func (sl StrucLogger) Info(msg string, a ...string) {
	var log string

	if a != nil {
		log = fmt.Sprintf(msg, a)
	} else {
		log = msg
	}
	
	zaplog.Info(log, zap.String("app", "qs"))

	// mng := MongoDb{}

	// mng.InsertOne(LogSLHousekeeperCllection, Log{
	// 	Message:       log,
	// 	DateTimeSaved: time.Now(),
	// })
}

func (sl StrucLogger) Err(err error) {
	if err != nil {
		zaplog.Error(err.Error(), zap.String("app", "qs"))

		mng := MongoDb{}

		mng.InsertOne(LogSLHousekeeperCllection, Log{
			Message:       err.Error(),
			DateTimeSaved: time.Now(),
		})
	}
}

func (sl StrucLogger) Init() {

	loggerConfig := zap.NewProductionConfig()
	loggerConfig.OutputPaths = []string{"stdout", "stderr"}
	loggerConfig.EncoderConfig.TimeKey = "timestamp"
	loggerConfig.EncoderConfig.EncodeTime = zapcore.ISO8601TimeEncoder
	loggerConfig.EncoderConfig.EncodeCaller = zapcore.ShortCallerEncoder
	logger, _ := loggerConfig.Build()

	zaplog = logger

}
