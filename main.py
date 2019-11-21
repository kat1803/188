#!/usr/bin/env python3
import os
import argparse
from flask import Flask, jsonify, request, render_template, send_from_directory

from flask_cors import CORS

import model

def create_app(config=None):
	# app = Flask(__name__)
	app = Flask(__name__, static_folder="front-end/build/static", template_folder="build")

	@app.route("/")
	def hello():
	    # return render_template('front-end/build/index.html')
	    return send_from_directory('front-end/build/', 'index.html')

	app.config.update(dict(DEBUG=True))
	app.config.update(config or {})

	CORS(app)

	@app.route("/predict/")
	def predict():
		print ("request.args", request.args)
		result = model.predict(request.args)
		print ("result", result)
		return jsonify({"result": result["prediction"][0][1], "error": None})

	return app


if __name__ == "__main__":
	parser = argparse.ArgumentParser()
	parser.add_argument("-p", "--port", action="store", default="8000")
	args = parser.parse_args()
	port = int(args.port)
	app = create_app()
	app.run(host="0.0.0.0", port=port)
