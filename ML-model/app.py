from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel
from transformers import DistilBertTokenizer, DistilBertForSequenceClassification
import torch
import logging

app = FastAPI()

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TextInput(BaseModel):
    text: str

# Load tokenizer and model
model_path = "shivamkumaramehta/Search-Shield"  # Replace with your model path
token = "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"  # Replace with your Hugging Face token

tokenizer = DistilBertTokenizer.from_pretrained(model_path)
model = DistilBertForSequenceClassification.from_pretrained(model_path, revision="main", token=token)

# Function to predict profanity
def predict_profanity(text):
    inputs = tokenizer(text, truncation=True, padding=True, max_length=512, return_tensors="pt")
    with torch.no_grad():
        model.to("cpu")  # Move model to CPU
        outputs = model(**inputs)
    logits = outputs.logits
    predicted_class = logits.argmax().item()
    return predicted_class

# Home endpoint
@app.get("/")
async def home():
    return {"message": "Welcome to the SearchShield Profanity Detection API!"}

# Endpoint to predict profanity
@app.post("/predict-profanity/")
async def predict_profanity_endpoint(input: TextInput, request: Request):
    try:
        logging.info(f"Received request: {await request.json()}")
        predicted_class = predict_profanity(input.text)
        logging.info(f"Predicted class: {predicted_class}")
        return {"predicted_class": predicted_class}
    except Exception as e:
        logging.error(f"Error processing request: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    app.run()
