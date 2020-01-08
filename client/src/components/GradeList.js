import React, { Component } from 'react';
import { Container, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { getGrades, deleteGrade } from '../actions/gradeActions';
import PropTypes from 'prop-types';

import GradeCard from './GradeCard';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});

class GradeList extends Component {
    static propTypes = {
        getGrades: PropTypes.func.isRequired,
        grade: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool
    }

    componentDidMount() {
        this.props.getGrades();
    }

    onDeleteClick = (id) => {
        this.props.deleteGrade(id);
    }

    render() {
        const { classes } = this.props;
        const { grades } = this.props.grade;
        return(
            <Container className={ classes.root }>
                <Grid container spacing={2} justify="center">
                    {grades.map((i, {_id, name, shift}) => (
                        <Grid  key={i._id} item xs={6} sm={3}>
                            <GradeCard 
                                grade={ i }/> 
                        </Grid>
                    ))}
                </Grid>
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    grade: state.grade,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(
    mapStateToProps, 
    { getGrades, deleteGrade }
)(withStyles(styles)(GradeList));