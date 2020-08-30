import React, {Component} from 'react';

class Result extends Component {

	render() {
		let result = ''
			if(this.props.result  === this.props.human){
				result = "You win!"
			}
			else if(this.props.result === this.props.AI){
				result = "You lose!"
			}
			else if(this.props.result === 'tie'){
			result = "Game tied!"
			}

		return (
				<div className = "displayResult">
					<h1>{result}</h1>
					<button className = "replay" onClick = {this.props.replay}>Play again ?</button>
				</div> 
			)
	}
}

export default Result