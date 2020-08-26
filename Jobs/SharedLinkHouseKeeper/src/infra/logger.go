package infra


import (
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
)

var zaplog *zap.Logger
var Struclog = &StrucLogger{}

type Loggerer interface {
	Info(msg string)
	Err(err error)
}

type StrucLogger struct {
}

func (sl *StrucLogger) Info(msg string) {
	zaplog.Info(msg, zap.String("app","qs"))
}

func (sl *StrucLogger) Err(err error) {
	if err != nil {
		zaplog.Error(err.Error(), zap.String("app","qs"))
	}
}

func Init() (*StrucLogger) {

	loggerConfig := zap.NewProductionConfig()

	loggerConfig.EncoderConfig.TimeKey = "timestamp"
	loggerConfig.EncoderConfig.EncodeTime = zapcore.ISO8601TimeEncoder
	loggerConfig.EncoderConfig.EncodeCaller = zapcore.ShortCallerEncoder
	logger, err := loggerConfig.Build()

	if err != nil {
		//TODO
	}

	zaplog = logger
	
	return Struclog
}