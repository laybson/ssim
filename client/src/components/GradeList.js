import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getGrades, deleteGrade } from '../actions/gradeActions';
import PropTypes from 'prop-types';

import GradeCard from './GradeCard';

class GradeList extends Component {
    static propTypes = {
        getGrades: PropTypes.func.isRequired,
        grade: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool
    }

    componentDidMount() {
        this.props.getGrades();
    }

    onDeleteClick = (id) => {
        this.props.deleteGrade(id);
    }

    render() {
        const { grades } = this.props.grade;
        return(
            <Container>
                <ListGroup>
                    <TransitionGroup className="grade-list">
                        {grades.map((i, {_id, name, shift}) => (
                            <CSSTransition key={i._id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                    <GradeCard 
                                        grade={ i }/>                                    
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
    grade: state.grade,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(
    mapStateToProps, 
    { getGrades, deleteGrade }
)(GradeList);