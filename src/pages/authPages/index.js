import React, {Component} from 'react';
import {Route, Switch, Redirect} from "react-router-dom";
import { authpageroutes } from '../../route/routes';

// redux
import { connect } from 'react-redux';

// components
import Header1 from '../../components/Header1';

class AuthPages extends Component {    

    render() { 

        return (
            <div >
                <Header1 {...this.props}/>
                <Switch>
                    {			
                        authpageroutes.map((route, idx) => {
                            return route.component ? (
                                <Route
                                key={idx}
                                path={route.path}
                                exact={route.exact}
                                name={route.name}
                                render={(props) => (
                                    <route.component {...this.props} />
                                )} />
                            ) : (null);
                        })
                    }
                    <Redirect to={'/auth/sign_in'}/>
                </Switch>
            </div>
            
        );            
    }
}


const mapStateToProps = ({ auth }) => {
    const {
        isAuthenticated,
    } = auth;
    return {
        isAuthenticated,
    }
};


AuthPages = connect(mapStateToProps, null)(AuthPages)
export default AuthPages;
