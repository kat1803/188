#!/usr/bin/env python3
"""
Documentation

See also https://www.python-boilerplate.com/flask
"""
import os
import argparse
from flask import Flask, jsonify, request
from flask_cors import CORS

import model

def create_app(config=None):
	app = Flask(__name__)

	# See http://flask.pocoo.org/docs/latest/config/
	app.config.update(dict(DEBUG=True))
	app.config.update(config or {})

	# Setup cors headers to allow all domains
	# https://flask-cors.readthedocs.io/en/latest/
	CORS(app)

	# Definition of the routes. Put them into their own file. See also
	# Flask Blueprints: http://flask.pocoo.org/docs/latest/blueprints
	@app.route("/")
	def home():
		return "Wellcome to API"

	@app.route("/predict/")
	def predict():
		return jsonify({"result": model.predict(request.args), "error": None})

	return app


if __name__ == "__main__":
	parser = argparse.ArgumentParser()
	parser.add_argument("-p", "--port", action="store", default="8000")

	args = parser.parse_args()
	port = int(args.port)
	app = create_app()
	app.run(host="0.0.0.0", port=port)
