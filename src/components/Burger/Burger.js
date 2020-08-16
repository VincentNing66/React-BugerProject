import React from 'react';
import BurgerIngredients from './BurgerIngredient/BurgerIngredient';
import classes from './Buger.module.css'

const Burger = (props) => {

    let tranformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, index) => {
                return <BurgerIngredients key={igKey + index} type={igKey} />
            })
        })
        .reduce((arr, el) => {
            return arr.concat(el)
        }, []);
    if (tranformedIngredients.length === 0) {
        tranformedIngredients = <p> Please Start Adding Ingredients</p >
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredients type="bread-top" />
            {tranformedIngredients}
            <BurgerIngredients type="bread-bottom" />
        </div>
    );
}


export default Burger;