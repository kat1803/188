from flask import jsonify
import model0

def predict(input):
	return {"data": input, "prediction": model0.predict(input)}