import React from "react";
import {Link} from 'react-router-dom';

export class Quiz extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			game: this.props.game,
			socket: this.props.socket,
			authUser: this.props.authUser,
			questions: null,
			isCorrect: null,
			gameIsDone: false,
			questionAnswered: null,
			timestampOnReceivedQuestion: null,
			playerScores: null
		};
	};

	componentDidMount() {

		this.state.socket.on("receiveQuestion", (data) => {

			if(this.state.questionAnswered === false) {

				this.state.socket.emit("answerQuestion", ({
					gameId: this.state.game.id,
					username: this.state.authUser,
					timestamp: 5000
				}));

			}

			this.setState({
				question: data.question,
				isCorrect: null,
				questionAnswered: false,
				timestampOnReceivedQuestion: new Date().getTime()
			});
		});

		this.state.socket.on("endGame", (data) => {

			console.log("Received endGame emit");

			this.setState({
				gameIsDone: true,
				playerScores: data.players
			});
		});

		this.state.socket.emit("getQuestion", (this.state.game));
	};

	answerQuestion = (index, question) => {

		if(this.state.questionAnswered === true) {
			console.log("You can only answer a question once");
			return;
		}

		let resultString, timestampOnAnswerQuestion;

		if(index === question.correctAnsIndex) {
			resultString = "Correct!";
			timestampOnAnswerQuestion = (new Date().getTime() - this.state.timestampOnReceivedQuestion);
		} else {
			resultString = "False...";
			timestampOnAnswerQuestion = 5000;
		}

		this.setState({
			isCorrect: resultString,
			questionAnswered: true
		});

		this.state.socket.emit("answerQuestion", ({
			gameId: this.state.game.id,
			username: this.state.authUser,
			timestamp: timestampOnAnswerQuestion
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
					</div>
				}

				{this.state.isCorrect && <h2>{this.state.isCorrect}</h2>}
			</div>
		)
	};

	renderScore = () => {
		return (
			<div>
				<h2>Game is done!</h2>

				<table>
					<thead>
						<tr>
							<th>Username</th>
							<th>Score</th>
						</tr>
					</thead>

					<tbody>
						{this.state.playerScores && this.state.playerScores.map((player, index) => {
							return (
								<tr key={`player_${index}`}>
									<td>{player.username}</td>
									<td>{(100 - Math.floor(player.score / 250))}</td>   {/*TODO Update divider number to 250*/}
								</tr>
							)
						})}
					</tbody>
				</table>

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