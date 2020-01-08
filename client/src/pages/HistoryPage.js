import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Container, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getHistory } from '../actions/historyActions';
import PropTypes from 'prop-types';

const styles = theme => ({
    root: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    titleGrade: {
        color: 'rgba(207, 31, 37, 1)',
        textAlign: 'center',
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});

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
        const { classes } = this.props;
        return (
            <Container className={classes.root}>
                <Typography className={classes.titleGrade} variant='h6'>
                    Histórico
                </Typography>
                <ListGroup>
                    <TransitionGroup className="history-list">
                        {history.map(i => (
                            <CSSTransition key={i._id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                    { i.student.name+" da turma "+
                                    i.grade.name+" "+i.grade.shift+
                                    " foi modificada(o) por "+i.user.name+
                                    " em "+new Date(i.register_date).getDate()+
                                    "/"+(new Date(i.register_date).getMonth()+1)+
                                    "/"+new Date(i.register_date).getFullYear()+
                                    " às "+new Date(i.register_date).getHours()+
                                    "h"+new Date(i.register_date).getMinutes() }
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

export default connect(mapStateToProps, { getHistory })(withStyles(styles)(HistoryPage));