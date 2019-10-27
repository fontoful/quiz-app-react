import React from "react";
import Answer from "../components/Answer";

const Answers = props => {
	return (
		<div>
			<Answer letter="a" answer={props.question.answer_a} />
			<Answer letter="b" answer={props.question.answer_b} />
			<Answer letter="c" answer={props.question.answer_c} />
			<Answer letter="d" answer={props.question.answer_d} />
		</div>
	);
};

export default Answers;
