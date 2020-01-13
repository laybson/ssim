import React, { Component } from 'react';
import { Role } from './auth/Roles';
import {
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import { Button, Box, CardActionArea } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { clearErrors } from '../actions/errorActions';
import { editUser } from '../actions/authActions';
import UserCard from './UserCard';

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

class UserModal extends Component {
    state = {
        name: '',
        role: ''
    }

    static propTypes = {
        user: PropTypes.object.isRequired,
        auth: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,    
        clearErrors: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps) {
        //const { error } = this.props;
    }

    componentDidMount = () => {
        this.setState({name:this.props.user.name})
        this.setState({role:this.props.user.role})
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
        const renewUser = {
            _id: this.props.user._id,
            name: this.props.user.name,
            role: this.state.role
        };

        this.props.editUser(renewUser, this.props.auth.user);
                
        this.toggle();
        window.location = "/management"
    }

    showButton = (classes) => {
        return (
            <CardActionArea onClick={this.toggle} href="#">
                <UserCard 
                    user={ this.props.user }/>
            </CardActionArea>
        )
    }

    onChangeRole = (e) => {
        this.mapValueToRoleState(e.target.value)                                
    }

    mapRoleStateToValue = () => {
        if(this.state.role === Role.Viewer){
            return "Apenas Leitura";
        }else if(this.state.role === Role.User){
            return "Usuário";
        }else if(this.state.role === Role.Admin){
            return "Administrador";
        } 
    }

    mapValueToRoleState = (value) => {
        if(value === "Apenas Leitura"){
            this.setState({role:Role.Viewer})            
        }else if(value === "Usuário"){
            this.setState({role:Role.User})
        }else if(value === "Administrador"){
            this.setState({role:Role.Admin})
        }
        this.props.user.role = this.state.role
    }

    showSubmit = (classes) => {
        if(!this.props.isAuthenticated){
            return null;
        }
        return(
            <Button
                className={ classes.buttons }
                fullWidth={true}
                variant="outlined"
                onClick={this.onSubmit}
            >
                Concluir Gerenciamento
            </Button>
        )
    }    

    render() {
        const { classes } = this.props;
        return(
            <Box>
                { this.props.isAuthenticated && this.props.auth.user.role === Role.Admin ?
                    this.showButton(classes) : null}
                
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>
                        Editar { this.props.user.name } 
                    </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="grade">
                                    Nome
                                </Label>
                                <Input 
                                    type="text"
                                    name="name"
                                    value={ this.state.name }
                                    id="name"
                                    placeholder="Digite o nome do usuário"
                                    className="mb-3"
                                    onChange={this.onChange} 
                                />
                                <Label for="grade">
                                    Nível de Acesso
                                </Label>
                                <Input 
                                    type="select"
                                    name="role"
                                    id="role"
                                    value={ this.mapRoleStateToValue() }
                                    className="mb-3"
                                    onChange={this.onChangeRole} 
                                >
                                    <option>Apenas Leitura</option>
                                    <option>Usuário</option>
                                    <option>Administrador</option>
                                </Input>
                                <Button
                                    className={ classes.buttons }
                                    fullWidth={true}
                                    variant="outlined"
                                    onClick={this.onSubmit}
                                >
                                    Editar Usuário
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
    auth: state.auth,
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

export default connect(mapStateToProps, { clearErrors, editUser })(withStyles(styles)(UserModal));