import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { addGrade } from '../actions/gradeActions';
import PropTypes from 'prop-types';
import { clearErrors } from '../actions/errorActions';

class GradeModal extends Component {
    state = {
        modal: false,
        name: '',
        shift: ''
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps) {
        const { error } = this.props;

        if(error !== prevProps.error) {
            if(error.id === 'ADD_GRADE_FAIL') {
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
            [e.target.name]: e.target.value,
            [e.target.shift]: e.target.value
        });
    }

    onSubmit = (e) => {
        e.preventDefault();

        const newGrade = {
            name: this.state.name,
            shift: this.state.shift
        }

        // Add grade via addGrade action
        this.props.addGrade(newGrade);
        
        // Close modal
        this.toggle();
    }

    render() {
        return(
            <div>
                { this.props.isAuthenticated ? 
                    <Button
                        color="dark"
                        style={{marginBottom: '2rem'}}
                        onClick={this.toggle}
                    >
                        Adicionar Turma
                    </Button> :
                    null
                }
                
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>
                        Nova Turma
                    </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="grade">
                                    Turma
                                </Label>
                                <Input 
                                    type="text"
                                    name="name"
                                    id="grade"
                                    placeholder="Digite o nome da turma"
                                    className="mb-3"
                                    onChange={this.onChange} 
                                />
                                <Label for="grade">
                                    Turno
                                </Label>
                                <Input 
                                    type="select"
                                    name="shift"
                                    id="grade"
                                    placeholder="Digite o turno da turma"
                                    className="mb-3"
                                    onChange={this.onChange} 
                                >
                                    <option>Manhã</option>
                                    <option>Tarde</option>
                                </Input>
                                <Button
                                    color="dark"
                                    style={{marginTop: '2rem'}}
                                    block
                                >
                                    Adicionar Turma
                                </Button>
                            </FormGroup>
                        </Form>
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

export default connect(mapStateToProps, { addGrade, clearErrors })(GradeModal);