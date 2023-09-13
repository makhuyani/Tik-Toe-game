import {useState} from "react";
import React, {Component} from "react";
import '../App.css';


class Game extends Component {
  
  render(){

    return(
      <>
        {/* <div className="Game"> */}
          {/* <div className="game-board"> */}
            <GameContaniner/>
          {/* </div> */}
        {/* </div> */}
       </>
    );
    }
}

function GameContaniner (){
  const [xisNext,setXIsNext] = useState(true);
  const [history,setHistory] = useState([Array(9).fill(null)]);
  const [currentMove,setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];

  console.log("history.lrngth = " + history.length);
  console.log("currentSquares = " + currentSquares);

  function handlePlay(nextSquares){
    const nextHistory = [...history.slice(0,currentMove + 1),nextSquares];
    setXIsNext(!xisNext);
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove){
    setCurrentMove(nextMove);
    setXIsNext(nextMove % 2 === 0);
  }

  console.log("history = " + history);

  // move is the n entry of history array [][]
  const moves = history.map((squares,move) =>{
    let description;

    console.log(" squares >> " + squares);
    console.log(" move >> " + move);

    if (move > 0){
      description = "go to move # " + move;
    }else{
      description = "Go to game start";
    }

    return(
      <li key={move}>
        <button onClick={()=>jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return(
    <>
    <div className="game">
      <div className="board">
        <Board xisNext={xisNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-history">
        <ol>{moves}</ol>
      </div>
    </div>
  </>
  );
}

function Board({xisNext, squares , onPlay}){

    function handleClick(i) {
      const nextSquare = squares.slice(); 

      if (squares[i] != null || culculateWinner(squares) != null ){
        return;
      }
  
      if (xisNext) {
        nextSquare[i] = "X";
      }else{
        nextSquare[i] = "O";
      }

      onPlay(nextSquare);

      // setisNext(!xisNext);
      // setSquare(nextSquare);
    }
  
    // function handleNewGame() {
    //   const CpyArr = squares.slice(); 
  
    //   CpyArr.splice(0, CpyArr.length);
    //   onPlay(CpyArr);
    // }
  
    const winner = culculateWinner(squares);
    var status;
    var draw;
  
    if (winner) {
      status = "Winner: " + winner;
    }else{
      status = "Next player: " + (xisNext ? "X" : "O");
    }

   // determine if all the squares are filled and return no winner

   for (let i = 0 ; i < squares.length ; i++){

    if (squares[i] == null){
      draw = false;
      break;
    }else{
      draw = true;
    }
   }

   if (draw){
    status = "Draw";
   }

    return (<>
      <div className='status'>
        <h4>{status}</h4>
        {/* <div className="newGameButn">
          <button onClick={handleNewGame}>New Game</button>
        </div> */}
      </div>
      
      {/* <div className="resetButtons">
        <button className="undo" onClick={handleUndo}>Undo</button>
        <button className="NewGame" onClick={handleNewGame}>New Game</button>
      </div> */}
      <div className="Board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
        <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
        <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
      </div>
      <div className="Board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
        <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
        <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
      </div>
      <div className="Board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
        <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
        <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
      </div>
      </>);
  }
  
  function Square({value,onSquareClick}){
    return(<button className="square" onClick={onSquareClick} >{value}</button>);
  }
  
  function culculateWinner(squares){
  
    const lines = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ];

    console.log("lines.length = " + lines.length );
    console.log("squares= " + squares );
  
    for (let i = 0 ; i < lines.length; i++){
      const [a,b,c] = lines[i];

      console.log( i + " lines[i].length " + lines[i].length + " [a,b,c]  = " + a.toString() + b + c );
  
      if (squares[a] != null && squares[a] === squares[b] && squares[a] === squares[c]){
        console.log("Passing ");
        return squares[a];

      }
  
    }
  
    return null;
  
  }

  export default Game;