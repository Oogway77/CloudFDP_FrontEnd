import React, {Component} from 'react';

// components
import Header2 from '../../../components/Header2';
import Menu from './components/Menu';
import General from './components/General';
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

    render() { 

        return (            
            <div >
                <Header2 {...this.props}/>
                <Menu {...this.props}/>
                <Info {...this.props}/>    
                <General {...this.props}/>
                <FDpoint {...this.props}/> 
                <Users {...this.props}/>  
                {/* <Invoices />   */}
            </div>
            
        );            
    }
}

export default Dashboard;
