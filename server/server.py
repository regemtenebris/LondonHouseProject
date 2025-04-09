from flask import Flask, request, jsonify
import util

app = Flask(__name__)

@app.route('/get_loc')

def get_loc():

    response = jsonify({
        'locations': util.get_loc()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/get_price', methods=['POST'])
def get_price():
    sqm = float(request.form['sqm'])
    loc = request.form['loc']
    bedrooms =  int(request.form['bedrooms'])
    bathrooms = int(request.form['bathrooms'])
    livingrooms = int(request.form['livingrooms'])

    response = jsonify({
        'price': util.get_price(loc, bathrooms, bedrooms, livingrooms, sqm)
    })

    return response

if __name__ == "__main__":
    util.load_arts()
    print("Starting Python Flask Server")
    app.run()