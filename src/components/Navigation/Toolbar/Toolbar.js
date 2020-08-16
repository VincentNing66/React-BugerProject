import React from 'react';
import classes from './Toolbar.module.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'



const toolbar = (props) => {
    return (
        <header className={classes.Toolbar}>
            <div className={classes.menuBtn} onClick={props.showSD}>
                <div className={classes.btnLine} />
                <div className={classes.btnLine} />
                <div className={classes.btnLine} />
            </div>
            <div className={classes.Logo}>
                <Logo />
            </div>
            <nav className={classes.DesktopOnly}>
                <NavigationItems />
            </nav>
        </header>
    );
}

export default toolbar;