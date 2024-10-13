import Movie from "../components/Movie";
import { useState, useEffect } from "react";
import styles from "./Home.module.css";

function Home() {
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);
    const getMovies = async () => {
        const json = await (await fetch("https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year")).json();
        setMovies(json.data.movies);
        setLoading(false);
    };

    useEffect(() => {
        getMovies();
    }, []);
    return (
        <div className={styles.container}>
            {loading ? (
                <div className={styles.loader}>
                    <h1>Loading...</h1>
                </div>
            ) : (
                <div className={styles.movies}>
                    {movies.map((movie) => (
                        <Movie key={movie.id} id={movie.id} title={movie.title} coverImg={movie.medium_cover_image} summary={movie.summary} genres={movie.genres} yaer={movie.year} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Home;
