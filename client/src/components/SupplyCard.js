import React, { Component } from 'react';
import { Role } from './auth/Roles';
import { Box, IconButton, Tooltip } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import StopIcon from '@material-ui/icons/Stop';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteSupply } from '../actions/supplyActions';
import { getSupplyReport } from '../actions/report';

const styles = theme => ({
    root: {
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    reportFalse: {
        color: 'rgba(207, 31, 37, 1)'
    },
    reportTrue: {
        color: 'rgba(31, 207, 37, 1)'
    },
    delete: {
        marginLeft: "auto",
        marginRight: -12,        
    },
});

class SupplyCard extends Component {
    static propTypes = {
        user: PropTypes.object,
        isAuthenticated: PropTypes.bool,
        student: PropTypes.object
    }

    onDeleteClick = (id) => {
        const message = "Realmente deseja deletar "+this.props.supply.name+"?";
        const result = window.confirm(message);
        if(result) this.props.deleteSupply(id);
    }

    report = (classes) => { 
        if(getSupplyReport(this.props.supply, this.props.student.students)){
            return classes.reportTrue;
        }
        return classes.reportFalse;
    }

    render() {
        const supply = this.props.supply;
        const { classes } = this.props;        

        return(
            <Box className={ classes.root }>
                <StopIcon 
                    className={ this.report(classes) }
                    aria-label="report" />
                { supply.quantity+" "+supply.name }
                { this.props.isAuthenticated && this.props.user.role === Role.Admin ?
                    <Tooltip title="Apagar material">
                        <IconButton
                            className={ classes.delete }
                            color="secondary" 
                            aria-label="delete"
                            onClick={this.onDeleteClick.bind(this, supply._id)}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip> :
                    null
                }             
            </Box>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated,
    student: state.student
})

export default connect(
    mapStateToProps, 
    { deleteSupply }
)(withStyles(styles)(SupplyCard));