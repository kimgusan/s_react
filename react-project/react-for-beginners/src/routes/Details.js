import React from "react";
import Movie from "../components/Movie";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Detail() {
    const [loading, setLoading] = useState(true);
    const [movieData, setMovie] = useState("");
    const { id } = useParams();
    const getMovie = async () => {
        const json = await (await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)).json();
        setLoading(false);
        setMovie(json.data);
    };

    useEffect(() => {
        getMovie();
    }, []);
    console.log(movieData);
    return (
        <div>
            <h1>Detail Movie</h1>
            {loading ? (
                <h2>Loading...</h2>
            ) : (
                <div>
                    <h2>Movie Title, Movie poster, Movie summary and another?</h2>
                    <h3>{movieData.movie.title}</h3>
                    <h4>
                        <div>
                            <strong>type: </strong>
                            {movieData.movie.genres[0]}
                        </div>
                        <img src={movieData.movie.medium_cover_image} />
                        <p>{movieData.movie.description_intro}</p>
                    </h4>
                </div>
            )}
        </div>
    );
}
export default Detail;
