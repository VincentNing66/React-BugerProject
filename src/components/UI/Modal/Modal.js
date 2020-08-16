import React, { Fragment } from 'react';
import classes from './Modal.module.css'
import Backdrop from '../Backdrop/Backdrop'

const Modal = (props) => {
    const style = {
        transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
        opcuty: props.show ? '1' : '0'
    }
    return (
        <Fragment>
            <Backdrop show={props.show} clicked={props.modalClosed} />
            <div className={classes.Modal} style={style}>
                {props.children}
            </div>

        </Fragment>

    );
}

export default Modal;