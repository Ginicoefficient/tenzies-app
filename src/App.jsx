import React from "react";
import "./App.css";
import Die from "./Components/die";
import { nanoid } from "nanoid";

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
    setDice(() => allNewDice());
  }

  function holdDice(id) {
    console.log(id);
  }

  return (
    <div className="app-container">
      <main>
        <div className="dice-container">{diceElements}</div>
        <button className="btn" onClick={handleNewRoll}>
          Roll
        </button>
      </main>
    </div>
  );
}

export default App;
