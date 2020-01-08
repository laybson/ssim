import React, { Component } from 'react';
import { Typography, Paper, Box } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteGrade } from '../actions/gradeActions';

const styles = theme => ({
    root: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
            margin: theme.spacing(1),
            width: theme.spacing(16),
            height: theme.spacing(16),
          },
    },
    titleGrade: {
        color: 'rgba(207, 31, 37, 1)',
        textAlign: 'center',
    },
    subtitleGrade: {
        color: 'rgba(207, 31, 37, .5)',
        textAlign: 'center',
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

class GradeCard extends Component {
    static propTypes = {
        isAuthenticated: PropTypes.bool
    }

    onDeleteClick = (id) => {
        this.props.deleteGrade(id);
    }

    render() {
        const grade = this.props.grade;
        const { classes } = this.props;

        return(
            <Link to={`/grade/${grade._id}`}>
            <Paper variant="outlined" className={ classes.root }>                
                
                    <Box justify="center">
                        <Typography className={classes.titleGrade} variant='h5'>
                            { grade.name }
                        </Typography>
                        <Typography className={classes.subtitleGrade}>
                            { grade.shift }
                        </Typography>
                    </Box>
                
                {/*<Box>
                    { this.props.isAuthenticated ?
                        <IconButton
                            className={ classes.delete }
                            color="secondary" 
                            aria-label="delete"
                            onClick={this.onDeleteClick.bind(this, grade._id)}>
                            <DeleteIcon />
                        </IconButton> :
                        null
                    }
                </Box>*/}
            </Paper>
            </Link>
            
        )
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(
    mapStateToProps, 
    { deleteGrade }
)(withStyles(styles)(GradeCard));