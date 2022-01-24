import './App.css';
import GridLayout from './components/GridLayout';
import { useState } from 'react';

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
      setGuessNum(guessNum + 1)
      $.post('http://127.0.0.1:5000/test', {
        result: "rgygrg"
      }).then(function (response) {
        console.log(response)
      });
      fetch('http://127.0.0.1:5000/test',
        {
          method: 'GET',
          mode: 'cors'
        }
      )
        .then(function (response)  {
          return response.json();
        })
        .then(function (text) {
          console.log(text.greeting)
          setResp(text.greeting)
        });
    }
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
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
        <GridLayout guesses = {[guess0, guess1, guess2, guess3, guess4, guess5]}/>
      </div>
    </div>
  );
}

export default App;
