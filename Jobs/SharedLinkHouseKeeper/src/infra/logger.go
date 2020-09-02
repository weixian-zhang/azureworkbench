package infra


import (
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
	"fmt"
)

var(
	zaplog *zap.Logger
	Struclog = &StrucLogger{}
)

type Loggerer interface {
	Info(msg string)
	Err(err error)
}

type StrucLogger struct {
}

type Log struct {
	Level string
	Message string
}

func (sl StrucLogger) Info(msg string, a ...string) {
	zaplog.Info(fmt.Sprintf(msg, a), zap.String("app","qs"))
}

func (sl StrucLogger) Err(err error) {
	if err != nil {
		zaplog.Error(err.Error(), zap.String("app","qs"))
	}
}

func (sl StrucLogger) Init() {

	loggerConfig := zap.NewProductionConfig()
	loggerConfig.OutputPaths = []string{"stdout","stderr"}
	loggerConfig.EncoderConfig.TimeKey = "timestamp"
	loggerConfig.EncoderConfig.EncodeTime = zapcore.ISO8601TimeEncoder
	loggerConfig.EncoderConfig.EncodeCaller = zapcore.ShortCallerEncoder
	logger, _ := loggerConfig.Build()

	zaplog = logger

}