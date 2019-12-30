import React, { Component } from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteStudent } from '../actions/studentActions';

class StudentCard extends Component {
    static propTypes = {
        isAuthenticated: PropTypes.bool
    }

    onDeleteClick = (id) => {
        this.props.deleteStudent(id);
    }

    render() {
        const student = this.props.student;

        return(
            <div>
                { student.name }
                { this.props.isAuthenticated ?
                    <Button 
                        className="remove-btn"
                        style={{marginLeft: '1rem'}}
                        color="danger"
                        size="sm"
                        onClick={this.onDeleteClick.bind(this, student._id)}
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
    { deleteStudent }
)(StudentCard);