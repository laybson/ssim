import React, { Component } from 'react';
import { Button, Container } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteStudent } from '../actions/studentActions';
import StudentModal from './StudentModal';

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
                    <Container>
                        <StudentModal 
                            student={ student }
                            receiving= { true }/>
                        <StudentModal 
                            student={ student }
                            returning= { true }/>
                        <Button 
                            className="remove-btn"
                            style={{marginLeft: '1rem'}}
                            color="danger"
                            size="sm"
                            onClick={this.onDeleteClick.bind(this, student._id)}
                        >
                            &times;
                        </Button> 
                    </Container> :
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