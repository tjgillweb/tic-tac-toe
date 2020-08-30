import React from 'react';
import Square from './Square'
import DisplayResult from './DisplayResult'

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      numSquares: [0,1,2,3,4,5,6,7,8],
      winner: '',
      turn: 1, //to calculate if the game is tied
      winnerLine: [] // to highlight the boxes of winning X's or O's
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    const numSquares = this.state.numSquares.slice();
    // const winner = this.calculateWinner(squares);
    // if (this.calculateWinner(squares) || squares[i]) {
    //   return;
    // }

    if(this.calculateWinner(squares) !== null){
      var [winner, winnerLine] = this.calculateWinner(squares)
    }
    if (winner || squares[i]) {
      return;
    }

    const opponentMove = this.calculateOpponentMove(i)
    squares[i] = numSquares[i] = this.props.human;
    this.setState({
      squares: squares,
      numSquares: numSquares,
      turn: this.state.turn + 1
    });
    const winnerAfterSetState = this.calculateWinner(squares)
    if(this.state.turn === 5 && winnerAfterSetState === null)
    {
        this.setState({winner: 'tie'})
        return
    }
    else
    {   
        if(this.calculateWinner(squares) !== null){
          const [winner, winnerLine] = this.calculateWinner(squares);
          this.setState({
          winner: winner,
          winnerLine: winnerLine
          })
        }
        else{
          this.setState({
          winner: winnerAfterSetState,
          })
        }    
    }
    console.log(this.state.turn)
    const setOpponentMove = () => {
      setTimeout(function() { // set a delay in the appearance of the opponent move
        if(this.calculateWinner(squares) !== null){
            var [winner, winnerLine] = this.calculateWinner(squares)
          }
        if (winner) {
          return;
        } 
        squares[opponentMove] = numSquares[opponentMove] = this.props.AI;
        this.setState({
          squares: squares,
          numSquares: numSquares,
          winner: winner
        });
        const winnerAfterSetState = this.calculateWinner(squares)
        if(this.calculateWinner(squares) !== null){
            const [winner, winnerLine] = this.calculateWinner(squares);
            this.setState({
            winner: winner,
            winnerLine: winnerLine
            })
          }
        else{
          this.setState({
          winner: winnerAfterSetState,
          })
        }   
      }.bind(this),250); 
    }
		setOpponentMove();
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
        //return squares[a];
        return [ squares[a], lines[i] ]
      }
    }
    return null;
  }

  replay = () => {
    this.setState({
      squares: Array(9).fill(null),
      numSquares: [0,1,2,3,4,5,6,7,8],
      winner: '',
      turn: 1,
    }); 
    document.querySelector(".choosePlayer").style.display = "block";
    document.querySelector(".board-container").style.display = "block";
    document.querySelector(".board-container").style.display = "none";
  }
  renderSquare(i) {
    return (
      <Square 
        id={i}
        value={this.state.squares[i]}
        AI = {this.props.AI}
        winnerLine = {this.state.winnerLine}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    return (
      <>
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

        {(this.state.winner) ? <DisplayResult
            result= {this.state.winner}
            replay = {this.replay} 
            human = {this.props.human}
            AI = {this.props.AI}
            waitBeforeShow={1200}
        /> : null }
      </>
    );
  }
}

export default Board