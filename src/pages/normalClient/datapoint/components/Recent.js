import React, {Component} from 'react';

// redux
import { connect } from 'react-redux';
import { getFDPRecentList } from '../../../../redux/actions';

// other function
import * as funcs from '../../../../common/functions';

// components
import queryString from 'query-string';

// images
import icon_arrow_left from '../../../../assets/images/icon_arrow_left.png';
import icon_arrow_right from '../../../../assets/images/icon_arrow_right.png';


class Recent extends Component {   
    constructor(props){
        super(props)
        this.state = {
            selID: 0,
        }

        this.page = 0;
        this.rowsPerPage = 10;
        
    } 

    componentDidMount = async() => {
        const { search } = this.props.location;        
        if(search !== ""){
            let params = queryString.parse(search);
            if (params.request1 !== undefined) {
                await this.setState({selID: params.request1});
                this.getFDPRecentList();
                return ;
            }
        }
    }

    getFDPRecentList = () => {

        let data = JSON.stringify({
            "Id": this.state.selID,
            "PageNo": this.page + 1,
            "PageSize": this.rowsPerPage
        });

        this.props.getFDPRecentList(data, () => this.setState({sendFlag: true}));
    }

    onBackPage = async() => {

        if (this.page === 0) return;

        this.page = this.page > 0 ? this.page - 1: this.page;

        this.getFDPRecentList();
    }

    onNextPage = async() => {

        const { fdpRecentList } = this.props;

        if (fdpRecentList.totalRowCount / this.rowsPerPage <= this.page + 1) return;

        let allPage = fdpRecentList.totalRowCount % this.rowsPerPage === 0 ? fdpRecentList.totalRowCount / this.rowsPerPage - 1: Math.floor(fdpRecentList.totalRowCount / this.rowsPerPage);
        
        this.page = this.page  < allPage ? this.page + 1: this.page;

        this.getFDPRecentList();
    }

    render() { 

        const { fdpRecentList } = this.props;

        return (
            <div className="main-container">    
                <div className="divider"> </div> 
                <div className="sub-container">
                    
                    <p className="title-main"> Recent activities </p>

                    <div className="table-rect">
                        <table className="tb-normal">
                            <colgroup>
                                <col width="60%" />
                                <col width="20%" />
                                <col width="20%" />
                            </colgroup>
                            <tbody>
                                <tr >
                                    <th >Event type</th>
                                    <th >Retrieved by</th>
                                    <th >Timestamp</th>
                                </tr>
                            {
                                fdpRecentList.list !== undefined && fdpRecentList.list
                                .map((item, key) => {
                                    return (
                                        <tr key={'act_' + key} >
                                            <td > {item.Activity} </td>
                                            <td > {item.Username} </td>
                                            <td > {funcs.getLocalDateTime(item.createdAt)} </td>
                                        </tr>  
                                    );
                                })
                            }
                            {
                                fdpRecentList.totalRowCount !== undefined &&
                                <tr >
                                    <td className="page-txt"> Showing {this.page * this.rowsPerPage + 1} to {this.page * this.rowsPerPage + this.rowsPerPage > fdpRecentList.totalRowCount ? fdpRecentList.totalRowCount : this.page * this.rowsPerPage + this.rowsPerPage} of {fdpRecentList.totalRowCount} entries </td>
                                    <td colSpan={2}> 
                                        <div className="btn-group">
                                            <button className={ fdpRecentList.totalRowCount / this.rowsPerPage <= this.page + 1 ? "disable" : ""}onClick={this.onNextPage}> Next {this.rowsPerPage} <img src={icon_arrow_right} alt="icon" /> </button>
                                            <button className={this.page === 0 ? "disable" : ""} onClick={this.onBackPage}> <img src={icon_arrow_left} alt="icon" /> Previous {this.rowsPerPage} </button>
                                        </div>
                                    </td>
                                </tr>  
                            }
                            
                            </tbody>
                        </table> 
                    </div>

                </div>
            </div>
        );            
    }
}


const mapStateToProps = ({ fdp }) => {
    const {
        fdpRecentList,
    } = fdp;
    return {
        fdpRecentList,
    }
};

const mapDispatchToProps = { 
    getFDPRecentList
 };

Recent = connect(mapStateToProps, mapDispatchToProps)(Recent)
export default Recent;
