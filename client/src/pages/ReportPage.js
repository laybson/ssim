import React, { Component } from 'react';
import { 
    Container, 
    Typography,
    Table,
    TableHead,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { getGrades } from '../actions/gradeActions';
import { getStudents } from '../actions/studentActions';
import { getSupplies } from '../actions/supplyActions';
import PropTypes from 'prop-types';

const styles = theme => ({
    root: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    table: {
        minWidth: 650,
    },
    head: {
        color: 'rgba(207, 31, 37, 1)',
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

class ReportPage extends Component {
    state = {
        page: 0,
        rowsPerPage: 25,
    }

    static propTypes = {
        getStudents: PropTypes.func.isRequired,
        getSupplies: PropTypes.func.isRequired,
        getGrades: PropTypes.func.isRequired,        
        grade: PropTypes.object.isRequired,
        student: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool
    }

    componentDidMount() {
        this.props.getGrades();
        this.props.getStudents();
        this.props.getSupplies();
    }

    getReceivedSuppliesString = (grade) => {
        const supplies = this.getGradeSupplies(grade);
        const students = this.getGradeStudents(grade);
        const totalReceiving = supplies.length * students.length;
        let received = 0;

        supplies.forEach(supply => {
            students.forEach(student => {
                if(student.receivedSupplies.some(ss => ss.id === supply._id && !ss.incomplete))
                    received = received + 1
            })
        })        

        return ""+received+"/"+totalReceiving
    }

    getReturnedSuppliesString = (grade) => {
        const supplies = this.getDidacticSupplies(grade);
        const students = this.getGradeStudents(grade);
        const totalReturning = supplies.length * students.length;
        let returned = 0;

        supplies.forEach(supply => {
            students.forEach(student => {
                if(student.returnedSupplies.some(ss => ss.id === supply._id))
                    returned = returned + 1
            })
        })

        return ""+returned+"/"+totalReturning
    }

    getGradeStudents = (grade) => {
        return this.props.student.students.filter(student => {
            return student.grade === grade._id;
        })
    }

    getDidacticSupplies = (grade) => {
        return this.props.supply.supplies.filter(supply => {
            return supply.grade === grade._id && supply.didactic;
        })
    }

    getGradeSupplies = (grade) => {
        return this.props.supply.supplies.filter(supply => {
            return supply.grade === grade._id;
        })
    }

    render() {
        const { grades } = this.props.grade;
        const { classes } = this.props;

        return (
            <Container className={classes.root}>
                <Typography className={classes.titleGrade} variant='h6'>
                    Relatório
                </Typography>
                <TableContainer component={ Paper }>
                    <Table className={ classes.table } size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell className={ classes.head }>Turma</TableCell>
                                <TableCell className={ classes.head } align="right">Alunos</TableCell>
                                <TableCell className={ classes.head } align="right">Materiais</TableCell>
                                <TableCell className={ classes.head } align="right">Materiais Recebidos</TableCell>
                                <TableCell className={ classes.head } align="right">Materiais Devolvidos</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            { grades.map(i => (
                                <TableRow key={ i._id }>
                                    <TableCell component="th" scope="row">{ i.name+" "+i.shift }</TableCell>
                                    <TableCell align="right">{ this.getGradeStudents(i).length }</TableCell>
                                    <TableCell align="right">{ this.getGradeSupplies(i).length }</TableCell>
                                    <TableCell align="right">{ this.getReceivedSuppliesString(i) }</TableCell>
                                    <TableCell align="right">{ this.getReturnedSuppliesString(i) }</TableCell>
                                </TableRow>
                            )) }
                        </TableBody>
                    </Table>
                </TableContainer>                
            </Container>           
        );
    }
}

const mapStateToProps = (state) => ({
    grade: state.grade,
    supply: state.supply,
    student: state.student,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { 
    getGrades,
    getSupplies,
    getStudents
 })(withStyles(styles)(ReportPage));