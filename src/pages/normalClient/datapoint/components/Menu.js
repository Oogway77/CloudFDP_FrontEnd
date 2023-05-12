import React, {Component} from 'react';

// images
import icon_edit from '../../../../assets/images/icon_edit.png';
import icon_minus from '../../../../assets/images/icon_minus.png';


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

        const { updateFDPStatus, deleteFDP, fdpData } = this.props;
        const { showMenu } = this.state;
        
        return (            
            <div className="main-container">
                <div className="main-menu">
                    <div id="menu" className={`extend ${showMenu ? 'active':''}`} onClick={() => this.setState({showMenu: !showMenu})}>
                        {
                            !showMenu ? <img src={icon_edit} alt="icon" /> : <img src={icon_minus} alt="icon" />
                        }
                    </div>
                    <div className={`panel none ${showMenu ? 'show':'hide'}`}>
                        <button className={fdpData.Status === 'Active' ? 'inactive' : 'active'} onClick={updateFDPStatus}> 
                            {
                                fdpData.Status === 'Active' ? 'Deactivate FAIR Data Point' : 'Activate FAIR Data Point'
                            }
                        </button>
                        <button onClick={deleteFDP}> Delete FAIR Data Point </button>
                    </div>
                </div>
            </div>
            
        );            
    }
}

export default Menu;
