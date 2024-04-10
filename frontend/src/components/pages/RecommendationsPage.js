import React, { useEffect, useState } from 'react';
import axios from 'axios';
import getUserInfo from "../../utilities/decodeJwt";

const RecommendationsPage = () => {
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        const fetchRecommendations = async () => {
            const userInfo = getUserInfo(); // Retrieve user info (ensure this function synchronously returns the user object)

            if (!userInfo || !userInfo.username || !userInfo.email) {
                console.error("User info is missing. Unable to fetch recommendations.");
                return;
            }

            try {
                const url = `${process.env.REACT_APP_BACKEND_URL}/pullRecommendations?username=${encodeURIComponent(userInfo.username)}&email=${encodeURIComponent(userInfo.email)}`;
                const response = await axios.get(url);

                if (response.data && response.data.length > 0) {
                    setRecommendations(response.data);
                } else {
                    console.log('No recommendations found for the current user.');
                }
            } catch (error) {
                console.error("Failed to fetch recommendations:", error);
            }
        };

        fetchRecommendations();
    }, []); // Empty dependency array means this effect runs once on component mount

    return (
        <div>
            <h1 style={{ color: 'white' }}>User Recommendations</h1>
            {recommendations.length > 0 ? (
                <ul>
                    {recommendations.map((rec, index) => (
                        <li key={index}>
                            Model: {rec.new_model}, Benchmark: {rec.benchmark}, Increase: {rec.Increase}%
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No recommendations available.</p>
            )}
        </div>
    );
};

export default RecommendationsPage;