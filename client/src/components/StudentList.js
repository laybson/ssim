import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getGradeStudents, deleteStudent } from '../actions/studentActions';
import PropTypes from 'prop-types';
import StudentCard from './StudentCard';

class StudentList extends Component {
    static propTypes = {
        getGradeStudents: PropTypes.func.isRequired,
        grade: PropTypes.object.isRequired,
        student: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool
    }

    componentDidMount = () => {        
        if(this.props.grade.id) {
            this.props.getGradeStudents(this.props.grade.id);
        }
    }

    onDeleteClick = (id) => {
        this.props.deleteStudent(id);
    }

    render() {
        const students = this.props.student.students;        

        return(
            <Container>
                <ListGroup>
                    <TransitionGroup className="grade-list">
                        {students.map((i) => (
                            <CSSTransition key={i._id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                <StudentCard
                                    student={ i } />                                  
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                        </TransitionGroup>
                </ListGroup>
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    student: state.student,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(
    mapStateToProps, 
    { getGradeStudents, deleteStudent }
)(StudentList);