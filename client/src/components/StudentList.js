import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Box } from '@material-ui/core';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getGradeStudents, deleteStudent } from '../actions/studentActions';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import StudentCard from './StudentCard';

const styles = theme => ({
    root: {
        paddingTop: '.5rem',
        paddingRight: '1rem',
        paddingBottom: '.5rem',
        paddingLeft: '1rem'
    },    
});

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
        const students = this.props.student.students.sort((a,b) => {
            return ('' + a.name).localeCompare(b.name);
        })
        const { classes } = this.props;

        return(
            <Box>
                <ListGroup>
                    <TransitionGroup className="grade-list">
                        {students.map((i) => (
                            <CSSTransition key={i._id} timeout={500} classNames="fade">
                                <ListGroupItem className={ classes.root }>
                                    <StudentCard
                                        student={ i } />                                  
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                        </TransitionGroup>
                </ListGroup>
            </Box>
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
)(withStyles(styles)(StudentList));