import classes from './MovieDetail.module.css';
import { useLocation, useHistory, useParams } from 'react-router-dom';

import movieContext from '../store.js';

import useFetchMovies from '../hooks/useFetchMovies';


const MovieDetail = (props) => {
    //const [movieDetail, setMovieDetail] = useState({ details: null, imageUrl: '' });
    let detailsUrl = '';
    let imageUrl = '';


    let params = useParams();
    let location = useLocation();
    let history = useHistory();
    let startingMovieDetail = location.state;

    console.log(params,location);
    if (location.state) {
        let movieId = location.state.movie_imdb_link.split('/')[4];
        detailsUrl = 'https://api.themoviedb.org/3/movie/' + movieId + '?&api_key=cfe422613b250f702980a3bbf9e90716';
    }else{
       if(props.movieList){
        let [movie] = props.movieList.filter(item=>{
            let name =  item.movie_title.toLowerCase().trim();
             if(params.movieName === name){
                return true;
             };
             return false;
         });
         startingMovieDetail = movie;
         let movieId = movie.movie_imdb_link.split('/')[4];
        detailsUrl = 'https://api.themoviedb.org/3/movie/' + movieId + '?&api_key=cfe422613b250f702980a3bbf9e90716';
       }
    };
    let val = useFetchMovies(detailsUrl ? [detailsUrl]: []);
    let movieDetail = '';
    //console.log(val);
    if(!val.isLoading && val.result[0].status === 'fulfilled'){
        movieDetail = val.result[0].value;
        imageUrl = val.result[0].imageUrl;
    };
    //console.log(startingMovieDetail,'PPPPPPPPPPPPPPPPPPPP',val);
    return (
        <>
            {!val.isLoading && <div className={classes['detail-container']}>
                <div className={classes['movie-image']} style={{ backgroundImage: `url(${imageUrl})` }}></div>
                <div className={classes['movie-info']}>
                    <div className={classes.country}>
                        <span>Country : </span>
                        <span>{startingMovieDetail.country}</span>
                    </div>
                    <div className={classes.title}>
                        <a target='_blank' href={startingMovieDetail.movie_imdb_link}>{startingMovieDetail.movie_title}</a>
                        <span>{startingMovieDetail.title_year}</span>
                    </div>
                    <div className={classes.details}>
                        <span>{startingMovieDetail.content_rating}</span>
                        <span>{startingMovieDetail.language}</span>
                        <span>{startingMovieDetail.genres.split('|').join(' ')}</span>
                    </div>
                    <div className={classes['director']}>
                        <span className={classes.post}>Director  </span>
                        <span>{startingMovieDetail.director_name}</span>
                    </div>
                    <div className={classes['director']}>
                        <span className={classes.post}>Cast  </span>
                        <span>{`${startingMovieDetail.actor_1_name}, ${startingMovieDetail.actor_2_name}`}</span>
                    </div>
                    <div className={classes['director']}>
                        <span className={classes.post}>Budget  </span>
                        <span>${(startingMovieDetail.budget) / 1000000} M</span>
                    </div>
                    <div className={classes.synop}>
                        {movieDetail.overview}
                    </div>
                </div>
            </div>}
            {val.isLoading && <p>....Loading</p>}
            
        </>
    );
};

export default MovieDetail;