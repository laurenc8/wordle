import random
from flask import Flask, render_template, make_response
from flask import redirect, request, jsonify, url_for
app = Flask(__name__)

# @app.route('/postmethod', methods = ['POST'])
# def post_javascript_data():
#     jsdata = request.form['word']
#     return jsdata + " hi"

@app.route('/test', methods=['GET', 'POST'])
def send_next_word():
    if request.method == 'GET':
        message = {'guess': prev_words[-1]}
        return jsonify(message)
    if request.method == 'POST':
        filter_words(words, prev_words[-1], request.form['result'])
        print(words)
        print(request.form['result'])
        print(len(words))
        prev_words.append(next_word())
        return prev_words[-1], 200

@app.route('/random', methods=['GET'])
def generate_random_word():
    setup(6)
    prev_words.append('praise')
    message = {'word': next_word()}
    return jsonify(message)  # serialize and use JSON headers

def setup(word_len):
    with open("words_all.txt") as file:
        while True:
            line = file.readline().strip()
            if not line:
                break
            if len(line) == word_len:
                words.add(line)


def filter_words(words, prev_word, result):
    words_copy = words.copy()
    restrictions = {}
    for i in range(len(result)):
        letter = prev_word[i]
        if letter not in restrictions:
            restrictions[letter] = {}
            restrictions[letter]['bad'] = set()
            restrictions[letter]['freq'] = 0
            restrictions[letter]['freqKnown'] = False
        if result[i] == 'g':
            restrictions[letter]['freq'] += 1
        elif result[i] == 'y':
            restrictions[letter]['bad'].add(i)
            restrictions[letter]['freq'] += 1
        else:
            restrictions[letter]['bad'].add(i)
            restrictions[letter]['freqKnown'] = True
    for word in words_copy:
        if fail(word, prev_word, result, restrictions):
            words.remove(word)


def fail(word, prev_word, result, restrictions):
    frequencies = {}
    for i in range(len(word)):
        letter = word[i]
        if result[i] == 'g' and letter != prev_word[i]:
            return True
        if letter in restrictions:
            if i in restrictions[letter]['bad']:
                return True
            if letter not in frequencies:
                frequencies[letter] = 1
            else:
                frequencies[letter] += 1
            if frequencies[letter] > restrictions[letter]['freq'] and restrictions[letter]['freqKnown']:
                return True
    for letter in restrictions:
        if letter not in frequencies:
            frequencies[letter] = 0
        if frequencies[letter] < restrictions[letter]['freq']:
            return True
    return False


def next_word():
    return random.sample(words,1)[0]


if __name__ == "__main__":
    words = set()
    prev_words = []
    app.run()