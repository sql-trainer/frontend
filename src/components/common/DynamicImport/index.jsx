import React, { Component } from 'react';
import Loader from '../Loader';

class DynamicImport extends Component {
    state = {
        Component: null,
        isLoaderVisible: true,
    };

    componentDidMount() {
        this.props.load().then(Component => {
            this.setState(() => ({
                Component: Component.default ? Component.default : Component,
                isLoaderVisible: false,
            }));
        });
    }

    render() {
        const { Component, isLoaderVisible } = this.state;
        const { importKey } = this.props;

        console.log(Component);

        return (
            <>
                <Loader isLogoVisible isLoaderVisible={isLoaderVisible} importKey={importKey} />
                {Component && <Component />}
            </>
        );
    }
}

export default DynamicImport;
