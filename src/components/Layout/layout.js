import React, { Fragment, Component } from 'react';
import classes from './layout.module.css'
import ToolBar from '../Navigation/Toolbar/Toolbar'
import SideDraw from '../Navigation/SideDraw/SideDraw'

class Layout extends Component {
    state = {
        showSideDrawer: false
    }
    SideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false });
    }
    SideDrawerOpenedHandler = () => {
        this.setState({ showSideDrawer: true });
    }
    render() {
        return (
            <Fragment>
                <SideDraw open={this.state.showSideDrawer} closed={this.SideDrawerClosedHandler} />
                <ToolBar showSD={this.SideDrawerOpenedHandler} />
                <main className={classes.content}>
                    {this.props.children}
                </main>
            </Fragment>
        )
    }
}


export default Layout;