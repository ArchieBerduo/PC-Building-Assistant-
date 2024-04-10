import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from "react-bootstrap/Card";
import getUserInfo from "../../utilities/decodeJwt";


const RecommendationsPage = () => {
    const [recommendations, setRecommendations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchRecommendations = async () => {
            const userInfo = getUserInfo();
            if (!userInfo || !userInfo.username || !userInfo.email) {
                console.error("User info is missing. Unable to fetch recommendations.");
                setIsLoading(false);
                return;
            }

            try {
                const url = `${process.env.REACT_APP_BACKEND_URL}/pullRecommendations?email=${encodeURIComponent(userInfo.email)}&username=${encodeURIComponent(userInfo.username)}`;
                const response = await axios.get(url);

                if (response.data && response.data.length > 0) {
                    setRecommendations(response.data);
                } else {
                    console.log('No recommendations found for the current user.');
                }
            } catch (error) {
                console.error("Failed to fetch recommendations:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchRecommendations();
    }, []);

    return (
        <div className="recommendations-page">
            <h1 className="title">All My Recommendations</h1>
            {isLoading ? (
                <p>Loading recommendations...</p>
            ) : (
                <div className="recommendations-container">
                    {recommendations.length > 0 ? (
                        recommendations.map((rec, index) => (
                            <Card key={index} className="recommendation-card">
                                <Card.Body>
                                    <Card.Title>Recommendation #{index + 1}</Card.Title>
                                    <Card.Text>
                                        <p>New Model: {rec.new_model}</p>
                                        <p>Benchmark: {rec.benchmark}</p>
                                        <p>Performance Increase: {rec.Increase}%</p>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        ))
                    ) : (
                        <p>No recommendations found.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default RecommendationsPage;