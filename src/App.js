import React, { useState } from 'react';
import './App.css';

function App() {
  let countLocalStorage = 0;
  if (localStorage.currentCount) {
    countLocalStorage = +JSON.parse( localStorage.currentCount );
  } 

  let matrixLocalStorage = Array(9).fill(null);
  if (localStorage.currentMatrix) {
    matrixLocalStorage = JSON.parse( localStorage.currentMatrix );
  } 
  

  const combinationsWin = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const clickHandler = (event) => {
    let clickedSquare = event.target.getAttribute('data');
    console.log(`clicked square ${clickedSquare}`);
    const currentMatrix = matrix;

    if (currentMatrix[clickedSquare] === null) {
      if (count % 2 === 0) {
        currentMatrix[clickedSquare] = 'X';
        
      } else {
        currentMatrix[clickedSquare] = '0'
      }
      setMatrix(currentMatrix);
      setCount(count + 1);
      localStorage.currentMatrix = JSON.stringify(currentMatrix);
      localStorage.currentCount  = JSON.stringify(count + 1);
    }
    isDraw();
    isWin();
  }

  const isWin = () => {
    const symbol = (count % 2 === 0) ? 'X' : '0';
    for (let i = 0; i < combinationsWin.length; i++) {
      let currentLine = combinationsWin[i];
      if (matrix[currentLine[0]] === symbol 
      && matrix[currentLine[1]] === symbol
      && matrix[currentLine[2]] === symbol) {
        alert(`${symbol} win`);
        clearField();
      } 
    }

  }

  const isDraw = () => {
    if (count === matrix.length - 1) {
      alert('friendship win');
      clearField();
    } 
  }

  const clearField = () => {
    setMatrix(Array(9).fill(null));
    setCount(0);
    localStorage.currentMatrix = JSON.stringify(Array(9).fill(null));
    localStorage.currentCount = JSON.stringify(0);
  }

  const [count, setCount] = useState(countLocalStorage);

  const [matrix, setMatrix] = useState(matrixLocalStorage);

  return (
    <div className="container">
      <div className="tic-tac">
        <div className="tt-grid" onClick={clickHandler} data="0">
          {matrix[0]}
        </div>
        <div className="tt-grid" onClick={clickHandler} data="1">
          {matrix[1]}
        </div>
        <div className="tt-grid" onClick={clickHandler} data="2">
          {matrix[2]}
        </div>
        <div className="tt-grid" onClick={clickHandler} data="3">
          {matrix[3]}
        </div>
        <div className="tt-grid" onClick={clickHandler} data="4">
          {matrix[4]}
        </div>
        <div className="tt-grid" onClick={clickHandler} data="5">
          {matrix[5]}
        </div>
        <div className="tt-grid" onClick={clickHandler} data="6">
          {matrix[6]}
        </div>
        <div className="tt-grid" onClick={clickHandler} data="7">
          {matrix[7]}
        </div>
        <div className="tt-grid" onClick={clickHandler} data="8">
          {matrix[8]}
        </div>
      </div>
      <button type="button" class="btn btn-primary" onClick={clearField}>New Game</button>
      <button type="button" class="btn btn-primary">Previous results</button>
      
      <p> {count} Count</p>
    </div>
  );
}

export default App;
