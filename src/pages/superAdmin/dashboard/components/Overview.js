import React, {Component} from 'react';

// redux
import { connect } from 'react-redux';
import { getAllOrgList } from '../../../../redux/actions';

// components
import icon_graph from '../../../../assets/images/icon_graph.png';
import icon_circle_office from '../../../../assets/images/icon_circle_office.png';


class Overview extends Component {   
    constructor(props){
        super(props)
        this.state = {
            
        }
        
    } 

    componentDidMount() {
        this.props.getAllOrgList('', this.callVoid);
        
    }

    componentWillUnmount() {
        
    }

    callVoid = () => {

    }

    render() { 

        const { allOrgList } = this.props;

        return (
            <div className="main-container">     
                <div className="sub-container">
                    
                    <p className="title-main"> <img src={icon_graph} alt="icon" /> Overview</p>

                    <div className="info-item">
                        <img src={icon_circle_office} alt="icon" />
                        <p className="title-in"> Organizations </p>
                        <p className="data-num"> {allOrgList.list === undefined ? 0 : allOrgList.list.length} </p>
                    </div>

                </div>
            </div>            
        );            
    }
}


const mapStateToProps = ({ organization }) => {

    const {
        allOrgList,
    } = organization;

    return {
        allOrgList
    }
};

const mapDispatchToProps = { 
    getAllOrgList,
};


Overview = connect(mapStateToProps, mapDispatchToProps)(Overview)
export default Overview;
