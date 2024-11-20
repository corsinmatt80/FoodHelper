from api.edenai import text_to_speech

class TextToSpeechService:
    def __init__(self):
        pass

    def get_audio_url(self, text):
        return text_to_speech(text)