import json
import pickle
import numpy as np

__locs = None
__cols = None
__model = None

def get_price(loc, bathrooms, bedrooms, livingrooms, sqm):
    try:
        loc_index = __cols.index(loc.lowercase())
    except:
        loc_index = -1

    x = np.zeros(len(__cols))
    x[0] = bathrooms
    x[1] = bedrooms
    x[2] = livingrooms
    x[3] = sqm
    if loc_index >= 0:
        x[loc_index] = 1
    return round(__model.predict([x])[0],2)

def get_loc():
    return __locs

def load_arts():
    print("loading artifacts...start")
    global __cols
    global __locs
    global __model

    with open("./artifacts/columns.json",'r') as f:
        __cols = json.load(f)['data_columns']
        __locs = __cols[5:]

    with open("./artifacts/london_home_prices_model.pickle", 'rb') as f:
        __model = pickle.load(f)
    print("loading artifacts...done")

if __name__ == '__main__':
    load_arts()
    print(get_loc())
    print(get_price('akerman road', '2', '2', '2', '84'))
    print(get_price('akerman road', '1', '1', '1', '84'))
    print(get_price('bbb', '2', '3', '4', '84'))
    print(get_price('ddd', '2', '3', '4', '84'))