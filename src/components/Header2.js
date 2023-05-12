import React, {Component} from 'react';

// redux
import { connect } from 'react-redux';
import { logout } from '../redux/actions';

// images
import logoImg from '../assets/images/logo_main.png';
import avatarImg from '../assets/images/avatar.jpg';


class Header1 extends Component {  
    
    constructor(props){
        super(props)
        this.state = {
            showProfile: false,
        }
        
    } 

    componentDidMount = () => {
        document.addEventListener('mouseup', this.mouseUp);
    }

    componentWillUnmount = () => {
        document.removeEventListener('mouseup', this.mouseUp);
    }

    mouseUp = (e) => {

        const { showProfile } = this.state;

        if (e.target.id === 'profile' && showProfile === true) {
            return ;
        }
        this.setState({
            showProfile: false,
        })
    }


    render() { 

        const { history, logout, clientInfo } = this.props;
        const { showProfile } = this.state;

        return (            
            <div className="header2">
                <div className="main-container">
                    <img className="logo" src={logoImg} alt="" />
                    <div className="profile">
                        <img id="profile" src={(clientInfo.avatar === undefined || clientInfo.avatar === null) ? avatarImg : clientInfo.avatar} alt="user" className={`photo ${showProfile ? 'active':''}`} onClick={() => this.setState({showProfile: !showProfile})}/>
                        
                            <div className={`panel none ${showProfile ? 'show':'hide'}`}>
                                {
                                    (clientInfo.role === 'Admin' || clientInfo.role === 'User') && 
                                    <button onClick={() => history.push('/editprofile')}>Edit profile</button>
                                }
                                <button className="out" onClick={logout}>Log out</button>
                            </div>
                    </div>
                </div>
            </div>
            
        );            
    }
}


const mapStateToProps = ({ auth }) => {
    const {
        isAuthenticated,
        clientInfo,
    } = auth;
    return {
        isAuthenticated,
        clientInfo,
    }
};

const mapDispatchToProps = { 
    logout,
 };


Header1 = connect(mapStateToProps, mapDispatchToProps)(Header1)
export default Header1;
