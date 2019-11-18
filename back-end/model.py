from flask import jsonify

def predict(input):
	name = input.get('name')
	start_date = input.get('start_date')
	end_date = input.get('end_date')
	blurb = input.get('blurb')
	res = "Good"
	# return {"data": input}
	return {"data": input, "prediction": res}