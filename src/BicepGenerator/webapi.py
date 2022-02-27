from flask import Flask, request


app = Flask(__name__)

@app.route('/api/bicepgen', methods=['POST'])
def bicep_gen():
    
    if request.method == 'POST':
        return 'POST received!'

def run_apis():
    app.run(debug=True)
    
    
            

    