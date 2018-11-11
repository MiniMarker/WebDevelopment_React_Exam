import React from "react";

export class Quiz extends React.Component {

	constructor(props) {
		super(props);

		this.state = this.getDefaultState();

	};


	getDefaultState = () => {
		return {
			game: null
		};
	};

	resetGame = () => {

	};

	answerQuestion = (answerIndex) => {

		this.setState((prevState) => {
			const copy = prevState.game.copy();

			return {
				game: copy
			}
		});
	};

	render() {
		return (
			<div>
				<h3>GAME!!!</h3>

				<div>Answer 1</div>
				<div>Answer 2</div>
				<div>Answer 3</div>
				<div>Answer 4</div>

			</div>
		);
	}


}