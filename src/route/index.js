import React, {Component} from "react";
import {Route, Switch, BrowserRouter, Redirect} from "react-router-dom";

// redux
import { connect } from 'react-redux';
import { isAuth, getUserProfile } from '../redux/actions';

// other function
import * as cookie  from '../common/cookie';
import * as types  from '../redux/constants';

// component
import { auth, superadminpageroutes, normalclientpageroutes } from './routes';
import Loading from '../components/Loading';
import ScrollToTop from '../components/ScrollToTop';

class Root extends Component {
	constructor(props){
        super(props)
        this.state = {            
            
        }
	}

	componentDidMount = async() => {
        
        let token = await cookie.getCookie(types.TOKEN);
        if (token !== null && token !== '' && token !== undefined) {
            await this.props.isAuth(true);
            await this.props.getUserProfile('', this.callVoid);
        } else {
            await this.props.isAuth(false);
        }
    }

    componentWillUnmount = () => {
        
    }

    callVoid = () => {

    }
	
	render() {
        
		const { isAuthenticated, ld_auth, clientInfo, ld_normal, ld_user1, ld_user2, ld_org1, ld_org2, ld_fdp } = this.props;

        if (isAuthenticated && clientInfo.role === undefined)
            return (<Loading />);

		return (
			<BrowserRouter>
                <ScrollToTop />
				<Switch>
                    {
                        !isAuthenticated &&
                        auth.map((route, idx) => {
							return route.component ? (
								<Route
								key={idx}
								path={route.path}
								exact={route.exact}
								name={route.name}
								render={props => (
									<route.component {...props} onGetStatus={this.onGetStatus}/>
								)} />
							) : (null);
						})
                    }

                    {
                        isAuthenticated && clientInfo.role !== undefined && clientInfo.role === 'SuperAdmin' &&		
						superadminpageroutes.map((route, idx) => {
							return route.component ? (
								<Route
								key={idx}
								path={route.path}
								exact={route.exact}
								name={route.name}
								render={props => (
									<route.component {...props}/>
								)} />
							) : (null);
						})
					}

                    {
                        isAuthenticated && clientInfo.role !== undefined && (clientInfo.role === 'Admin' || clientInfo.role === 'User') &&		
						normalclientpageroutes.map((route, idx) => {
							return route.component ? (
								<Route
								key={idx}
								path={route.path}
								exact={route.exact}
								name={route.name}
								render={props => (
									<route.component {...props}/>
								)} />
							) : (null);
						})
					}
                    {
                        !isAuthenticated &&
                        <Redirect to={'/auth'}/>
                    }
                    {
                        isAuthenticated &&
                        <Redirect to={'/dashboard'}/>
                    }
				</Switch>
				{
                    (ld_auth || ld_normal || ld_user1 || ld_user2 || ld_org1 || ld_org2 || ld_fdp) && <Loading />
                }
			</BrowserRouter>
		)
	}
}

const mapStateToProps = ({ auth, normal, user, organization, fdp }) => {
    const {
        ld_auth,
        isAuthenticated,
        clientInfo,
    } = auth;

    const {
        ld_normal, 
    } = normal;

    const {
        ld_user1, 
        ld_user2,
    } = user;

    const {
        ld_org1, 
        ld_org2,
    } = organization;

    const {
        ld_fdp
    } = fdp;

    return {
        ld_auth,
        isAuthenticated,
        clientInfo,
        ld_normal,
        ld_user1,
        ld_user2,
        ld_org1, 
        ld_org2,
        ld_fdp,
    }
};

const mapDispatchToProps = { 
    isAuth, getUserProfile,
};

Root = connect(mapStateToProps, mapDispatchToProps)(Root)
export default Root;
