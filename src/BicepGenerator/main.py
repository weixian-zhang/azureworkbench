from dotenv import load_dotenv
import webapi

load_dotenv()

def run():
    webapi.run_apis()

if __name__ == '__main__':
    run()

# TODO:
    # mq module
        # receive bicep-gen command
        # send bicep-gen-event
    
    # bicep generate
        # jinja2 template
        # each resource a new template
        # see how to merge template
