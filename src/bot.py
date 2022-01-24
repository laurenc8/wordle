import random
from flask import Flask, render_template, make_response
from flask import redirect, request, jsonify, url_for
app = Flask(__name__)

# @app.route('/postmethod', methods = ['POST'])
# def post_javascript_data():
#     jsdata = request.form['word']
#     return jsdata + " hi"

@app.route('/test', methods=['GET', 'POST'])
def testfn():
    # GET request
    if request.method == 'GET':
        message = {'greeting':'Hello from Flask!'}
        return jsonify(message)  # serialize and use JSON headers
    # POST request
    if request.method == 'POST':
        print(request.form['result'])  # parse as JSON
        filter_words(words, word, request.form['result'])
        return next_word(words), 200
        #return "hello", 200

def setup(word_len):
    words = set()
    with open("words_all.txt") as file:
        while True:
            line = file.readline().strip()
            if not line:
                break
            if len(line) == word_len:
                words.add(line)
    return words


def filter_words(words, prev_word, result):
    words_copy = words.copy()
    restrictions = {}
    for i in range(len(result)):
        letter = prev_word[i]
        if letter not in restrictions:
            restrictions[letter] = {}
            restrictions[letter]['good'] = set()
            restrictions[letter]['bad'] = set()
            restrictions[letter]['freq'] = 0
            restrictions[letter]['freqKnown'] = False
        if result[i] == 'g':
            restrictions[letter]['good'].add(i)
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
        if i in restrictions:
            if i in restrictions[letter]['bad']:
                return True
            if letter not in frequencies:
                frequencies[letter] = 1
            else:
                frequencies[letter] += 1
            if frequencies[letter] > restrictions[letter]['freq'] and restrictions['freqKnown']:
                return True
        for letter in frequencies:
            if frequencies[letter] < restrictions[letter]['freq']:
                return True
    return False


def next_word(words):
    return random.sample(words,1)[0]


if __name__ == "__main__":
    words = setup(6)
    word = "praise"
    app.run()
    # word_len = int(input("Length of word: "))
    # words = setup(word_len)
    # for guess in range(6):
    #     guess = next_word(words)
    #     print(guess)
    #     result = input("Result? Green = G, Yellow = Y, Gray = R")
    #     filter_words(words, guess, result)

    # print(filter_words(setup(5), "raise", "rgryg"))