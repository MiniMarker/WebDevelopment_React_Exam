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

	}


}