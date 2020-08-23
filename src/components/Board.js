import React from 'react';
import Square from './Square'

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      numSquares: [0,1,2,3,4,5,6,7,8],
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    const numSquares = this.state.numSquares.slice();
    if (this.calculateWinner(squares) || squares[i]) {
      return;
    }

    const opponentMove = this.calculateOpponentMove(i)
    squares[i] = numSquares[i] = this.props.human;
    squares[opponentMove] = numSquares[opponentMove] = this.props.AI;

    this.setState({
      squares: squares,
      numSquares: numSquares,
    });
    
  }

  calculateOpponentMove(i){
    // here we calculate the position of other player which should be anything but not i
    const numSquares = this.state.numSquares.slice();

    //Empty position array will hold the number between 0 to 8 except i from which a random number will be selected which will be the other player's position on the board
    let emptyPosArray

    // if i is 0, it should be any random number between 1 to 8 [1,2,3,4,5,6,8]
    if(i === 0){
      emptyPosArray = numSquares.slice(i+1)
    }
    // if i is last element, it should be anywhere in [0,1,2,3,4,5,6,7]
    else if( i === 8 ){
      emptyPosArray = numSquares.slice(0, i)
    }
    // if i is any number in between, e.g. 5, then it should be [0,1,2,3,4,6,7,8]
    else{
      emptyPosArray = numSquares.slice(0, i).concat(numSquares.slice(i + 1))
    }

    // filter the empty position array to find out the positions that are not filled by X and O's .
    const vacantSquares = emptyPosArray.filter(x => {
       return (x !== 'X') && (x !== 'O')
     })
    // find out any random number other than X and O positions to fill the next move 
    const opponentRandomMove = vacantSquares[Math.floor(Math.random() * vacantSquares.length)];
    return opponentRandomMove
  }

  calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  renderSquare(i) {
    return (
      <Square 
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
        AI = {this.props.AI}
      />
    );
  }

  render() {
    const winner = this.calculateWinner(this.state.squares);

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    return (
      <div className="board-container">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
      </div>
    );
  }
}

export default Board