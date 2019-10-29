import React, { useState } from "react";
import "./App.css";
import Progress from "./components/Progress";
import Question from "./components/Question";
import Answers from "./components/Answers";

function App() {
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [currentAnswer, setCurrentAnswer] = useState("");
	const [answers, setAnswers] = useState([]);
	const [error, setError] = useState("");
	const [results, setResults] = useState(false);

	const questions = [
		{
			id: 1,
			question: "Which statement about Hooks is not true?",
			answer_a:
				"Hooks are 100% backwards-compatible and can be used side by side with classes",
			answer_b: "Hooks are still in beta and not available yet",
			answer_c:
				"Hooks are completely opt-in, there's no need to rewrite existing code",
			answer_d: "All of the above",
			correct_answer: "b"
		},
		{
			id: 2,
			question: "Which one is not a Hook?",
			answer_a: "useState()",
			answer_b: "useConst()",
			answer_c: "useReducer()",
			answer_d: "All of the above",
			correct_answer: "b"
		},
		{
			id: 3,
			question: "What Hook should be used for data fetching?",
			answer_a: "useDataFetching()",
			answer_b: "useApi()",
			answer_c: "useEffect()",
			answer_d: "useRequest()",
			correct_answer: "c"
		}
	];

	const question = questions[currentQuestion];

	/*
	
	These are the functions that are later passed as events and data handling

	*/

	const renderResultsMark = (question, answer) => {
		if (question.correct_answer === answer.answer) {
			return <span className="correct">Correct</span>;
		}

		return <span className="failed">Failed</span>;
	};

	const renderResultsData = () => {
		return answers.map(answer => {
			const question = questions.find(
				question => question.id === answer.questionId
			);

			return (
				<div key={question.id}>
					{question.question} - {renderResultsMark(question, answer)}
				</div>
			);
		});
	};

	const renderError = () => {
		if (!error) {
			return;
		}

		return <div className="error">{error}</div>;
	};

	const handleClick = e => {
		setCurrentAnswer(e.target.value);

		// Once user's clicked on an answer, setting error back to empty string
		setError("");
	};

	const next = () => {
		const answer = { questionId: question.id, answer: currentAnswer };

		if (!currentAnswer) {
			setError("Please select an option");
			return;
		}

		answers.push(answer);
		setAnswers(answers);
		setCurrentAnswer("");

		if (currentQuestion + 1 < questions.length) {
			setCurrentQuestion(currentQuestion + 1);
			console.log(currentQuestion);
			return;
		}

		setResults(true);
	};

	const restart = () => {
		setResults(false);
		setCurrentAnswer("");
		setAnswers([]);
		setCurrentQuestion(0);
	};

	if (results) {
		return (
			<div className="container results">
				<h2>Results</h2>
				<ul>{renderResultsData()}</ul>
				<button className="btn btn-primary" onClick={restart}>
					Restart the quiz
				</button>
			</div>
		);
	} else {
		return (
			<div className="container">
				<Progress
					total={questions.length}
					current={currentQuestion + 1}
				/>
				<Question question={question.question} />
				{renderError()}
				<Answers
					question={question}
					currentAnswer={currentAnswer}
					handleClick={handleClick}
				/>
				<button className="btn btn-primary" onClick={next}>
					Confirm and continue
				</button>
			</div>
		);
	}
}

export default App;
