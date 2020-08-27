import React, { Fragment, Component } from 'react';
import Button from '../../UI/Button/Button'
class OrderSummary extends Component {
    componentDidUpdate() {
        console.log('update')
    }
    render() {
        const ingredientsSummary = Object.keys(this.props.ingredients).map(

            igKey => { return <li key={igKey}><span style={{ textTransform: 'capitalize' }}>{igKey}</span> : {this.props.ingredients[igKey]}</li> }
        )

        return (
            <Fragment>
                <h3>Your Order</h3>
                <p>Ingredients</p>
                <ul>
                    {ingredientsSummary}
                </ul>
                <Button clicked={this.props.continue} btnType="Success" >CONTINUE</Button>
                <Button clicked={this.props.cancel} btnType="Danger">CANCEL</Button>
            </Fragment>
        );
    }

}

export default OrderSummary;