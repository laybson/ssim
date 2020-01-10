import React, { Component } from 'react';
import { Grid, Box, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteStudent } from '../actions/studentActions';
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
    paper: {
        padding: theme.spacing(2),
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
        isAuthenticated: PropTypes.bool
    }

    onDeleteClick = (id) => {
        this.props.deleteStudent(id);
    }

    render() {
        const student = this.props.student;
        const { classes } = this.props;

        return(
            <div>
                <Box className={ classes.root }>
                    { student.name }
                    { this.props.isAuthenticated ?
                        <IconButton
                            className={ classes.delete }
                            color="secondary" 
                            aria-label="delete"
                            onClick={this.onDeleteClick.bind(this, student._id)}>
                            <DeleteIcon />
                        </IconButton> :
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
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(
    mapStateToProps, 
    { deleteStudent }
)(withStyles(styles)(StudentCard));