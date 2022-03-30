import classes from './Movies.module.css';
import { useContext, useState, useEffect } from 'react';
import MovieContext from '../store';

import { Route, Switch, Link, useRouteMatch } from 'react-router-dom';

import range from 'lodash.range';
import MovieDetail from './MovieDetail';
import FilterDropDown from '../Components/FilterDropDown';

import DisplayMovieList from '../Components/DisplayMovieList';
import Pagination from '../Components/Pagination';

function Movies() {
    console.log('movies');
    const { path, url } = useRouteMatch();
    //console.log(path, url);
    const [display, setDisplay] = useState({
        search: false,
        searchString: null,
    });
    const [filterValue, setFilterValue] = useState('movie_title');
    let pageSize = 10;//useState in future if want to take user input for items/page
    const [currentPage, setCurrentPage] = useState(1);
    let isListAvailable = false;
    let paginationProps = {};

    //const [listToDisplay, setListToDisplay] = useState('');
    let listToDisplay = null;
    const movieCtx = useContext(MovieContext);
    if (movieCtx.movie_list) {
        isListAvailable = true;
        let pageStartIndex = ((currentPage - 1) * pageSize);
        let totalCount = 0;
        if (!display.search) {
            listToDisplay = movieCtx.movie_list.slice(pageStartIndex, pageStartIndex + pageSize);
            //console.log('nosearch',listToDisplay.length,listToDisplay,pageStartIndex,pageStartIndex+pageSize);
            totalCount = movieCtx.movie_list.length;
        } else {
            let filteredList = movieCtx.movie_list.filter(movie => movie[filterValue].trim().toLowerCase().includes(display.searchString));
            filteredList.sort((a,b)=>{
                const nameA = a.movie_title.toLowerCase();
                const nameB = b.movie_title.toLowerCase();
                return nameA < nameB ? -1 : 1;
            });
            listToDisplay = filteredList.slice(pageStartIndex, pageStartIndex + pageSize);
            //console.log(display.searchString,filteredList,currentPage);
            totalCount = filteredList.length;
        };
        paginationProps = {
            currentPage,
            onPageChange: changePageHandler,
            totalCount: totalCount,
            pageSize: pageSize,
            siblingsCount: 1
        };

    };

    function changePageHandler(val) {
        //console.log('change');
        setCurrentPage(val);
    };
    function movieFilterHandler(evt) {
        let searchString = evt.target.value.trim().toLowerCase();
        setDisplay(prev => {
            let obj = { ...prev };
            if (searchString.length > 0) {
                obj.search = true;
                obj.searchString = searchString;
            } else {
                obj.search = false;
                obj.searchString = null;
            };
            return obj;

        });
        setCurrentPage(1);
    };


    function clearSearchHandler(evt) {
        evt.preventDefault();
        if (display.search) {
            document.getElementById('movieFilter').value = '';

            setDisplay(prev => {
                let obj = { ...prev };
                obj.search = false;
                obj.searchString = null;
                return obj;

            });
            setCurrentPage(1);
        };

    };
    // useEffect(()=>{
    //     return ()=>{
    //         console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@222');
    //     };
    // },[]);

    return (
        <>
            <Switch>
                <Route exact path={'/movies'}>

                    <div className={classes.container}>
                        <form className={classes.searchMovies}>
                            <input placeholder='search' onChange={movieFilterHandler} id="movieFilter" />
                            <button onClick={clearSearchHandler}>Clear</button>
                            <FilterDropDown value={filterValue} setFilterValue={setFilterValue} />
                        </form>
                        {isListAvailable && <>

                            <DisplayMovieList movieList={listToDisplay} />
                            <Pagination pagination={paginationProps} />
                        </>}
                        {!isListAvailable && <p>...Loading</p>}

                    </div>
                </Route>
                <Route path={`/movies/:movieName`}>
                <MovieDetail movieList={movieCtx.movie_list}/>
                </Route>
            </Switch>
        </>
    );
};


export default Movies;