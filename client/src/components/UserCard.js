import React, { Component } from 'react';
import { Role } from './auth/Roles';
import {    
    Box,
    Grid, 
    Tooltip,
    Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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
        textAlign: 'left',
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

    showTooltip = () => {
        return "Editar "+this.props.user.name
    }

    render() {
        const user = this.props.user;
        const { classes } = this.props;

        return(
            <Box>
                <Tooltip title={this.showTooltip()} placement="right">
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
                        <Grid item xs={12} sm={12}>
                        <Typography className={classes.email}>
                            { user.email }
                        </Typography>
                        </Grid>
                    </Grid>
                </Tooltip>
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
    {  }
)(withStyles(styles)(UserCard));