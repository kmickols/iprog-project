import json

tmp_questions = [
    {
        "type": "field",
        "text": "What is the name of the song and the name of the artist?",
        "body": {
            "fields": 2,
            "0": {
                "text": "Song Name",
                "answer": "Baby"
            },
            "1": {
                "text": "Artist Name",
                "answer": "Justin Bieber"
            }
        }
    }
]

def list_to_json(lst):
    return json.dumps(lst)


def json_to_list(jsn):
    return json.loads(jsn)


# Returns a list of generated questions based on the passed playlist.
# Each question will be of the form
# {
#   "type": *"field" or "multiple"*
#   "text: *Question text*
#   "body": *Different depending on type*
#   "answer": *The answer as a string"
# }
# For "field" type the body will contain the number of fields and their labels and the answers
# For "multiple" type the body will contain the different choices and the correct choice
# Answers will be evaluated depending on type.
def generate_questions(playlist):
    return []
