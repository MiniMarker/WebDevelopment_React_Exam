import React from "react";
import {getAllQuizzes, getRandomQuiz} from "../../../server/db/quizRepository";

export class Quiz extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			game: this.props.game,
			questions: null,
			socket: this.props.socket
		}

	};

	componentDidMount() {

		console.log(this.state);

		/*
		this.state.socket.on("recieveQuestion", (data) => {

			console.log(data);


			this.setState({
				questions: data.questions
			});


		});


		this.state.socket.emit("getQuestion", (this.state.game))
	*/

	}

	render() {
		return (
			<div>
				<h2>{this.state.game.name}</h2>


				{this.state.questions && this.state.questions.map((question) => {
					return (
						<div>
							<h3>{question[1].question}</h3>
							<div>{question[1].ans1}</div>
							<div>{question[1].ans2}</div>
							<div>{question[1].ans3}</div>
							<div>{question[1].ans4}</div>
						</div>
					)
				})}



			</div>
		);
	}


}