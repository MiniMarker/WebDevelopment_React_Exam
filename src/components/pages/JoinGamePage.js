import React from 'react';
import {Link} from 'react-router-dom';

export class JoinGamePage extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			name: ""
		}
	}

	async componentDidMount() {
		await fetch("/api/user").then((res) => {

			switch(res.status) {
				case 200:

					res.json()
						.then((parsedBody) => {
							this.props.login(parsedBody.username);
						});

					break;
				case 401:

					this.props.history.push("/login");

					break;
				default:
					console.log("ERROR: unexpected statuscode!", res.status);
			}
		});
	}

	onInputChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	};

	handleCreateGame = (event) => {
		event.preventDefault();

		this.props.history.push("/game");
	};

	render() {
		return (
			<div className={"container"} onSubmit={this.handleCreateGame}>
				<li>
					<ul><Link to={"/game"}>Game 1</Link></ul>
					<ul><Link to={"/game"}>Game 2</Link></ul>
					<ul><Link to={"/game"}>Game 3</Link></ul>
				</li>
			</div>
		);
	}


}