import React, { useEffect, useState } from 'react';
import axios from 'axios';
import getUserInfo from "../../utilities/decodeJwt";

const RecommendationsPage = () => {
    const [groupedRecommendations, setGroupedRecommendations] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchRecommendations = async () => {
            const userInfo = getUserInfo();
            if (!userInfo || !userInfo.username || !userInfo.email) {
                console.error("User info is missing. Unable to fetch recommendations.");
                setIsLoading(false);
                return;
            }

            const url = `${process.env.REACT_APP_BACKEND_URL}/pullAllRecommendations?email=${encodeURIComponent(userInfo.email)}&username=${encodeURIComponent(userInfo.username)}`;
            try {
                const response = await axios.get(url);
                if (response.data && response.data.length > 0) {
                    organizeDataByModel(response.data);
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

    const organizeDataByModel = (recommendations) => {
        const groups = {};
        recommendations.forEach(rec => {
            if (!groups[rec.model]) {
                groups[rec.model] = [];
            }
            groups[rec.model].push(rec);
        });
        setGroupedRecommendations(groups);
    };

    return (
        <div className="recommendations-page" style={{ color: 'white' }}>
            <h1 className="title">All My Recommendations</h1>
            {isLoading ? (
                <p>Loading recommendations...</p>
            ) : (
                Object.entries(groupedRecommendations).map(([model, recs], index) => (
                    <div key={index} className="model-group">
                        <h2>{model}</h2>
                        {recs.map((rec, idx) => (
                            <div key={idx} className="recommendation-detail">
                                <p>New Model: {rec.new_model}</p>
                                <p>Component Type: {rec.componentType}</p>
                                <p>Benchmark: {rec.benchmark}</p>
                                <p>Performance Increase: {rec.Increase}%</p>
                            </div>
                        ))}
                    </div>
                ))
            )}
        </div>
    );
};

export default RecommendationsPage;
