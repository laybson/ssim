import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getHistory } from '../actions/historyActions';
import PropTypes from 'prop-types';


class HistoryPage extends Component {
    static propTypes = {
        getHistory: PropTypes.func.isRequired,
        history: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool
    }

    componentDidMount() {
        this.props.getHistory();
    }

    render() {
        const { history } = this.props.history;
        return (
            <Container>
                HISTÓRICO
                <ListGroup>
                    <TransitionGroup className="history-list">
                        {history.map(i => (
                            <CSSTransition key={i._id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                    { i.student.name+" da turma "+i.grade.name+" "+i.grade.shift+" foi modificada(o) por "+i.user.name+" em "+i.register_date }
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>                
            </Container>            
        );
    }
}

const mapStateToProps = (state) => ({
    history: state.history,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { getHistory })(HistoryPage);