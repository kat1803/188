import pandas
from sklearn.linear_model import LogisticRegression
def train():
	# read datasets
	data = pandas.read_csv("MasterKickstarter.csv")

	data = data[
	    ((data.status == "successful") | (data.status == "failed")) & (data.goal > 0)
	]

	features = pandas.DataFrame()

	features["goal"] = data["goal"]

	results = data["status"].transform(lambda x: 1 if x == "successful" else 0)
	features["name_length"] = data["name"].transform(lambda x: len(x))
	features["description_length"] = data["blurb"].transform(lambda x: len(x))
	features["days"] = data["Length_of_kick"]


	# for val in data["Categories"].unique():
	#     features[val.replace("%20&%20", "&")] = data["Categories"].transform(lambda x: 1 if x == val else 0)

	transform = {}
	for feature in features.columns:
	    val = features[feature].max()
	    transform[feature] = val
	    features[feature] = features[feature].transform(
	        lambda x: x / val
	    )


	c = LogisticRegression().fit(features, results)

	print(f"Score is {c.score(features, results)}")
	return c


# print("var transform =", transform, ";")
# print("var coefficients =", {a: b for a, b in zip(features.columns, c.coef_[0])}, ";")
# print("var intercept =", c.intercept_[0], ";")


def preProcessing(input):
	features = [[int(input.get("goal")) , int(input.get("name")) , int(input.get("blurb")) , int(input.get("Length_of_kick"))]]
	return features

def predict(input):
	preparedInput = preProcessing(input)
	model = train()
	prediction = model.predict_proba(preparedInput)
	return prediction

