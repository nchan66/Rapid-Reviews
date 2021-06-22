import React from 'react';
import { Link } from 'react-router-dom';
import SurveyList from './surveys/SurveyList';
import { connect } from 'react-redux';
import Dropdown from './Dropdown';


const Dashboard = (cur_user) => {
    let num_credits = 0;

    const message = () => {
        return (
            alert("Need to add more credits to create new survey!")
        );
    }

    function checkCredits(cur_user){
        if (cur_user.cur_user == null){
            console.log('user not found');
            return;
        } 
        console.log('user found');
        num_credits = cur_user.cur_user.credits;
        if (num_credits > 0){
            return (
                <div className="fixed-action-btn">
                    <Link to='/survey/new' className="btn-floating btn-large red">
                        <i className="material-icons">add</i>
                    </Link>
                </div>
            );
        } else {
            return (
                <div className="fixed-action-btn">
                    <button onClick={message} className="btn-floating btn-large grey">
                        <i className="material-icons">add</i>
                    </button>
                </div>
            );
        }
        
    }


    return (
        <div>
            <div> sorting in progress ...
                <Dropdown/>
            </div>
            <SurveyList/>
            {checkCredits(cur_user)}
            
        </div>
    );
    
};

function mapStateToProps({ auth }){
    return { cur_user: auth };
}

export default connect(mapStateToProps)(Dashboard);