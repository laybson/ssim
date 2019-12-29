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

class GradeModal extends Component {
    state = {
        modal: false,
        name: '',
        shift: ''
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool
    }

    toggle = () => {
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
                                    type="text"
                                    name="shift"
                                    id="grade"
                                    placeholder="Digite o turno da turma"
                                    className="mb-3"
                                    onChange={this.onChange} 
                                />
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
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { addGrade })(GradeModal);