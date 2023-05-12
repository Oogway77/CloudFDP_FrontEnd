import React, {Component} from 'react';

// redux
import { connect } from 'react-redux';

// images
import logoImg from '../assets/images/logo_main.png';
import icon_close_b from '../assets/images/icon_close_b.png';

class Header1 extends Component {  

    render() { 

        const { history, isAuthenticated } = this.props;

        return (            
            <div className="header1">
                <div className="main-container">
                    <img className="logo" src={logoImg} alt="" />
                    {
                        isAuthenticated &&
                        <div className="menu">
                            <div id="menu" className="extend" onClick={() => history.push('/dashboard')}>
                                <img src={icon_close_b} alt="icon" />
                            </div>
                        </div>
                    }
                </div>
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

Header1 = connect(mapStateToProps, null)(Header1)
export default Header1;
