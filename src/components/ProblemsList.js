import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { usePlatform } from '../context/PlatformContext';
import './ProblemsList.css';

const ProblemsList = () => {
    const [problems, setProblems] = useState([]);
    const { solvedProblems } = usePlatform();  // ✅ get solved problems from context

    useEffect(() => {
        fetchProblems();
    }, []);

    const fetchProblems = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/problems");
            setProblems(res.data);
        } catch (err) {
            console.error("Failed to load problems", err);
        }
    };

    const isSolved = (problemId) => {
        return solvedProblems.includes(problemId);
    };

    return (
        <div className="problems-container">
            <h2>Problems List</h2>
            <table className="problems-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Tags</th>
                        <th>Difficulty</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {problems.map((problem, index) => (
                        <tr key={problem._id}>
                            <td>{index + 1}</td>
                            <td>
                                <Link to={`/problems/${problem._id}`}>{problem.title}</Link>
                            </td>
                            <td>{problem.tags.join(", ")}</td>
                            <td>{problem.difficulty}</td>
                            <td>
                                {isSolved(problem._id) ? <span className="tick">✅</span> : <span>❌</span>}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProblemsList;
