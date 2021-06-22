import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as actions from '../../actions';
import { connect } from 'react-redux';


class SurveyDeleteReview extends Component{

    render(){
        console.log(this.props.location.state);
        
        const { yes, no, body, dateSent, subject, title, _id } = this.props.location.state;
        const s_id = { id: _id };
        return(
            <div>
                <h5>Are you sure you want to delete this survey?</h5>
                <div align="center">
                    <label>Survey Title</label>
                    <div>
                        {title}
                    </div>
                    <label>Survey Subject</label>
                    <div>
                        {subject}
                    </div>
                    <label>Survey Body</label>
                    <div>
                        {body}
                    </div>
                    <div>
                        <label>yes: </label> {yes}
                    </div>
                    <div>
                        <label>no: </label> {no}
                    </div>
                    <label>Date Sent</label>
                    <div>
                        {new Date(dateSent).toLocaleDateString()}
                    </div>
                </div>
                <Link to="/surveys" className="yellow darken-3 btn-flat white-text" >
                    Back
                </Link>
                <button 
                    onClick={() => this.props.deleteSurvey(s_id, this.props.history)}
                    className="red btn-flat right white-text" 
                >
                    <i className="material-icons right">delete</i>
                    Delete
                </button>
                
            </div> 
            
        );
    }
}
export default connect(null, actions)(SurveyDeleteReview); 