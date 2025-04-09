# LondonHouseProject

The goal was to build a London House Price prediction website. The model was built using sklearn and linear regression. Dataset was taken from kaggle.com. 

Used Python Flask server to work with HTTP requests.

HTML, CSS and JavaScript were used to build UI of a website were you pick parameters like the location, area (in sqm), number of bedrooms, number of bathrooms and number of living rooms and then Flask server is called to get the price.

First, I loaded dataset from kaggle. Then, I did a data cleaning (numpy and pandas), feature engineering, used gridsearchcv for hyperparameter tuning and k fold cross validation.

IDE: PyCharm, Jupyter Notebook, Visual Studio Code.

Nginx was used as it is a simple server.

Deployed to cloud (AWS EC2)

ec2-16-171-226-160.eu-north-1.compute.amazonaws.com
