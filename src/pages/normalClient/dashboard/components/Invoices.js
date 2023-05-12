import React, {Component} from 'react';

// redux
import { connect } from 'react-redux';

// components
import icon_invoice from '../../../../assets/images/icon_invoice.png';
import icon_check from '../../../../assets/images/icon_check.png';
import icon_hourglass from '../../../../assets/images/icon_hourglass.png';
import icon_close from '../../../../assets/images/icon_close.png';
import icon_link from '../../../../assets/images/icon_link.png';
import icon_menu_more from '../../../../assets/images/icon_menu_more.png';
import icon_menu_less from '../../../../assets/images/icon_menu_less.png';

const JsonData = {
    boardfreeList: {
        lists: [
            {
                id: 1,
                name: 'Wouter Franke',
                email: 'wfranke@thesis.nl',
                role: 'Admin',
                status: 'Active',
                created: '01-01-21',
            },
            {
                id: 2,
                name: 'Johan Ebbers',
                email: 'wjebbers@thesis.nl',
                role: 'User',
                status: 'Invited',
                created: '01-01-21',
            },
            {
                id: 3,
                name: 'Peter Everloo',
                email: 'peverloo@thesis.nl',
                role: 'User',
                status: 'Inactive',
                created: '01-01-21',
            },
        ]
    }
}

class Invoices extends Component {   
    constructor(props){
        super(props)
        this.state = {
            
        }
        
    } 

    componentDidMount = () => {
        document.addEventListener('mouseup', this.mouseUp);
    }

    componentWillUnmount = () => {
        document.removeEventListener('mouseup', this.mouseUp);
    }

    mouseUp = (e) => {

        if (this.state[e.target.id] === true) {
            return ;
        }

        for (let i = 0; i < JsonData.boardfreeList.lists.length; i++) 
            this.setState({['invoice_'+JsonData.boardfreeList.lists[i].id]: false});

    }

    render() { 

        const { history } = this.props;

        return (
            <div className="main-container">    
                <div className="divider"> </div> 
                <div className="sub-container">
                    
                    <p className="title-main"> <img src={icon_invoice} alt="icon" /> Invoices </p>

                    <div className="table-rect">
                        <table className="tb-normal">
                            <colgroup>
                                <col width="450" />
                                <col width="200" />
                                <col width="200" />
                                <col width="200" />
                                <col width="50px" />
                            </colgroup>
                            <tbody>
                                <tr >
                                    <th >Inovice</th>
                                    <th >Billing period</th>
                                    <th >Status</th>
                                    <th >Billed on</th>
                                    <th ></th>
                                </tr>
                            {
                                JsonData.boardfreeList.lists !== undefined && JsonData.boardfreeList.lists
                                .map((item, key) => {
                                    return (
                                        <tr key={'bulletin_' + item.id} >
                                            <td > <img src={icon_link} alt="icon" /> <span className="link">{item.email}</span></td>
                                            <td > {item.role} </td>
                                            <td > 
                                                {
                                                    item.status === 'Active' && <img className="icon" src={icon_check} alt="icon" /> 
                                                }
                                                {
                                                    item.status === 'Invited' && <img className="icon" src={icon_hourglass} alt="icon" /> 
                                                }
                                                {
                                                    item.status === 'Inactive' && <img className="icon" src={icon_close} alt="icon" /> 
                                                }
                                                
                                                {item.status} 
                                            </td>
                                            <td > {item.created} </td>
                                            <td > 
                                                <div className="more-menu">
                                                    <div className="oneDepth">
                                                        {
                                                            this.state['invoice_'+item.id] === undefined || !this.state['invoice_'+item.id] ?
                                                                <img id={'invoice_'+item.id} className="btn" src={icon_menu_more} alt="icon" onClick={() => this.setState({['invoice_'+item.id]: true})}/> 
                                                            :
                                                                <img id={'invoice_'+item.id} className="btn" src={icon_menu_less} alt="icon" onClick={() => this.setState({['invoice_'+item.id]: false})}/> 
                                                        }
                                                    </div>
                                                    <div className={`panel none ${this.state['invoice_'+item.id] === undefined || !this.state['invoice_'+item.id] ? 'hide':'show'}`}>
                                                        <button onClick={() => history.push('/')}>Download PDF</button>
                                                        <button onClick={() => history.push('/')}>Download CSV</button>
                                                    </div>
                                                </div>       
                                            </td>
                                        </tr>  
                                    );
                                })
                            }
                            
                            </tbody>
                        </table> 
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


Invoices = connect(mapStateToProps, null)(Invoices)
export default Invoices;
