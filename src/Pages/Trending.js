import classes from './Trending.module.css';
import movieContext from '../store';
import { Link } from 'react-router-dom';

import { useContext, useEffect, useState } from 'react';
import useFetchMovies from '../hooks/useFetchMovies';

let all = [];
let count = 0;

function Trending(){
    console.log('trending');
    count++;
    const movieCtx = useContext(movieContext);
    //console.log(movieCtx);
    const [trending,setTrending] = useState({
        urlArray:[],
        detailArray:[]
    });
    let movie_array = movieCtx.movie_list || [];
    
    let movieDetails = useFetchMovies(trending.urlArray);
    //console.log(count,'#$$$$',movieDetails,trending);
    let moviePosters = [];
    if(movieDetails.result){
        moviePosters = movieDetails.result.map((movie,index)=>{
            return <li key={index}>
                <figure className={classes.cardPhoto}>
                    { movie.value.original_title && <Link to={{
                    pathname: `/movies/${movie.value.original_title.toLowerCase()}`,
                    state: trending.detailArray[index]
                }}> <img   src =  {movie.imageUrl} alt ='movie-poster' className={classes.contain} /></Link>}
               
                </figure>
            </li>
        });
    };

    useEffect(()=>{
        //console.log('effect',movie_array.length);
        if(movie_array.length>0){
            let index_ar = [];
            let obj ={
                urlArray:[],
                detailArray:[]
            };
            while(index_ar.length<10){
                let index = Math.round(Math.random()*(movie_array.length - 1));
                let elem = movie_array[index]
                if(!index_ar.includes(index)){
                    index_ar.push(index);
                    let movieId = elem.movie_imdb_link.split('/')[4];
                    let extraDetailUrl = 'https://api.themoviedb.org/3/movie/' + movieId + '?&api_key=cfe422613b250f702980a3bbf9e90716';
                    obj.urlArray.push(extraDetailUrl);
                    obj.detailArray.push({...elem});
                };
            };
            all.push(obj.detailArray);
            setTrending(obj);
        };
    },[movie_array.length]);
    return (
        <div className={classes['trending-container']}>
            {movieDetails.result && <ul className={classes['trending-list']}>
                {moviePosters}
            </ul>}
            {!movieDetails.result && <p>...Loading</p>}
        </div>
    );
};


export default Trending;