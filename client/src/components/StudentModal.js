import React, { Component } from 'react';
import {
    Button,
    Container,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { clearErrors } from '../actions/errorActions';
import { addStudent } from '../actions/studentActions';
import StudentSuppliesList from './StudentSuppliesList';

class StudentModal extends Component {
    state = {
        modal: false,
        grade: '',
        received: [],
        returned: []
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        student: PropTypes.object.isRequired,
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

    onSubmit = (e) => {
        e.preventDefault();

        const renewStudent = this.props.student
        this.props.addStudent(renewStudent);
        
        this.toggle();
    }

    showButton = () => {
        if(!this.props.isAuthenticated || !(this.props.receiving || this.props.returning)){
            return null;
        }
        if(this.props.receiving){
            return(
                <Button
                    color="dark"
                    onClick={this.toggle}
                >
                    Recebimento de Materiais
                </Button>
            )
        } else if(this.props.returning){
            return(
                <Button
                    color="dark"
                    onClick={this.toggle}
                >
                    Devolução de Materiais
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
                <div>
                    <span> Lista de Recebimento </span>
                    <StudentSuppliesList 
                        grade={ {id:this.props.grade._id} }
                        student={ this.props.student } 
                        receiving={ true }/>
                </div>                
            )
        } else if(this.props.returning){
            return(
                <div>
                    <span> Lista de Devolução </span>
                    <StudentSuppliesList 
                        grade={ {id:this.props.grade._id} }
                        student={ this.props.student } 
                        returning={ true }/>
                </div>
            )
        }
        return (
            <div>
                <span> Apenas Lista </span>
                <StudentSuppliesList 
                        grade={ {id:this.props.grade._id} }
                        student={ this.props.student } />
            </div>
        )
    }

    showSubmit = () => {
        if(!this.props.isAuthenticated || !(this.props.receiving || this.props.returning)){
            return null;
        }
        if(this.props.receiving){
            return(
                <Button
                    color="dark"
                    style={{marginTop: '2rem'}}
                    block
                >
                    Recebimento Concluído / Imprimir
                </Button>
            )
        } else if(this.props.returning){
            return(
                <Button
                    color="dark"
                    style={{marginTop: '2rem'}}
                    block
                >
                    Devolução Concluída / Imprimir
                </Button>
            )
        }
    }    

    render() {
        return(
            <div>
                {this.showButton()}
                
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
                                <FormGroup>
                                    {this.showSubmit()}
                                </FormGroup>
                            </Form>
                        </Container>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    grade: state.grade,
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

export default connect(mapStateToProps, { clearErrors, addStudent })(StudentModal);