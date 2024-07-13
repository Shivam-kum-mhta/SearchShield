from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from transformers import DistilBertTokenizer, DistilBertForSequenceClassification
import torch


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
model_path = "shivamkumaramehta/SearchShield2.O"  # Replace with your model path
token = "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"  # Replace with your Hugging Face token

tokenizer = DistilBertTokenizer.from_pretrained(model_path)
model = DistilBertForSequenceClassification.from_pretrained(model_path, revision="main", token=token)

# Function to predict profanity
def predict_profanity(text):
    print(text)
    inputs = tokenizer(text, truncation=True, padding=True, max_length=512, return_tensors="pt")
    with torch.no_grad():
        outputs = model(**inputs)
    logits = outputs.logits
    predicted_class = logits.argmax().item()
    return predicted_class

# Endpoint to predict profanity
@app.post("/predict-profanity/")
async def predict_profanity_endpoint(input: TextInput):
    try:
        predicted_class = predict_profanity(input.text)
        return {"predicted_class": predicted_class}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
