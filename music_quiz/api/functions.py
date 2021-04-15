import json

tmp_questions = [
    {
        "type": "field",
        "text": "What is the name of the song and the name of the artist?",
        "spotify_token": "xxx",
        "body": [
            {
                "text": "Song Name",
                "answer": "Baby",
                "score": 1
            },
            {
                "text": "Artist Name",
                "answer": "Justin Bieber",
                "score": 1
            }
        ]
    },
    {
        "type": "4choice",
        "text": "Which year was the song released?",
        "spotify_token": "xxx",
        "body": {
            "score": 1,
            "choices": ["1981", "1920", "1931", "1925"],
            "answer": "1920"
        }
    },
    {
        "type": "field",
        "text": "What is the name of the song and the name of the artist?",
        "spotify_token": "xxx",
        "body": [
            {
                "text": "Song Name",
                "answer": "What Is Love?",
                "score": 1
            },
            {
                "text": "Artist Name",
                "answer": "Haddaway",
                "score": 1
            }
        ]
    },
    {
        "type": "field",
        "text": "What is the name of the song and the name of the artist?",
        "spotify_token": "xxx",
        "body": [
            {
                "text": "Song Name",
                "answer": "Africa",
                "score": 1
            },
            {
                "text": "Artist Name",
                "answer": "Toto",
                "score": 1
            }
        ]
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
    return tmp_questions


# Checks if answers are correct.
# Returns the awarded score first and then which questions were correct as a boolean list.
def validate_answer(question, answers):
    score = 0
    result = []

    # Questions of type "field"
    if question["type"] == "field":
        for i in range(0, len(question["body"])):
            correct = question["body"][i]["answer"]
            q_score = question["body"][i]["score"]
            if len(answers) > i:
                answer = answers[i]
                if correct.lower() == answer.lower():
                    score += q_score
                    result.append(True)
                else:
                    result.append(False)
            else:
                result.append(False)

    return score, result
