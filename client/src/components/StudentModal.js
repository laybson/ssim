import React, { Component } from 'react';
import { Role } from './auth/Roles';
import {
    Container,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup
} from 'reactstrap';
import { Button, Box } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { clearErrors } from '../actions/errorActions';
import { addStudent } from '../actions/studentActions';
import { addHistory } from '../actions/historyActions';
import { createAndDownloadPDF } from "../actions/pdfActions";
import StudentSuppliesList from './StudentSuppliesList';

const styles = theme => ({
    root: {
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
    },
    buttons: {
        flexGrow: 1,
        display: 'flex',
        color: 'rgba(0, 0, 0, 1)'
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

class StudentModal extends Component {
    state = {
        modal: false,
        grade: '',
        received: [],
        returned: []
    }

    static propTypes = {
        user: PropTypes.object,
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        student: PropTypes.object.isRequired,
        supply: PropTypes.object.isRequired,
        receiving: PropTypes.bool,
        returning: PropTypes.bool,
        clearErrors: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps) {
        const { error } = this.props;

        if(error !== prevProps.error) {
            if(error.id === 'ADD_STUDENT_FAIL') {
                this.setState({ msg: error.msg.msg });
            } else {
                this.setState({ msg: null })
            }
        }
    }


    toggle = () => {
        this.props.clearErrors();
        this.setState({
            modal: !this.state.modal
        });
    }

    onChange = (e) => {        
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    historicalFact = () => {
        const student = {
            name: this.props.student.name,
            receivedSupplies: this.props.student.receivedSupplies,
            returnedSupplies: this.props.student.returnedSupplies
        }
        const grade = {
            name: this.props.grade.grade.name,
            shift: this.props.grade.grade.shift
        }
        const user = {
            name: this.props.auth.user.name,
            email: this.props.auth.user.email
        }
        return {
            user: user,
            student: student,
            grade: grade
        }
    }

    pdfData = () => {
        const student = {
            name: this.props.student.name,
            receivedSupplies: this.props.student.receivedSupplies,
            returnedSupplies: this.props.student.returnedSupplies
        }
        const supplies = this.props.supply.supplies
        const user = {
            name: this.props.auth.user.name,
            email: this.props.auth.user.email
        }
        return {
            student: student,
            supplies: supplies,
            user: user
            }
    }

    onSubmit = (e) => {
        e.preventDefault();

        const renewStudent = this.props.student
        const historicalFact = this.historicalFact()
        const pdfData = this.pdfData()
        this.props.addStudent(renewStudent);
        this.props.addHistory(historicalFact);
        this.props.createAndDownloadPDF(pdfData,this.props.student.name);
        
        this.toggle();
    }

    showButton = (classes) => {
        if(!this.props.isAuthenticated || !(this.props.receiving || this.props.returning)){
            return null;
        }
        if(this.props.receiving){
            return(
                <Button
                    className={ classes.buttons }
                    fullWidth={true}
                    variant="outlined"
                    onClick={this.toggle}
                >
                    Recebimento
                </Button>                
            )
        } else if(this.props.returning){
            return(
                <Button
                    className={ classes.buttons }
                    fullWidth={true}
                    variant="outlined"
                    onClick={this.toggle}
                >
                    Devolução
                </Button>
            )
        }
    }

    showTitle = () => {
        if(this.props.receiving){
            return(
                <span>Recebimento de Materiais de { this.props.student.name } </span>
            )
        } else if(this.props.returning){
            return(
                <span>Devolução de Materiais de { this.props.student.name } </span>
            )
        }
        return (
            <span>Materiais de { this.props.student.name }</span>
        )
    }

    showList = () => {
        if(this.props.receiving){
            return(
                <Box>
                    <StudentSuppliesList 
                        grade={ {id:this.props.grade._id} }
                        student={ this.props.student } 
                        receiving={ true }/>
                </Box>                
            )
        } else if(this.props.returning){
            return(
                <Box>
                    <StudentSuppliesList 
                        grade={ {id:this.props.grade._id} }
                        student={ this.props.student } 
                        returning={ true }/>
                </Box>
            )
        }
        return (
            <Box>
                <StudentSuppliesList 
                    grade={ {id:this.props.grade._id} }
                    student={ this.props.student } />
            </Box>
        )
    }

    showSubmit = (classes) => {
        if(!this.props.isAuthenticated || !(this.props.receiving || this.props.returning)){
            return null;
        }
        if(this.props.receiving){
            return(
                <Button
                    className={ classes.buttons }
                    fullWidth={true}
                    variant="outlined"
                    onClick={this.onSubmit}
                >
                    Recebimento Concluído / Imprimir
                </Button>
            )
        } else if(this.props.returning){
            return(
                <Button
                    className={ classes.buttons }
                    fullWidth={true}
                    variant="outlined"
                    onClick={this.onSubmit}
                >
                    Devolução Concluída / Imprimir
                </Button>
            )
        }
    }    

    render() {
        const { classes } = this.props;
        return(
            <Box>
                {this.showButton(classes)}
                
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >                    
                    <ModalHeader toggle={this.toggle}>
                        {this.showTitle()}
                    </ModalHeader>
                    <ModalBody>
                        <Container>                            
                            <Form onSubmit={this.onSubmit}>
                                {this.showList()}
                                { this.props.isAuthenticated && (this.props.user.role === Role.Admin || this.props.user.role === Role.User) ?
                                    <FormGroup>
                                        {this.showSubmit(classes)}
                                    </FormGroup> : null}
                            </Form>
                        </Container>
                    </ModalBody>
                </Modal>
            </Box>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    grade: state.grade,
    supply: state.supply,
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth,
    error: state.error
});

export default connect(mapStateToProps, { clearErrors, addStudent, addHistory, createAndDownloadPDF })(withStyles(styles)(StudentModal));