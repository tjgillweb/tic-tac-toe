import React, {Component} from 'react';

class DisplayResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
			hidden : true
		};
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({hidden: false});
			document.querySelector(".board-container").style.display = "none";
        }, this.props.waitBeforeShow);
    }

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
				(this.state.hidden) ? '' : <div className = "displayResult">
					<h1>{result}</h1>
					<button className = "replay" onClick = {this.props.replay}>Play again ?</button>
				</div> 
			)
	}
}

export default DisplayResult