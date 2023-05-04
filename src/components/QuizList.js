import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function QuizList() {
    const { id } = useParams();
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/subject/${id}/quiz/`, {
            headers: {
                Authorization: `Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgzMTk0MDI2LCJpYXQiOjE2ODMxNzYwMjYsImp0aSI6IjZhZTdiNmY3NzAyYTRkZWRiMTJhZDU2NDU1ZGYyNWYzIiwidXNlcl9pZCI6M30.ewIm-Ed4Ryw8nIWn9REZUX_Lqn73nT38eGRTuMIxl34`
            }
        })
            .then(response => {
                console.log(response.data); // Check if the API is returning the expected response
                setQuizzes(response.data.results);
            })
            .catch(error => {
                console.log(error);
            });
    }, [id]);

    return (
        <div>
            <h1>Quiz List</h1>
            {Array.isArray(quizzes) ? (
                <ul>
                    {quizzes.map(quiz => (
                        <li key={quiz.id}>
                            <a href={`quiz/${quiz.id}`}>{quiz.title}</a>
                        </li>
                    ))}
                </ul>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}

export default QuizList;
