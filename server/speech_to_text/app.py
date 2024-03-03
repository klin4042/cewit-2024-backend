from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
from pydub import AudioSegment
from openai import OpenAI
import wave
import os
import mimetypes
from dotenv import load_dotenv
import speech_recognition as sr
recognizer = sr.Recognizer()
load_dotenv()
app = Flask(__name__)

CORS(app)

# Define routes and their respective functions
@app.route('/flask', methods=['GET'])
def index():
    data = {'message': 'Hello from Flask!'}
    return jsonify(data)

# You can define more routes here...
@app.route('/audio-parse', methods=['POST'])
def audio_parse():

    audio_blob = request.files['audio']
    audio_blob.seek(0)

    audio_path = 'audio.webm'


    with open(audio_path, 'wb') as file:
        file.write(audio_blob.read())

    text = "DUDE"

    client = OpenAI(api_key = os.environ.get('GPT_API_KEY')) 

    audio_file= open(audio_path, "rb")
    translation = client.audio.translations.create(
    model="whisper-1", 
    file=audio_file
    )
    print(translation.text)

    audio_file = "audio.wav"


    data = text
    return data

if __name__ == '__main__':
    app.run(debug=True)