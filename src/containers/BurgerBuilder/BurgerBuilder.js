import React, { Component, Fragment } from 'react';

import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/ErrorHandler/withErrorHandler'

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
            ingredients: null,
            totalPrice: 4,
            canBeOrdered: false,
            ordering: false,
            isLoading: false

        }
    }
    componentDidMount() {
        axios.get('https://burgerbuilder-9a993.firebaseio.com/ingredients.json')
            .then(response => this.setState({ ingredients: response.data }))
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
        this.setState({ isLoading: true });
        //alert('Continue')
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.price,
            customer: {
                name: "Vincent",
                email: ""
            },

            deliverMethod: 'fastest'
        }
        axios.post('/orders.json', order)
            .then(response => this.setState({ isLoading: false, ordering: false }))
            .catch(error => this.setState({ isLoading: false, ordering: false }))



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

        let orderSummary = null
        if (this.state.ingredients)
            orderSummary = <OrderSummary ingredients={this.state.ingredients} continue={this.continueBtnHandler} cancel={() => this.setState({ ordering: false })} />

        if (this.state.isLoading)
            orderSummary = <Spinner />

        let burger = <Spinner />
        if (this.state.ingredients)
            burger = (<Fragment>
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
            </Fragment>)
        return (
            <Fragment>
                <Modal show={this.state.ordering} modalClosed={() => this.setState({ ordering: false })}>
                    {orderSummary}
                </Modal>
                {burger}
            </Fragment>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);