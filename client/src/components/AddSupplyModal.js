import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    CustomInput
} from 'reactstrap';
import { connect } from 'react-redux';
import { addSupply } from '../actions/supplyActions';
import PropTypes from 'prop-types';
import { clearErrors } from '../actions/errorActions';

class AddSupplyModal extends Component {
    state = {
        modal: false,
        name: '',
        grade: '',
        quantity: 1,
        didactic: false
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps) {
        const { error } = this.props;

        if(error !== prevProps.error) {
            if(error.id === 'ADD_SUPPLY_FAIL') {
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
        let value = e.target.value;
        if(e.target.name === 'didactic') {
            value=!this.state.didactic
        }
        this.setState({
            [e.target.name]: value
        });
    }

    switchChange = () => {
        this.didactic = !this.didactic;
    }

    onSubmit = (e) => {
        e.preventDefault();

        this.grade = this.props.grade.grades._id

        const newSupply = {
            name: this.state.name,
            grade: this.grade,
            quantity: this.state.quantity,
            didactic: this.state.didactic
        }
        console.log(newSupply)

        this.props.addSupply(newSupply);
        
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
                        Adicionar Material
                    </Button> :
                    null
                }
                
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>
                        Novo Material
                    </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="supply">
                                    Material
                                </Label>
                                <Input 
                                    type="text"
                                    name="name"
                                    id="supply"
                                    placeholder="Digite o nome do material"
                                    className="mb-3"
                                    onChange={this.onChange} 
                                />
                                <Label for="supply">
                                    Quantidade
                                </Label>
                                <Input 
                                    type="number"
                                    min="1"
                                    name="quantity"
                                    id="supply"
                                    placeholder="Digite a quantidade"
                                    className="mb-3"
                                    onChange={this.onChange} 
                                />
                                <CustomInput 
                                    type="switch" 
                                    name="didactic"
                                    id="didactic"
                                    label="O Material é Didático?"
                                    onChange={this.onChange} />                              
                                <Button
                                    color="dark"
                                    style={{marginTop: '2rem'}}
                                    block
                                >
                                    Adicionar Material
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

export default connect(mapStateToProps, { addSupply, clearErrors })(AddSupplyModal);