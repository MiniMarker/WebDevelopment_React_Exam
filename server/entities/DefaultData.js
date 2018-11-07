import Quiz from "./Quiz";

export const createDefaultQuizzes = () => {
	Quiz.createQuiz("What is the meaning og life, the universe and everything?", "Chocolate", "Mice", "42", "A book", 3);
	Quiz.createQuiz("How much wood would a woodchuck chuck if a woodchuck would chuck wood?", "Idk", "42", "Depends on the woodchuck", "100", 2);
	Quiz.createQuiz("Who is the president of the galaxy?", "Arthur Dent", "Zaphod Beeblebrox", "Ford Prefect", "Marvin", 2);
	Quiz.createQuiz("Who guard the secret treasure of the Lonely Mountain", "Aragon", "Gandalf", "Sauron", "Smaug", 3);
	Quiz.createQuiz("Who is the director of The Dark Knight", "Christopher Nolan", "Ridley Scott", "Quentin Tarantino", "David Fincher", 1);
};