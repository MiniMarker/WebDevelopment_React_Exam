import React from "react";
import {Link} from 'react-router-dom';
import Countdown from 'react-countdown-now';

export class Quiz extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			game: this.props.game,
			questions: null,
			socket: this.props.socket,
			isCorrect: null,
			authUser: this.props.authUser,
			gameIsDone: false,
			questionAnswered: false
		};
	};

	componentDidMount() {
		this.state.socket.on("receiveQuestion", (data) => {

			//console.log("receiveQuestion >> ", data);

			this.setState({
				question: data.question,
				isCorrect: null,
				questionAnswered: false
			});
		});

		this.state.socket.on("endGame", () => {

			console.log("Received endGame emit");

			this.setState({
				gameIsDone: true
			});
		});

		this.state.socket.emit("getQuestion", (this.state.game));
	};

	answerQuestion = (index, question) => {
		/*
		if(this.state.questionAnswered === true) {
			console.log("You can only answer a question once");
			return;
		}
		*/

		let resultString;

		index === question.correctAnsIndex
			? resultString = "Correct!"
			: resultString = "False...";

		this.setState({
			isCorrect: resultString,
			questionAnswered: true
		});

		this.state.socket.emit("answerQuestion", ({
			game: this.state.game,
			username: this.state.authUser,
			isCorrect: index === question.correctAnsIndex
		}));
	};


	renderQuestions = () => {
		return (
			<div>
				<h2>{this.state.game.name}</h2>

				{this.state.question &&
				<div>
					<h3>{this.state.question.question}</h3>

					{this.state.question.answers.map((alternative, index) => {
						return (
							<div
								key={`ansIndex${index}`}
								className={"question_alt"}
								onClick={() => {this.answerQuestion(index, this.state.question)}}>
								<p>{`${index}: ${alternative}`}</p>
							</div>
						)
					})}

					{this.state.isCorrect && <h2>{this.state.isCorrect}</h2>}
				</div>

				}
			</div>
		)
	};

	// TODO Remove the playerlist if not working highscore
	renderScore = () => {
		return (
			<div>
				<h2>Game is done!</h2>

				{this.state.game && this.state.game.players.map((player, index) => {
					return (
						<div key={`player_${index}`}>
							<p>{player}</p>
						</div>
					)
				})}

				<Link to={"/"}>Go home</Link>
			</div>
		)
	};


	render() {
		return (
			<div>
				{this.state.gameIsDone
					? this.renderScore()
					: this.renderQuestions()
				}
			</div>
		);
	}
}