import React, { Component } from 'react';
import { Role } from './auth/Roles';
import { Grid, Box, IconButton, Tooltip } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import StopIcon from '@material-ui/icons/Stop';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteStudent } from '../actions/studentActions';
import { getStudentReport } from '../actions/report';
import StudentModal from './StudentModal';

const styles = theme => ({
    root: {
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
    },
    buttons: {
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        '& > *': {
            margin: theme.spacing(.3),
        },
    },
    reportFalse: {
        color: 'rgba(207, 31, 37, 1)'
    },
    reportTrue: {
        color: 'rgba(31, 207, 37, 1)'
    },
    paper: {
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    delete: {
        marginLeft: "auto",
        marginRight: -12,        
    },
});

class StudentCard extends Component {
    static propTypes = {
        user: PropTypes.object,
        isAuthenticated: PropTypes.bool,
        supply: PropTypes.object
    }

    onDeleteClick = (id) => {
        const message = "Realmente deseja deletar "+this.props.student.name+"?";
        const result = window.confirm(message);
        if(result) this.props.deleteStudent(id);
    }

    report = (classes) => {
        if(getStudentReport(this.props.supply.supplies, this.props.student)){
            return classes.reportTrue;
        }
        return classes.reportFalse;
    }

    render() {
        const student = this.props.student;
        const { classes } = this.props;

        return(
            <Box>
                <Box className={ classes.root }>
                    <StopIcon 
                        className={ this.report(classes) }
                        aria-label="report" />
                    { student.name }
                    { this.props.isAuthenticated && this.props.user.role === Role.Admin ?
                        <Tooltip title="Apagar aluno(a)">
                            <IconButton
                                className={ classes.delete }
                                color="secondary" 
                                aria-label="delete"
                                onClick={this.onDeleteClick.bind(this, student._id)}>
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip> :
                        null
                    }
                </Box>
                { this.props.isAuthenticated ?
                    <Grid container spacing={1} className={ classes.root } justify="center">
                        <Grid item xs={12} sm={6}>
                            <StudentModal 
                                student={ student }
                                receiving= { true }/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <StudentModal 
                                student={ student }
                                returning= { true }/>
                        </Grid>
                    </Grid> :
                    null
                }
            </Box>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated,
    supply: state.supply
})

export default connect(
    mapStateToProps, 
    { deleteStudent }
)(withStyles(styles)(StudentCard));