import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Board from './components/Board'
import ChoosePlayer from './components/ChoosePlayer';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      human: '',
      AI: '',
    };
  }

  handlePlayerSelection = (choice) => {
      console.log(choice)
      if (choice === "X") {
          this.setState({
            human: "X",
            AI: "O"
          });
          document.querySelector(".choosePlayer").style.display = "none";
        }
        else if (choice === "O") {
          this.setState({
            human: "O",
            AI: "X"
          });
          document.querySelector(".choosePlayer").style.display = "none";
        }
    }
  
  render() {
    return (
      <div>
        <ChoosePlayer
            handlePlayerSelection = {(choice) => this.handlePlayerSelection(choice)} />
        <div className="game">
            <div className="game-board">
              <Board 
                human={this.state.human} 
                AI={this.state.AI}
              />
            </div>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);