#!/usr/bin/env python3
# Actual machine learning that used to train model
"""
Documentation

See also https://www.python-boilerplate.com/flask
"""
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


	# See http://flask.pocoo.org/docs/latest/config/
	app.config.update(dict(DEBUG=True))
	app.config.update(config or {})

	# Setup cors headers to allow all domains
	# https://flask-cors.readthedocs.io/en/latest/
	CORS(app)

	# # Definition of the routes. Put them into their own file. See also
	# # Flask Blueprints: http://flask.pocoo.org/docs/latest/blueprints
	# @app.route("/")
	# def home():
	# 	return "Wellcome to API"

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
