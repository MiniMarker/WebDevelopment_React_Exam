import {sessionService} from 'redux-react-session';


export const login = (username, password, history) => {
	return () => {
		
		console.log("enter login");

		return fetch("/api/signup", {
			method: "post",
			headers: {
				"Content-type": "application/json"
			},
			body: JSON.stringify({
				username,
				password
			})
		}).then((res) => {

			if(res.status === 204) {
				sessionService.saveUser({payload})
					.then(() => {
						history.push("/")
					})
					.catch(err => console.error(err))
			}
		}).catch((err) => {
			console.error(err)
		});
	}
};