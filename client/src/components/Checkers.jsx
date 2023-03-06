import { useState } from 'react';

function BlackSquare({ value, onSquareClick }) {
  return (
    <button className="blackSquare" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function RedSquare({ value, onSquareClick }) {
  return (
    <button className="redSquare" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function EndTurnButton({ onEndTurnClick }) {
  return (
    <button className="endBtn" onClick={onEndTurnClick}>
      End Turn
    </button>
  );
}

export default function Checkers() {
  let redCount = 0;
  let blackCount = 0;
  
  const [blackIsNext, setBlackIsNext] = useState(true);
  
  const [squares, setSquares] = useState([undefined, '⚫', undefined, '⚫', undefined, '⚫', undefined, '⚫', '⚫', undefined, '⚫', undefined, '⚫', undefined, '⚫', undefined, undefined, '⚫', undefined, '⚫', undefined, '⚫', undefined, '⚫', null, undefined, null, undefined, null, undefined, null, undefined, undefined, null, undefined, null, undefined, null, undefined, null, '🔴', undefined, '🔴', undefined, '🔴', undefined, '🔴', undefined, undefined, '🔴', undefined, '🔴', undefined, '🔴', undefined, '🔴', '🔴', undefined, '🔴', undefined, '🔴', undefined, '🔴', undefined]);
  
  const [selectedPiece, setSelectedPiece] = useState('⚫');
  const savedPiece = ['🔴', '❤️', '⚫', '🖤']

  const statusMessage = ["Black's Turn", "Red's Turn", "Black Wins!", "Red Wins!"]
  const [status, setStatus] = useState(statusMessage[0]);

  function handleClick(i) {
    const nextSquares = squares.slice();

    function changeSelectedPiece() {
      if (nextSquares[i] === '🔴') {
        setSelectedPiece(savedPiece[0]);
      } else if (nextSquares[i] === '❤️') {
        setSelectedPiece(savedPiece[1]);
      } else if (nextSquares[i] === '⚫') {
        setSelectedPiece(savedPiece[2]);
      } else if (nextSquares[i] === '🖤') {
        setSelectedPiece(savedPiece[3]);
      } 
    }
      
    function tallyPieces() { 
      for (let index = 0; index < nextSquares.length; index++) {
        if ((nextSquares[index] === '🔴') || nextSquares[index] === '❤️') {
          redCount ++;          
        } else if ((nextSquares[index] === '⚫') || nextSquares[index] === '🖤') {
          blackCount ++;          
        }
      }
      if ((redCount === 0) && blackIsNext) {
        setStatus(statusMessage[2]);
        console.log('Black wins!');
      } else if ((blackCount === 0) && !blackIsNext) {
        setStatus(statusMessage[3]);
        console.log('Red wins!');
      }
    }

    function removeGhostPieces() {
      for (let index = 0; index < nextSquares.length; index++) {
        if ((nextSquares[index] === 'B') || (nextSquares[index] === 'R') || (nextSquares[index] === 'BK') || (nextSquares[index] === 'RK')) {
          nextSquares[index] = null;          
        }
      }
    }
  
    if ((nextSquares[i] === '🔴') && !blackIsNext) {
      changeSelectedPiece();
      console.log(selectedPiece);
      nextSquares[i] = 'R';
      tallyPieces();
    } else if ((nextSquares[i] === '❤️') && !blackIsNext) {
      changeSelectedPiece();
      console.log(selectedPiece);
      nextSquares[i] = 'RK';
      tallyPieces();
    } else if ((nextSquares[i] === '⚫') && blackIsNext) {
      changeSelectedPiece();
      console.log(selectedPiece);
      nextSquares[i] = 'B';
      tallyPieces();
    } else if ((nextSquares[i] === '🖤') && blackIsNext) {
      changeSelectedPiece();
      console.log(selectedPiece);
      nextSquares[i] = 'BK';
      tallyPieces();
    } else if ((nextSquares[i] === '🔴') || (nextSquares[i] === '❤️') || (nextSquares[i] === '⚫') || (nextSquares[i] === '🖤')) {
      changeSelectedPiece();
      console.log(selectedPiece);
      nextSquares[i] = null;
      tallyPieces();
    } else if (((nextSquares[i] === null) || (nextSquares[i] === 'B') || (nextSquares[i] === 'BK'))  && blackIsNext) {
      nextSquares[i] = selectedPiece;
      removeGhostPieces();
      if (nextSquares[56] === '⚫') {
        (nextSquares[56] = '🖤')
        // Add 1 to black's kinged piece stat
      }
      if (nextSquares[58] === '⚫') {
        (nextSquares[58] = '🖤')
        // Add 1 to black's kinged piece stat
      }
      if (nextSquares[60] === '⚫') {
        (nextSquares[60] = '🖤')
        // Add 1 to black's kinged piece stat
      }
      if (nextSquares[62] === '⚫') {
        (nextSquares[62] = '🖤')
        // Add 1 to black's kinged piece stat
      }
      tallyPieces();
    } else if (((nextSquares[i] === null) || (nextSquares[i] === 'R') || (nextSquares[i] === 'RK')) && !blackIsNext) {
      nextSquares[i] = selectedPiece;
      removeGhostPieces();
      if (nextSquares[1] === '🔴') {
        (nextSquares[1] = '❤️')
        // Add 1 to red's kinged piece stat
      }
      if (nextSquares[3] === '🔴') {
        (nextSquares[3] = '❤️')
        // Add 1 to red's kinged piece stat
      }
      if (nextSquares[5] === '🔴') {
        (nextSquares[5] = '❤️')
        // Add 1 to red's kinged piece stat
      }
      if (nextSquares[7] === '🔴') {
        (nextSquares[7] = '❤️')
        // Add 1 to red's kinged piece stat
      }      
      tallyPieces();
    }
    setSquares(nextSquares);
  }

  function handleEndTurnClick() {
    setBlackIsNext(!blackIsNext);
    if (!blackIsNext) {
      setStatus(statusMessage[0])
    } else if (blackIsNext) {
      setStatus(statusMessage[1])
    }
  }

  return (
    <>
      <div className="status">{status}</div>

      <div className="board-row">
        <BlackSquare value={squares[0]} onSquareClick={() => handleClick(0)} />
        <RedSquare value={squares[1]} onSquareClick={() => handleClick(1)} />
        <BlackSquare value={squares[2]} onSquareClick={() => handleClick(2)} />
        <RedSquare value={squares[3]} onSquareClick={() => handleClick(3)} />
        <BlackSquare value={squares[4]} onSquareClick={() => handleClick(4)} />
        <RedSquare value={squares[5]} onSquareClick={() => handleClick(5)} />
        <BlackSquare value={squares[6]} onSquareClick={() => handleClick(6)} />
        <RedSquare value={squares[7]} onSquareClick={() => handleClick(7)} />
      </div>
      <div className="board-row">
        <RedSquare value={squares[8]} onSquareClick={() => handleClick(8)} />
        <BlackSquare value={squares[9]} onSquareClick={() => handleClick(9)} />
        <RedSquare value={squares[10]} onSquareClick={() => handleClick(10)} />
        <BlackSquare value={squares[11]} onSquareClick={() => handleClick(11)} />
        <RedSquare value={squares[12]} onSquareClick={() => handleClick(12)} />
        <BlackSquare value={squares[13]} onSquareClick={() => handleClick(13)} />
        <RedSquare value={squares[14]} onSquareClick={() => handleClick(14)} />
        <BlackSquare value={squares[15]} onSquareClick={() => handleClick(15)} />
      </div>
      <div className="board-row">
        <BlackSquare value={squares[16]} onSquareClick={() => handleClick(16)} />
        <RedSquare value={squares[17]} onSquareClick={() => handleClick(17)} />
        <BlackSquare value={squares[18]} onSquareClick={() => handleClick(18)} />
        <RedSquare value={squares[19]} onSquareClick={() => handleClick(19)} />
        <BlackSquare value={squares[20]} onSquareClick={() => handleClick(20)} />
        <RedSquare value={squares[21]} onSquareClick={() => handleClick(21)} />
        <BlackSquare value={squares[22]} onSquareClick={() => handleClick(22)} />
        <RedSquare value={squares[23]} onSquareClick={() => handleClick(23)} />
      </div>
      <div className="board-row">
        <RedSquare value={squares[24]} onSquareClick={() => handleClick(24)} />
        <BlackSquare value={squares[25]} onSquareClick={() => handleClick(25)} />
        <RedSquare value={squares[26]} onSquareClick={() => handleClick(26)} />
        <BlackSquare value={squares[27]} onSquareClick={() => handleClick(27)} />
        <RedSquare value={squares[28]} onSquareClick={() => handleClick(28)} />
        <BlackSquare value={squares[29]} onSquareClick={() => handleClick(29)} />
        <RedSquare value={squares[30]} onSquareClick={() => handleClick(30)} />
        <BlackSquare value={squares[31]} onSquareClick={() => handleClick(31)} />
      </div>
      <div className="board-row">
        <BlackSquare value={squares[32]} onSquareClick={() => handleClick(32)} />
        <RedSquare value={squares[33]} onSquareClick={() => handleClick(33)} />
        <BlackSquare value={squares[34]} onSquareClick={() => handleClick(34)} />
        <RedSquare value={squares[35]} onSquareClick={() => handleClick(35)} />
        <BlackSquare value={squares[36]} onSquareClick={() => handleClick(36)} />
        <RedSquare value={squares[37]} onSquareClick={() => handleClick(37)} />
        <BlackSquare value={squares[38]} onSquareClick={() => handleClick(38)} />
        <RedSquare value={squares[39]} onSquareClick={() => handleClick(39)} />
      </div>
      <div className="board-row">
        <RedSquare value={squares[40]} onSquareClick={() => handleClick(40)} />
        <BlackSquare value={squares[41]} onSquareClick={() => handleClick(41)} />
        <RedSquare value={squares[42]} onSquareClick={() => handleClick(42)} />
        <BlackSquare value={squares[43]} onSquareClick={() => handleClick(43)} />
        <RedSquare value={squares[44]} onSquareClick={() => handleClick(44)} />
        <BlackSquare value={squares[45]} onSquareClick={() => handleClick(45)} />
        <RedSquare value={squares[46]} onSquareClick={() => handleClick(46)} />
        <BlackSquare value={squares[47]} onSquareClick={() => handleClick(47)} />
      </div>
      <div className="board-row">
        <BlackSquare value={squares[48]} onSquareClick={() => handleClick(48)} />
        <RedSquare value={squares[49]} onSquareClick={() => handleClick(49)} />
        <BlackSquare value={squares[50]} onSquareClick={() => handleClick(50)} />
        <RedSquare value={squares[51]} onSquareClick={() => handleClick(51)} />
        <BlackSquare value={squares[52]} onSquareClick={() => handleClick(52)} />
        <RedSquare value={squares[53]} onSquareClick={() => handleClick(53)} />
        <BlackSquare value={squares[54]} onSquareClick={() => handleClick(54)} />
        <RedSquare value={squares[55]} onSquareClick={() => handleClick(55)} />
      </div>
      <div className="board-row">
        <RedSquare value={squares[56]} onSquareClick={() => handleClick(56)} />
        <BlackSquare value={squares[57]} onSquareClick={() => handleClick(57)} />
        <RedSquare value={squares[58]} onSquareClick={() => handleClick(58)} />
        <BlackSquare value={squares[59]} onSquareClick={() => handleClick(59)} />
        <RedSquare value={squares[60]} onSquareClick={() => handleClick(60)} />
        <BlackSquare value={squares[61]} onSquareClick={() => handleClick(61)} />
        <RedSquare value={squares[62]} onSquareClick={() => handleClick(62)} />
        <BlackSquare value={squares[63]} onSquareClick={() => handleClick(63)} />
      </div>

      <EndTurnButton onEndTurnClick={handleEndTurnClick} />
    </>
  );
}