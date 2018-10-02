import React, {Component} from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props)
        this.state = {hasError: false, errorMessage: this.props.message}
    }

    componentDidCatch(error, info) {
        this.setState({hasError: true})
    }

    render() {
        if (this.state.hasError) {
            return <h3>{this.state.errorMessage}</h3>
        }
        return this.props.children
    }
}

export default ErrorBoundary