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
        print(request.get_json())  # parse as JSON
        return 'Sucesss', 200

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
    bad = set()
    yellow = set()
    for i in range(len(result)):
        if result[i] == 'r':
            bad.add(prev_word[i])
        elif result[i] == 'y':
            yellow.add(prev_word[i])
    for word in words_copy:
        if fail(word, prev_word, result, bad, yellow):
            words.remove(word)


def fail(word, prev_word, result, bad, yellow):
    new_yellow = set()
    for i in range(len(word)):
        if word[i] in bad:
            return True
        if word[i] == prev_word[i] and result[i] == 'y':
            return True
        if result[i] != 'g' and word[i] in yellow:
            new_yellow.add(word[i])
        if word[i] != prev_word[i] and result[i] == 'g':
            return True
    return len(yellow) != len(new_yellow)


def next_word(words):
    return words[0]


if __name__ == "__main__":
    app.run()
    # word_len = int(input("Length of word: "))
    # words = setup(word_len)
    # for guess in range(6):
    #     guess = next_word(words)
    #     print(guess)
    #     result = input("Result? Green = G, Yellow = Y, Gray = R")
    #     filter_words(words, guess, result)

    # print(filter_words(setup(5), "raise", "rgryg"))