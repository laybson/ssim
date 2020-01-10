import React, { Component } from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert
} from 'reactstrap';
import { Button, Box } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

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

class RegisterModal extends Component {
    state = {
        modal: false,
        name: '',
        email: '',
        password: '',
        msg: null
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;

        if(error !== prevProps.error) {
            // Check for register error
            if(error.id === 'REGISTER_FAIL') {
                this.setState({ msg: error.msg.msg });
            } else {
                this.setState({ msg: null })
            }
        }

        // If authenticated, close modal
        if(this.state.modal) {
            if(isAuthenticated) {
                this.toggle();                
            }
        }
    }

    toggle = () => {
        // Clear errors
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

        const { name, email, password } = this.state;

        // Create user object
        const newUser = {
            name, email, password
        };

        // Attempt to register
        this.props.register(newUser)
    }

    render() {
        const { classes } = this.props;

        return(
            <Box>
                <NavLink onClick={this.toggle} href="#">
                    Registrar
                </NavLink>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>
                        Registrar Usuário
                    </ModalHeader>
                    <ModalBody>
                        { this.state.msg ? 
                            (<Alert color="danger">{ this.state.msg }</Alert>) :
                            null }
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="name">
                                    Nome
                                </Label>
                                <Input 
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Digite o nome"
                                    className="mb-3"
                                    onChange={this.onChange} 
                                />
                                <Label for="email">
                                    E-Mail
                                </Label>
                                <Input 
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Digite o e-mail"
                                    className="mb-3"
                                    onChange={this.onChange} 
                                />
                                <Label for="password">
                                    Senha
                                </Label>
                                <Input 
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Digite a senha"
                                    className="mb-3"
                                    onChange={this.onChange} 
                                />
                                <Button
                                    className={ classes.buttons }
                                    fullWidth={true}
                                    variant="outlined"
                                    onClick={this.onSubmit}
                                >
                                    Registrar
                                </Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </Box>
        );
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

export default connect(mapStateToProps, { register, clearErrors })(withStyles(styles)(RegisterModal));