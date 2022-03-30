import { useState } from 'react';
import classes from './FilterDropDown.module.css';


function FilterDropDown(props){

    function handleChange(event){
        props.setFilterValue(event.target.value);
    }
    return(
        <div className={classes.dropdown}>
            <label>
                Filter by&nbsp;&nbsp;:&nbsp;&nbsp;
            </label>
            <select value={props.value}  onChange={handleChange}>
                <option value="movie_title">Movie Name</option>
                <option value="title_year">Year</option>
                <option value="genres">Genre</option>
                <option value="director_name">Director</option>
                <option value="language">Language</option>
            </select>
        </div>
    );
};

export default FilterDropDown;