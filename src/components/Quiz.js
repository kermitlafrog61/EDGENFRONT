import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


function Quiz(props) {
    const { id } = useParams();
    const [quiz, setQuiz] = useState(null);
    const [questions, setQuestions] = useState(null);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [result, setResult] = useState(null);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/quiz/${id}`, {
            headers: {
                Authorization: `Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgzMTk0MDI2LCJpYXQiOjE2ODMxNzYwMjYsImp0aSI6IjZhZTdiNmY3NzAyYTRkZWRiMTJhZDU2NDU1ZGYyNWYzIiwidXNlcl9pZCI6M30.ewIm-Ed4Ryw8nIWn9REZUX_Lqn73nT38eGRTuMIxl34`
            }
        })
            .then(response => {
                setQuiz(response.data);
                setQuestions(response.data.questions);
            })
            .catch(error => {
                console.log(error);
            });

    }, [id]);



    function handleAnswerChange(event, questionId) {
        const answerId = parseInt(event.target.value);
        setSelectedAnswers({
            ...selectedAnswers,
            [questionId]: answerId
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        const answerIds = Object.values(selectedAnswers);
        axios.post(`http://127.0.0.1:8000/quiz/${id}/result/`, { answers: answerIds }, {
            headers: {
                Authorization: `Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgzMTk0MDI2LCJpYXQiOjE2ODMxNzYwMjYsImp0aSI6IjZhZTdiNmY3NzAyYTRkZWRiMTJhZDU2NDU1ZGYyNWYzIiwidXNlcl9pZCI6M30.ewIm-Ed4Ryw8nIWn9REZUX_Lqn73nT38eGRTuMIxl34`
            }
        })
            .then(response => {
                setResult(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    if (!quiz || !questions) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{quiz.title}</h1>
            <form onSubmit={handleSubmit}>
                {questions && questions.map(question => (
                    <div key={question.id}>
                        <h3>{question.text}</h3>
                        {question.answers.map(answer => (
                            <div key={answer.id}>
                                <input
                                    type="radio"
                                    id={answer.id}
                                    name={`question-${question.id}`}
                                    value={answer.id}
                                    checked={selectedAnswers[question.id] === answer.id}
                                    onChange={(event) => handleAnswerChange(event, question.id)}
                                />
                                <label htmlFor={answer.id}>{answer.text}</label>
                            </div>
                        ))}
                    </div>
                ))}
                <button type="submit">Submit</button>
            </form>
            {result && (
                <div>
                    <h2>Result: {result.passed ? 'Passed' : 'Failed'}</h2>
                    <p>{result.result}</p>
                </div>
            )}
        </div>
    );
}


export default Quiz;
