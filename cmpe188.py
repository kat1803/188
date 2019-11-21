import numpy as np
import pandas as pd
import nltk
import csv
from nltk.tokenize import word_tokenize
from nltk import pos_tag
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from sklearn.preprocessing import LabelEncoder
from collections import defaultdict
from nltk.corpus import wordnet as wn
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn import model_selection, naive_bayes, svm
from sklearn.metrics import accuracy_score
from sklearn.metrics import confusion_matrix
from sklearn import metrics
from sklearn.model_selection import train_test_split
from scipy import sparse

from sklearn import model_selection
from sklearn.linear_model import LogisticRegression
import joblib

def preProcessing(data):
	# 1
	# data is dictionary
	row = [data]
	df = pd.DataFrame(row) 
	# df = pd.read_csv('./modified_v2.csv')

	# 2
	df['blurb'] = [str(entry).lower() for entry in df['blurb']]
	df['blurb'] = [word_tokenize(entry) for entry in df['blurb']]
	# with open('./mapkickstarter/MasterKickstarter.csv','r') as csv_file:
	#     csv_reader = csv.reader(csv_file,delimiter=',')
	#     next(csv_reader)
	#     with open('output.csv','a') as out:
	#         csv_writer = csv.writer(out,lineterminator='\n')
	#         csv_writer.writerow('final_text')
	#         for lines in csv_reader:
	#             csv_writer.writerow(['test','test'])

	# WordNetLemmatizer requires Pos tags to understand if the word is 
	# noun or verb or adjective etc. By default it is set to Noun
	# source: https://medium.com/@bedigunjit/simple-guide-to-text-classification-nlp-using-svm-and-naive-bayes-with-python-421db3a72d34
	tag_map = defaultdict(lambda : wn.NOUN)
	tag_map['J'] = wn.ADJ
	tag_map['V'] = wn.VERB
	tag_map['R'] = wn.ADV
	# with open('./mapkickstarter/modified.csv','r') as csv_file:
	#     csv_reader = csv.reader(csv_file,delimiter=',')
	#     next(csv_reader)
	#     with open('output.csv','a') as out:
	#         header = []
	#         csv_writer = csv.writer(out,lineterminator='\n')
	#         header.append('final_text')
	#         csv_writer.writerow(header)
	#         for lines in csv_reader:
	#             Final_words = []
	#             word_Lemmatized = WordNetLemmatizer()
	#             for word, tag in pos_tag(lines[7]):
	#                 if word not in stopwords.words('english') and word.isalpha():
	#                     word_Final = word_Lemmatized.lemmatize(word,tag_map[tag[0]])
	#                     Final_words.append(word_Final)
	#             csv_writer.writerow(Final_words)

	for index,entry in enumerate(df['blurb']):
	    # Declaring Empty List to store the words that follow the rules for this step
	    Final_words = []
	    # Initializing WordNetLemmatizer()
	    word_Lemmatized = WordNetLemmatizer()
	    # pos_tag function below will provide the 'tag' i.e if the word is Noun(N) or Verb(V) or something else.
	    for word, tag in pos_tag(entry):
	        # Below condition is to check for Stop words and consider only alphabets
	        if word not in stopwords.words('english') and word.isalpha():
	            word_Final = word_Lemmatized.lemmatize(word,tag_map[tag[0]])
	            Final_words.append(word_Final)
	    # The final processed set of words for each iteration will be stored in 'text_final'
	    df.loc[index,'word_token'] = str(Final_words)
	    print('progress: ',index)
	# tfidf_vect = TfidfVectorizer(max_features = 5000)
	# tfidf_vect.fit(df['word_token'])
	# x_tfidf = tfidf_vect.transform(df['word_token'])
	df['word_token'] = df['word_token'].astype(str)
	# df['word_token'] = df['word_token'].astype(str)

	# 3
	df2 = df[['goal','Length_of_kick']]

	# 4
	# tfidf_vect = TfidfVectorizer(max_features = 5000)
	# tfidf_vect.fit(df['word_token'])
	# save vector
	filename = 'vector'
	tfidf_vect = joblib.load(filename)
	# print (input)
	x_tfidf = tfidf_vect.transform(df['word_token'])

	# 5
	df3 = pd.DataFrame(x_tfidf)

	# 6
	df4 = pd.concat([df2,df3],axis=1)

	# 7
	x_1 = df4[['goal']].values
	x_2 = df4[['Length_of_kick']].values
	# y = df4[['status']].values

	# 8
	training_data = sparse.hstack((x_tfidf,x_1,x_2))

	# 9
	training_data.data = np.nan_to_num(training_data.data)

	# 10
	training_data.eliminate_zeros()
	# print(training_data.data.shape)

	return training_data

	# OLD 

	# # 2


	# # 3
	

	# # 4
	# df['blurb'] = [str(entry).lower() for entry in df['blurb']]
	# df['blurb'] = [word_tokenize(entry) for entry in df['blurb']]
	# # with open('./mapkickstarter/MasterKickstarter.csv','r') as csv_file:
	# #     csv_reader = csv.reader(csv_file,delimiter=',')
	# #     next(csv_reader)
	# #     with open('output.csv','a') as out:
	# #         csv_writer = csv.writer(out,lineterminator='\n')
	# #         csv_writer.writerow('final_text')
	# #         for lines in csv_reader:
	# #             csv_writer.writerow(['test','test'])

	# # WordNetLemmatizer requires Pos tags to understand if the word is 
	# # noun or verb or adjective etc. By default it is set to Noun
	# # source: https://medium.com/@bedigunjit/simple-guide-to-text-classification-nlp-using-svm-and-naive-bayes-with-python-421db3a72d34
	# tag_map = defaultdict(lambda : wn.NOUN)
	# tag_map['J'] = wn.ADJ
	# tag_map['V'] = wn.VERB
	# tag_map['R'] = wn.ADV
	# # with open('./mapkickstarter/modified.csv','r') as csv_file:
	# #     csv_reader = csv.reader(csv_file,delimiter=',')
	# #     next(csv_reader)
	# #     with open('output.csv','a') as out:
	# #         header = []
	# #         csv_writer = csv.writer(out,lineterminator='\n')
	# #         header.append('final_text')
	# #         csv_writer.writerow(header)
	# #         for lines in csv_reader:
	# #             Final_words = []
	# #             word_Lemmatized = WordNetLemmatizer()
	# #             for word, tag in pos_tag(lines[7]):
	# #                 if word not in stopwords.words('english') and word.isalpha():
	# #                     word_Final = word_Lemmatized.lemmatize(word,tag_map[tag[0]])
	# #                     Final_words.append(word_Final)
	# #             csv_writer.writerow(Final_words)

	# for index,entry in enumerate(df['blurb']):
	#     # Declaring Empty List to store the words that follow the rules for this step
	#     Final_words = []
	#     # Initializing WordNetLemmatizer()
	#     word_Lemmatized = WordNetLemmatizer()
	#     # pos_tag function below will provide the 'tag' i.e if the word is Noun(N) or Verb(V) or something else.
	#     for word, tag in pos_tag(entry):
	#         # Below condition is to check for Stop words and consider only alphabets
	#         if word not in stopwords.words('english') and word.isalpha():
	#             word_Final = word_Lemmatized.lemmatize(word,tag_map[tag[0]])
	#             Final_words.append(word_Final)
	#     # The final processed set of words for each iteration will be stored in 'text_final'
	#     df.loc[index,'word_token'] = str(Final_words)
	    # print('progress: ',index)
	# # tfidf_vect = TfidfVectorizer(max_features = 5000)
	# # tfidf_vect.fit(df['word_token'])
	# # x_tfidf = tfidf_vect.transform(df['word_token'])
	# df['word_token'] = df['word_token'].astype(str)
	# df2 = df[['goal','Length_of_kick']]

	# tfidf_vect = TfidfVectorizer(max_features = 5000)
	# tfidf_vect.fit(df['word_token'])
	# x_tfidf = tfidf_vect.transform(df['word_token'])
	# # 5
	# df3 = pd.DataFrame(x_tfidf)
	print(df3.describe())

	# # 6
	# df4 = pd.concat([df2,df3],axis=1)

	# # 7
	# x_1 = df4[['goal']].values
	# x_2 = df4[['Length_of_kick']].values

	# # # 8
	# training_data = sparse.hstack((x_tfidf,x_1,x_2))
	# # # training_data = sparse.hstack((x_1,x_2))

	# # # 9
	# # training_data.data = np.nan_to_num(training_data.data)

	# # # 10
	# # training_data.eliminate_zeros()
	print(df4.describe())

	# # return pd.DataFrame(df4).to_numpy()
	# return training_data

