import classes from './DisplayMovieList.module.css';
import { Link } from 'react-router-dom';

const DisplayMovieList = (props)=>{
    const list = props.movieList;
    const movieList = list.map((item,index)=>{
        return <tr key={index} className={classes['body-row']}>
            <td><Link to={{
                pathname: `/movies/${item.movie_title.toLowerCase()}`,
                state: item
            }}>{item.movie_title}</Link></td>
            <td>{item.director_name}</td>
            <td>{item.title_year}</td>
            <td>{item.language}</td>
            <td>{item.genres}</td>
        </tr>
    })
    return(
        <>
            <table className={classes['table-container']}>
            <thead>
                <tr>
                    <th>Movie</th>
                    <th>Director</th>
                    <th>Year</th>
                    <th>Language</th>
                    <th>Genres</th>
                </tr>             
            </thead>
            <tbody>
                {movieList}
            </tbody>
            </table>
        </>
    );
};

export default DisplayMovieList;