import React, { Component, Fragment } from 'react';

import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENT_COST = {
    salad: 0.6,
    bacon: 1.7,
    cheese: 0.4,
    meat: 2.2,
}
class BurgerBuilder extends Component {

    constructor(props) {

        super(props);
        this.state = {
            ingredients: {
                salad: 0,
                bacon: 0,
                cheese: 0,
                meat: 0,
            },
            totalPrice: 4,
            canBeOrdered: false,
            ordering: false

        }
    }
    orderHandler = () => {
        const ingredients = this.state.ingredients
        const sum = Object.keys(ingredients).map(
            igKey => {
                return ingredients[igKey]
            }
        ).reduce(
            (sum, el) => {
                return sum + el
            }, 0
        )
        this.setState({ canBeOrdered: sum > 0 })

    }
    addIngredientHandler = (type) => {
        this.setState((preState) => {
            const updatedIngredients = { ...preState.ingredients }
            updatedIngredients[type] = preState.ingredients[type] + 1
            return {
                ingredients: updatedIngredients,
                totalPrice: preState.totalPrice + INGREDIENT_COST[type]
            }

        }, this.orderHandler)

    }
    removeIngredientHandler = (type) => {
        if (this.state.ingredients[type] <= 0) {
            return {}
        }
        this.setState((preState) => {

            const updatedIngredients = { ...preState.ingredients }
            updatedIngredients[type] = preState.ingredients[type] - 1
            return {
                ingredients: updatedIngredients,
                totalPrice: preState.totalPrice - INGREDIENT_COST[type]
            }

        }, this.orderHandler)
    }
    orderBtnHandler = () => {
        this.setState({ ordering: true })
    }
    continueBtnHandler = () => {
        alert('Continue')
    }
    clearBurgerHandler = () => {
        this.setState({
            ingredients: {
                salad: 0,
                bacon: 0,
                cheese: 0,
                meat: 0,
            },
            totalPrice: 4,
            canBeOrdered: false
        })
    }
    render() {
        const disable = { ...this.state.ingredients }
        for (let key in disable) {
            disable[key] = disable[key] <= 0
        }
        return (
            <Fragment>
                <Modal show={this.state.ordering} modalClosed={() => this.setState({ ordering: false })}>
                    <OrderSummary ingredients={this.state.ingredients} continue={this.continueBtnHandler} cancel={() => this.setState({ ordering: false })} />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ordering={this.orderBtnHandler}
                    clear={this.clearBurgerHandler}
                    canBeOrdered={this.state.canBeOrdered}
                    order={this.orderHandler}
                    price={this.state.totalPrice}
                    removeClicked={this.removeIngredientHandler}
                    dis={disable}
                    addClicked={this.addIngredientHandler} />
            </Fragment>
        );
    }
}

export default BurgerBuilder;