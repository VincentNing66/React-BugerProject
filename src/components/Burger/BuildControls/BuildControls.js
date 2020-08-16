import React from 'react';
import classes from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl'
import btnClasses from './button-code.module.css'

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Meat', type: 'meat' },
    { label: 'Cheese', type: 'cheese' },
]
const buildControls = (props) => {
    return (
        <div className={classes.BuildControls}>
            <h2>Current Price : <strong>{props.price.toFixed(2)}</strong></h2>

            {
                controls.map(c => (

                    <BuildControl remove={() => { props.removeClicked(c.type) }} disabled={props.dis[c.type]} key={c.label} add={() => props.addClicked(c.type)} label={c.label} />

                ))
            }
            <div className={btnClasses.btnDiv}>
                <button className={btnClasses.Button} onClick={props.clear} disabled={!props.canBeOrdered}>Clear Burger</button>
                <button className={btnClasses.Button} onClick={props.ordering} disabled={!props.canBeOrdered}>Order Now</button>
            </div>


        </div>
    );
}

export default buildControls;