import numpy as np
from keras.models import load_model
import sys
import json
import os
import cv2

imagePath = os.getcwd() + "/uploads/dog.jpg"

img = cv2.imread(imagePath)
img = cv2.resize(img, (50, 50))
img = img / 255.0
img = img.reshape(1, 50, 50, 3)
filePath = os.getcwd() + "/pyScript/model.h5"
print(filePath)
model = load_model(filePath)

predict = model.predict(img)

data = { "predict": predict.tolist() }

print(json.dumps(data))
sys.stdout.flush()
