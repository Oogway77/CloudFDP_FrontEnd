import React, {Component} from 'react';

// redux
import { connect } from 'react-redux';
import { logout } from '../../../../redux/actions';

// images
import icon_plus from '../../../../assets/images/icon_plus.png';
import icon_minus from '../../../../assets/images/icon_minus.png';
import icon_plus_s from '../../../../assets/images/icon_plus_s.png';


class Menu extends Component {  
    
    constructor(props){
        super(props)
        this.state = {
            showMenu: false,
        }        
    } 

    componentDidMount = () => {
        document.addEventListener('mouseup', this.mouseUp);
    }

    componentWillUnmount = () => {
        document.removeEventListener('mouseup', this.mouseUp);
    }

    mouseUp = (e) => {

        const { showMenu } = this.state;

        if (e.target.id === 'menu' && showMenu === true) {
            return ;
        }
        this.setState({
            showMenu: false,
        })
    }


    render() { 

        const { history } = this.props;
        const { showMenu } = this.state;
        
        return (            
            <div className="main-container">
                <div className="main-menu">
                    <div id="menu" className={`extend ${showMenu ? 'active':''}`} onClick={() => this.setState({showMenu: !showMenu})}>
                        {
                            !showMenu ? <img src={icon_plus} alt="icon" /> : <img src={icon_minus} alt="icon" />
                        }
                    </div>
                    <div className={`panel none ${showMenu ? 'show':'hide'}`}>
                        <button className="active" onClick={() => history.push('/newdatapoint')}><img src={icon_plus_s} alt="icon" />New FAIR Data Point</button>
                        <button onClick={() => history.push('/invitenewuser')}>Invite a new user</button>
                        <button onClick={() => history.push('/editorganization')}>Edit organization</button>
                    </div>
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

const mapDispatchToProps = { 
    logout,
 };


Menu = connect(mapStateToProps, mapDispatchToProps)(Menu)
export default Menu;
