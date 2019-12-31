import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteGrade } from '../actions/gradeActions';

class GradeCard extends Component {
    static propTypes = {
        isAuthenticated: PropTypes.bool
    }

    onDeleteClick = (id) => {
        this.props.deleteGrade(id);
    }

    render() {
        const grade = this.props.grade;

        return(
            <div>
                <Link to={`/grade/${grade._id}`}>
                    {grade.name+" "+grade.shift}
                </Link>
                { this.props.isAuthenticated ?
                    <Button 
                        className="remove-btn"
                        style={{marginLeft: '1rem'}}
                        color="danger"
                        size="sm"
                        onClick={this.onDeleteClick.bind(this, grade._id)}
                    >
                        &times;
                    </Button> :
                    null
                }
            </div>
            
        )
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(
    mapStateToProps, 
    { deleteGrade }
)(GradeCard);