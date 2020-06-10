import React, { Component } from "react";

class withErrorHandler extends Component {
    constructor(props) {
        super(props);
        this.state = { errorOccurred: false }
    }

    componentDidCatch(error, info) {
        this.setState({ errorOccurred: true });
    }

    render() {
        return this.state.errorOccurred ? <h2>Whoops, er is iets mis gegaan!</h2> : this.props.children
    }
}

export default withErrorHandler;