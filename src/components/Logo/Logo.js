import React from 'react';
import burgerLogo from '../../assets/img/burger-logo.png'
import classes from './Logo.module.css'

const Logo = () => {

    return (
        <div className={classes.Logo}>
            <img className={classes.img} alt="burger-logo" src={burgerLogo} />

        </div>
    );
}

export default Logo;