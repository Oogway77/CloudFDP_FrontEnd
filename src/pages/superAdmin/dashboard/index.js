import React, {Component} from 'react';

// components
import Header2 from '../../../components/Header2';
import Overview from './components/Overview';
import Organizations from './components/Organizations';


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
                <Overview />                 
                <Organizations {...this.props}/> 
            </div>
            
        );            
    }
}

export default Dashboard;