def train():
	# 1
	df = pd.read_csv('./modified_v2.csv')

	# 2
	df['word_token'] = df['word_token'].astype(str)

	# 3
	df2 = df[['goal','Length_of_kick','status']]

	# 4
	tfidf_vect = TfidfVectorizer(max_features = 5000)
	tfidf_vect.fit(df['word_token'])
		# save vector
	filename = 'vector'
	joblib.dump(tfidf_vect, filename)
	x_tfidf = tfidf_vect.transform(df['word_token'])

	# 5
	df3 = pd.DataFrame(x_tfidf)

	# 6
	df4 = pd.concat([df2,df3],axis=1)

	# 7
	x_1 = df4[['goal']].values
	x_2 = df4[['Length_of_kick']].values
	y = df4[['status']].values

	# 8
	training_data = sparse.hstack((x_tfidf,x_1,x_2))

	# 9
	training_data.data = np.nan_to_num(training_data.data)

	# 10
	training_data.eliminate_zeros()

	# 11
	x_train, x_test, y_train, y_test = train_test_split(training_data,y,test_size =0.2)

	# neural network
	from sklearn.neural_network import MLPClassifier
	mlp = MLPClassifier(hidden_layer_sizes=(100),activation='logistic')
	mlp.fit(x_train,y_train)

	# save model
	filename = 'model.sav'
	joblib.dump(mlp, filename)

	# load the model
	loaded_model = joblib.load(filename)
	result = loaded_model.score(x_test, y_test)
	# print(result)

	predicted = mlp.predict_proba(x_test)
	# print(predicted)

	# print(tfidf_vect.vocabulary_)

def predict(input):
	# load the model
	# New updated model
	filename = 'mlp_model.sav'
	# Old model
	# filename = 'model.sav'
	loaded_model = joblib.load(filename)
	predicted = loaded_model.predict_proba(input)
	return predicted

# train()
# nltk.download('punkt')
# nltk.download('wordnet')
# nltk.download('averaged_perceptron_tagger')
# nltk.download('stopwords')

# data = {
# 	"goal": 5000,
# 	"Length_of_kick": 40,
# 	"blurb": "E-motive Australia Homemade Rustic Picture Boards Music",
# }
# processedData = preProcessing(data)
# res = predict(processedData)

# print("res", res)
