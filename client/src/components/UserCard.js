import React, { Component } from 'react';
import { Role } from './auth/Roles';
import {    
    Box,
    Grid, 
    Tooltip,
    IconButton,
    Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UserModal from './UserModal';
import { deleteUser, logout } from '../actions/authActions';

const styles = theme => ({
    root: {
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
    },
    name: {
        color: 'rgba(207, 31, 37, 1)',
        textAlign: 'left',
    },
    email: {
        color: 'rgba(207, 31, 37, .5)',
        textAlign: 'left',
    },
    role: {
        color: 'rgba(0, 0, 0, 1)',
        textAlign: 'right',
    },
    delete: {
        marginLeft: "auto",
        marginRight: -12,        
    },
});

class UserCard extends Component {
    state = {
        role: Role.Viewer,
    }

    static propTypes = {
        user: PropTypes.object,
        auth: PropTypes.object,
        isAuthenticated: PropTypes.bool
    }

    componentDidMount = () => {
        this.setState({role:this.props.user.role})
    }

    mapRoleStateToValue = () => {
        if(this.state.role === Role.Viewer){
            return "Apenas Leitura";
        }else if(this.state.role === Role.User){
            return "Usuário";
        }else if(this.state.role === Role.Admin){
            return "Administrador";
        } 
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    report = (classes, value) => {
        if(value === 2){
            return classes.reportTrue;
        }else if(value === 1) {
            return classes.reportPending;
        }
        return classes.reportFalse;
    }

    onRoleClick = (user, e, v) => {
        this.mapValueToRoleState(v);
        this.changeRole(user, v);        
    } 

    showEditTooltip = () => {
        return "Editar "+this.props.user.name
    }

    showDeleteTooltip = () => {
        return "Apagar "+this.props.user.name
    }

    onDeleteClick = (id) => {        
        const message = "Realmente deseja deletar "+this.props.user.name+"?";
        const result = window.confirm(message);
        if(result) {
            this.props.deleteUser(id); 
            if(id === this.props.auth.user._id)
                this.props.logout();                       
        }
    }

    render() {
        const user = this.props.user;
        const { classes } = this.props;

        return(
            <Box>
                <Grid container>
                    <Grid item xs={12} sm={9}>
                        <Typography className={classes.name}>
                            { user.name }
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Typography className={classes.role}>
                            { this.mapRoleStateToValue() }  
                        </Typography>                         
                    </Grid>
                    <Grid item xs={12} sm={10}>
                        <Typography className={classes.email}>
                            { user.email }
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={1}>
                        <Tooltip title={this.showEditTooltip()} placement="left">
                            <Box>
                                <UserModal
                                    user={ user }/>
                            </Box>                            
                        </Tooltip>                      
                    </Grid>
                    <Grid item xs={12} sm={1}>
                        <Tooltip title={this.showDeleteTooltip()} placement="right">
                            <IconButton
                                className={ classes.delete }
                                color="secondary" 
                                aria-label="delete"
                                onClick={this.onDeleteClick.bind(this, user._id)}>
                                <DeleteIcon />
                            </IconButton>   
                        </Tooltip>                    
                    </Grid>
                </Grid>
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
    { deleteUser, logout }
)(withStyles(styles)(UserCard));