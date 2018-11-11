
class QuizState {
	constructor(dto) {

		if(dto === undefined || dto === null){
			this.resetGame();
		} else {
			this.counter = dto.counter;
			this.result = dto.result;

		}
	}

	getGameDto() {
		return {
			counter: this.counter,
			result: this.result
		}
	};

	resetGame() {

	};
}