import React, { Fragment } from 'react';
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import classes from './SideDraw.module.css'
import Backdrop from '../../UI/Backdrop/Backdrop';

const SideDraw = (props) => {
    let attachedClasses = props.open ? [classes.SideDraw, classes.Open] : [classes.SideDraw, classes.Close]
    return (
        <Fragment>
            <Backdrop show={props.open} clicked={props.closed} />
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>

                <NavigationItems />
            </div>

        </Fragment>
    );
}

export default SideDraw;