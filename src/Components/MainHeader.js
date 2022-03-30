import classes from './MainHeader.module.css';
import {NavLink} from 'react-router-dom';

function MainHeader(){
    return(
        <header className={classes.header}>
        <nav className={classes.navigation}>
        <ul className={classes['navigation-list']}>
        <li><NavLink activeClassName={classes.active} to={'/movies'} >Movies</NavLink></li>
        <li><NavLink activeClassName={classes.active} to={'/trending'}>Trending</NavLink></li>
           
        </ul>
    </nav>
    </header>
    );
};

export default MainHeader;