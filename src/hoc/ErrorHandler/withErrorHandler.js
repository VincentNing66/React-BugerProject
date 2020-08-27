import React, { Fragment, Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }
        componentDidMount() {
            this.reqinterceptors = axios.interceptors.response.use(req => {
                this.setState({ error: null })
                return req
            })
            this.reqinterceptors = axios.interceptors.response.use(res => res, error => {
                this.setState({ error: error })
            })
        }
        //WARNING! To be deprecated in React v17. Use componentDidUpdate instead.
        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqinterceptors)
            axios.interceptors.response.eject(this.reqinterceptors)
        }
        errorConfirmHandler = () => {
            this.setState({ error: null })
        }
        render() {

            return (
                <Fragment>
                    <Modal show={this.state.error} modalClosed={this.errorConfirmHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Fragment>
            )
        }
    }
}

export default withErrorHandler;