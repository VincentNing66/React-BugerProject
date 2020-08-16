import React, { Fragment } from 'react';
import Button from '../../UI/Button/Button'
const OrderSummary = (props) => {
    const ingredientsSummary = Object.keys(props.ingredients).map(

        igKey => { return <li key={igKey}><span style={{ textTransform: 'capitalize' }}>{igKey}</span> : {props.ingredients[igKey]}</li> }
    )
    return (
        <Fragment>
            <h3>Your Order</h3>
            <p>Ingredients</p>
            <ul>
                {ingredientsSummary}
            </ul>
            <Button clicked={props.continue} btnType="Success" >CONTINUE</Button>
            <Button clicked={props.cancel} btnType="Danger">CANCEL</Button>
        </Fragment>
    );
}

export default OrderSummary;