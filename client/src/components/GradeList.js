import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getGrades, deleteGrade } from '../actions/gradeActions';
import PropTypes from 'prop-types';

class GradeList extends Component {
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
                        {grades.map(({_id, name, shift}) => (
                            <CSSTransition key={_id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                    <Button 
                                        className="remove-btn"
                                        color="danger"
                                        size="sm"
                                        onClick={this.onDeleteClick.bind(this, _id)}
                                    >
                                        &times;
                                    </Button>
                                    {name+" "+shift}
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        )
    }
}

GradeList.propTypes = {
    getGrades: PropTypes.func.isRequired,
    grade: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    grade: state.grade
})

export default connect(
    mapStateToProps, 
    { getGrades, deleteGrade }
)(GradeList);