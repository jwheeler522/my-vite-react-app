import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Posts.css";

const Posts = () => {
    const [dogs, setDogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        fetchDogs();
    }, []);

    const fetchDogs = async () => {
        try {
            const response = await axios.get("https://dog.ceo/api/breeds/image/random/5");
            setDogs(response.data.message);
        } catch (error) {
            console.error("Error fetching dogs:", error);
        } finally {
            setLoading(false);
        }
    };

    const nextDog = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % dogs.length);
    };

    const prevDog = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + dogs.length) % dogs.length);
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="card text-center shadow-lg">
            <img src={dogs[currentIndex]} alt="Dog" className="card-img-top rounded" />
            <div className="card-body">
                {/* <h5 className="card-title">Cute Doggo!</h5> */}
                <button className="btn btn-gradient" onClick={fetchDogs}>Refresh</button>
                <div className="mt-3">
                    <button className="btn btn-outline-light" onClick={prevDog}>Previous</button>
                    <button className="btn btn-outline-light" onClick={nextDog}>Next</button>
                </div>
            </div>
        </div>
    );
};

export default Posts;
