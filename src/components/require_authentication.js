import React, { Component } from 'react';
import {connect} from 'react-redux';

export default function(ComposedComponent){
    class Authentication extends Component {
        //defines this property on actual class, not its instance. eg. Authentication.contextTypes
        static contextTypes = {
            router: React.PropTypes.object
        }

        componentWillMount(){
            if (!this.props.authenticated){
                this.context.router.push('/');
            }
        }

        componentWillUpdate(nextProps){
            if (!nextProps.authenticated){
                this.context.router.push("/");
            }
        }

        render(){
            return <ComposedComponent {...this.props} />
        }
    }

    function mapStateToProps(state){
        return {authenticated: state.authenticated};
    }

    return connect(mapStateToProps)(Authentication);
}


// // when using this HOC
//
// import Authentication //this HOC
// import Resources //This is component I want to wrap
//
// const ComposedComponent = Authentication(Resources);
//
// //in render method
//
// <ComposedComponent resources={resourceList}/>