import React, { Component } from 'react';
import { Role } from '../components/auth/Roles';
import { Button, Container, Grid, Box, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteGrade, getGradeById } from '../actions/gradeActions'; 
import SupplyList from '../components/SupplyList';
import StudentList from '../components/StudentList';
import AddSupplyModal from '../components/AddSupplyModal';
import AddStudentModal from '../components/AddStudentModal';

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
    subtitleGrade: {
        color: 'rgba(207, 31, 37, .5)',
        textAlign: 'center',
    },
    delete: {
        padding: theme.spacing(2),
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});

class GradePage extends Component {
    state = {
        pageGrade: {}
    }
    static propTypes = {
        user: PropTypes.object,
        isAuthenticated: PropTypes.bool,
        grade: PropTypes.object.isRequired,
        getGradeById: PropTypes.func.isRequired,
        deleteGrade: PropTypes.func.isRequired
    }

    componentDidMount = () => {
        if(this.props.match.params.id) {
            this.props.getGradeById(this.props.match.params.id);
        }
    }

    onDeleteClick = (id) => {
        const message = "Realmente deseja deletar "+this.props.grade.grade.name+"?";
        const result = window.confirm(message);
        if(result) {
            this.props.deleteGrade(id)
            window.location = '/';
        }
    }

    render() {
        const { classes } = this.props;
        const grade = this.props.grade.grade;        
                
        return (      
            <Container className={classes.root}>
                <Box justify="center">
                    <Typography className={classes.titleGrade} variant='h5'>
                        { grade.name }
                    </Typography>
                    <Typography className={classes.subtitleGrade}>
                        { grade.shift }
                    </Typography>
                </Box>
                <Grid container spacing={3} justify="center">
                    <Grid item xs={12} sm={6}>
                        <Box className={classes.root}>
                            <Typography className={classes.titleGrade} variant='h6'>
                                Materiais
                            </Typography>
                            <AddSupplyModal />
                        </Box>
                        <SupplyList 
                            grade={ {id:this.props.match.params.id} }/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Box className={classes.root}>
                            <Typography className={classes.titleGrade} variant='h6'>
                                Alunos
                            </Typography>
                            <AddStudentModal />
                        </Box>
                        <StudentList 
                            grade={ {id:this.props.match.params.id} }/>
                    </Grid>
                </Grid>
                <Box justify="center" className={classes.delete}>
                    { this.props.isAuthenticated && this.props.user.role === Role.Admin ?
                        <Box>
                            <Button
                                color="secondary"
                                variant="contained"
                                onClick={this.onDeleteClick.bind(this, grade._id)}
                            >
                                Apagar Turma
                            </Button>
                        </Box> :
                        null
                    }
                </Box>
            </Container>            
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    grade: state.grade,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(
    mapStateToProps, 
    { deleteGrade, getGradeById }
)(withStyles(styles)(GradePage));