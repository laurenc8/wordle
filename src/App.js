import './App.css';
import GridLayout from './components/GridLayout';
import { useState } from 'react';
import $ from 'jquery'

function App() {
  const [guessNum, setGuessNum] = useState(0)
  const [resp, setResp] = useState('')
  const [guess0, setGuess0] = useState('');
  const [guess1, setGuess1] = useState('');
  const [guess2, setGuess2] = useState('');
  const [guess3, setGuess3] = useState('');
  const [guess4, setGuess4] = useState('');
  const [guess5, setGuess5] = useState('');

  function handler({target: {value}}) {
    if (value.length <= 6 && (/^[a-zA-Z]*$/.test(value))) {
      const currentSetter = guessNum === 0 ? setGuess0 : (guessNum === 1 ? setGuess1 : (guessNum === 2 ? setGuess2 : (guessNum === 3 ? setGuess3 : (guessNum === 4 ? setGuess4 : setGuess5))))
      currentSetter(value.toUpperCase())
    }
  }

  function handleKeyDown(event) {
    const currentGuess = (guessNum === 0 ? guess0 : (guessNum === 1 ? guess1 : (guessNum === 2 ? guess2 : (guessNum === 3 ? guess3 : (guessNum === 4 ? guess4 : guess5)))))
    if (event.key === 'Enter' && currentGuess.length === 6) {
      // setGuessNum(guessNum + 1)
      let goalWord = "asdfgh"
      let result = getResult(goalWord, currentGuess)
    }
  }
  
  function autoPlay() {
    setGuess0("")
    setGuess1("")
    setGuess2("")
    setGuess3("")
    setGuess4("")
    setGuess5("")
    fetch('http://127.0.0.1:5000/random',
      {
        method: 'GET',
        mode: 'cors'
      }
    ).then(function (response)  {
      return response.json();
    }).then(function (text) {
      console.log(text.word)
      return text.word
    }).then(function (goalWord) {
      fetch('http://127.0.0.1:5000/test',
        {
          method: 'GET',
          mode: 'cors'
        }
      ).then(function (response)  {
        return response.json();
      }).then(function (text) {
        console.log(text.guess)
        setGuess0(text.guess.toUpperCase())
        return text.guess
      }).then(function (guess) {
        getWordFromPython(goalWord, guess, 1)
      });
    })
  }

  function getWordFromPython(goalWord, guess, depth) {
    if(depth < 6 && guess !== goalWord) {
      let result = getResult(goalWord, guess)
      console.log(result)
      $.post('http://127.0.0.1:5000/test', {
        result: result
      }).then(function (nextGuess) {
        console.log(depth)
        console.log(nextGuess)
        const currentSetter = depth === 0 ? setGuess0 : (depth === 1 ? setGuess1 : (depth === 2 ? setGuess2 : (depth === 3 ? setGuess3 : (depth === 4 ? setGuess4 : setGuess5))))
        currentSetter(nextGuess.toUpperCase())
        return nextGuess
      }).then(function (nextGuess) {
        getWordFromPython(goalWord, nextGuess, depth + 1)
      });
    }
    else if(guess === goalWord) {
      console.log("yay")
    }
    else {
      console.log("trash")
    }
  }

  function getResult(goalWord, guess) {
    let matched = new Set()
    let result = ""
    for(let j = 0; j < 6; j++){
      if(guess.charAt(j) === goalWord.charAt(j)){
        result += "g"
        matched.add(j)
      }
      else {
        let yellow = false
        for(let l = 0; l < 6; l++){
          if(goalWord.charAt(l) === guess.charAt(j) && !matched.has(l) && goalWord.charAt(l) !== guess.charAt(l)){
            yellow = true
            matched.add(l)
            break
          }
        }
        result += yellow ? "y" : "r"
      }
    }
    return result
  }

  return (
    <div className="App">
      <header className="App-header" style={{paddingTop: '10px'}}>
        Wordle
      </header>
      <input
        placeholder="Enter guess here!"
        type="text"
        value={guessNum === 0 ? guess0 : (guessNum === 1 ? guess1 : (guessNum === 2 ? guess2 : (guessNum === 3 ? guess3 : (guessNum === 4 ? guess4 : guess5))))}
        onChange={handler}
        onKeyDown={handleKeyDown}
        style={{margin: '20px'}}
      />
      <button
        type="button"
        onClick={autoPlay}
      > Let Python Play
      </button>
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
        <GridLayout guesses = {[guess0, guess1, guess2, guess3, guess4, guess5]}/>
      </div>
    </div>
  );
}

export default App;
