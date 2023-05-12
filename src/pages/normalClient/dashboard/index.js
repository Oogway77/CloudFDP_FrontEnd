import React, {Component} from 'react';

// redux
import { connect } from 'react-redux';
import { getUserDashInfo } from '../../../redux/actions';

// components
import Header2 from '../../../components/Header2';
import Menu from './components/Menu';
import Info from './components/Info';
import FDpoint from './components/FDpoint';
import Users from './components/Users';
// import Invoices from './components/Invoices';


class Dashboard extends Component {   
    constructor(props){
        super(props)
        this.state = {

        }
        
    } 

    componentDidMount = () => {
        this.props.getUserDashInfo('', this.callVoid);
    }

    callVoid = () => {

    }

    render() { 

        return (            
            <div style={{paddingBottom: 70}}>
                <Header2 {...this.props}/>
                <Menu {...this.props}/>
                <Info {...this.props}/>    
                <FDpoint {...this.props}/> 
                <Users {...this.props}/>  
                {/* <Invoices />   */}
            </div>
            
        );            
    }
}



const mapStateToProps = ({ user }) => {

    const {
        userDashInfo,
    } = user;

    return {
        userDashInfo,
    }
};

const mapDispatchToProps = { 
    getUserDashInfo
};


Dashboard = connect(mapStateToProps, mapDispatchToProps)(Dashboard)
export default Dashboard;
