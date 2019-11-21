from flask import jsonify
import model0
import cmpe188

def predict(input):
	data = {
		"goal": int(input.get("goal")),
		"name": input.get("name"),
		"blurb": input.get("goal"),
		"Length_of_kick": int(input.get("Length_of_kick"))
	}
	print ("data", data)
	preProcessingData = cmpe188.preProcessing(data)
	return {"data": input, "prediction": cmpe188.predict(preProcessingData)}