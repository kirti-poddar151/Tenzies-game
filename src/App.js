import './App.css';
import Die from './Die';
import React from 'react';
import {nanoid} from "nanoid"
import Confetti from "react-confetti";

function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const[tenzies,setTenzies] = React.useState(false);

  React.useEffect(() => {
    if (dice.every(die => die.value === dice[0].value)) {
        setTenzies(true)
    }
  }, [dice])

  function generateNewDie() {
    return {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
    }
}

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }
  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
        return die.id === id ? 
            {...die, isHeld: !die.isHeld} :
            die
    }))
}

  function rollDice() {
    if (!tenzies) {
    setDice(oldDice=> oldDice.map(die => {
        return die.isHeld ? 
        die : 
        generateNewDie()
      }))
    } else {
        setTenzies(false)
        setDice(allNewDice())
    }
  }
  const diceElements= dice.map(die=> (
      <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={()=>holdDice(die.id)} />
  ))
  return (
    <main className="Main">
       {tenzies && <Confetti />}
       <h1 className="title">Tenzies</h1>
       <p className="instructions">Roll until all dice are the same. Click each die to freeze 
       it at its current value between rolls.</p>
      <div className="dice-container">
      {diceElements}
      </div>
      <button 
          onClick={rollDice} 
          className="roll-dice"
          >
            {tenzies ? "New Game" : "Roll Dice"}
          </button>
    </main>
  )
}

export default App;
