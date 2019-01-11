import React, { Component } from 'react';
import { connect } from 'react-redux';


class Dashboard extends Component {
    constructor(props){
        super(props);
        /* this.state = {
            loggedUser: {}
        }
        store.subscribe(()=>{
            this.setState({
                loggedUser: store.getState().login
            });
        }) */
    }
    render(){
        const { loggedUser } = this.props;
        return(
            <div className="well">
                <h2>Dashboard</h2>
                <h5>Welcome, { loggedUser.username }</h5>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return { loggedUser : state.login};
}
export default connect(mapStateToProps)(Dashboard)