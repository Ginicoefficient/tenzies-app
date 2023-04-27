import React from "react";
import "./App.css";
import Die from "./Components/die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
  function allNewDice() {
    const diceArray = new Array(10).fill().map((index) => {
      return {
        value: Math.floor(Math.random() * 6 + 1),
        isHeld: false,
        id: nanoid(),
      };
    });
    return diceArray;
  }

  const [currentDice, setDice] = React.useState(allNewDice());

  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect(() => {
    const allHeld = currentDice.every((die) => die.isHeld);
    const firstValue = currentDice[0].value;
    const allSameValue = currentDice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
      console.log("you won");
    }
  }, [currentDice]);

  const diceElements = currentDice.map((dice) => (
    <Die
      key={dice.id}
      value={dice.value}
      id={dice.id}
      isHeld={dice.isHeld}
      holdDice={() => holdDice(dice.id)}
    />
  ));

  function handleNewRoll() {
    if (!tenzies) {
      setDice((oldDice) =>
        oldDice.map((die) => {
          return !die.isHeld
            ? {
                ...die,
                value: Math.floor(Math.random() * 6 + 1),
              }
            : { ...die };
        })
      );
    } else {
      setTenzies(false);
      setDice(allNewDice());
    }
  }

  function holdDice(id) {
    setDice((prevDice) =>
      prevDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : { ...die };
      })
    );
  }

  return (
    <div className="app-container">
      <main>
        {tenzies && <Confetti />}
        <h1 className="title">Tenzies</h1>
        <p className="instructions">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="dice-container">{diceElements}</div>
        <button className="btn" onClick={handleNewRoll}>
          {tenzies ? "Start a New Game" : "Roll"}
        </button>
      </main>
    </div>
  );
}

export default App;
