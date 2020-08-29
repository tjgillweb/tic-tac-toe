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
      AI: '', //Artificial Intelligence(computer)
    };
  }

  handlePlayerSelection = (choice) => {
      console.log(choice)
      if (choice === "X") {
          this.setState({
            human: "X",
            AI: "O"
          });
          this.setDisplayProperty();
        }
        else if (choice === "O") {
          this.setState({
            human: "O",
            AI: "X"
          });
          this.setDisplayProperty();
        }
    }

    setDisplayProperty() {
      document.querySelector(".choosePlayer").style.display = "none";
      document.querySelector(".board-container").style.display = "flex";
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