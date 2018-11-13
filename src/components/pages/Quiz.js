import React from "react";
import Countdown from 'react-countdown-now';

export class Quiz extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			game: this.props.game,
			questions: null,
			socket: this.props.socket
		};
	};

	componentDidMount() {

		this.state.socket.on("receiveQuestion", (data) => {
			this.setState({question: data.question});
		});

		this.state.socket.emit("getQuestion", (this.state.game));
	}

	answerQuestion = (event) => {
		console.log("Button clicked..");
	};

	render() {
		return (
			<div>
				<Countdown date={Date.now() + 3000}/>
				<h2>{this.state.game.name}</h2>

				{this.state.question &&
				<div>
					<h3>{this.state.question.question}</h3>

					{this.state.question.answers.map((alternative, index) => {
						return (
							<div
								className={"question_alt"}
								onClick={this.answerQuestion}
								id={`ans${index}`}>
								<p>{`${index}: ${alternative}`}</p>
							</div>
						)
					})}
				</div>

				}

				{/*Code for showing all questions in an array*/}
				{/*this.state.questions && this.state.questions.map((question) => {
					return (
						<div>
							<h3>{question.question}</h3>

							{question.answers.map((alternative, index) => {
								return (
									<div
										className={"question_alt"}
										onClick={this.answerQuestion}
										id={`ans${index}`}>
										<p>{`${index}: ${alternative}`}</p>
									</div>
								)
							})}
						</div>
					)
				})*/}
			</div>
		);
	}


}