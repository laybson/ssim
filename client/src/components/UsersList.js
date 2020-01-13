import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { Box } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { getUsers } from '../actions/authActions';
import PropTypes from 'prop-types';
import UserModal from './UserModal';

const styles = theme => ({
    root: {
        paddingTop: '.1rem',
        paddingRight: '1rem',
        paddingBottom: '.1rem',
        paddingLeft: '1rem'
    },    
});

class UsersList extends Component {
    static propTypes = {
        getUsers: PropTypes.func.isRequired,
        auth: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool
    }

    componentDidMount = () => {
        this.props.getUsers();
    }

    showCard = (user) => {
        return(
            <UserModal
                user={ user }/>
        )        
    }

    render() {
        const { classes } = this.props;
        const users = this.props.auth.users;

        return(
            <Box>
                <ListGroup>
                    <TransitionGroup className="user-list">
                        {users.map((i) => (
                            <CSSTransition key={i._id} timeout={500} classNames="fade">
                                <ListGroupItem className={ classes.root }>
                                    { this.showCard(i) }
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
    auth: state.auth,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(
    mapStateToProps, 
    { getUsers }
)(withStyles(styles)(UsersList));