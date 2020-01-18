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
import { 
    Button, 
    Box, 
    IconButton, 
    FormControlLabel, 
    Switch 
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { clearErrors } from '../actions/errorActions';
import { editSupply } from '../actions/supplyActions';

const LightSwitch = withStyles({
    switchBase: {
      color: 'rgba(207, 31, 37, 1)',
      '&$checked': {
        color: 'rgba(31, 207, 37, 1)',
      },
      '& + $track': {
        backgroundColor: 'rgba(207, 31, 37, 1)',
      },
      '&$checked + $track': {
        backgroundColor: 'rgba(31, 207, 37, 1)',
      },
    },
    checked: {},
    track: {},
})(Switch);

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

class SupplyModal extends Component {
    state = {
        name: '',
        quantity: 1,
        didactic: false
    }

    static propTypes = {
        supply: PropTypes.object.isRequired,
        auth: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,    
        clearErrors: PropTypes.func.isRequired
    }

    componentDidMount = () => {
        this.setState({name:this.props.supply.name})
        this.setState({quantity:this.props.supply.quantity})
        this.setState({didactic:this.props.supply.didactic})
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

    onSubmit = (e) => {
        e.preventDefault();
        const renewSupply = {
            _id: this.props.supply._id,
            name: this.state.name,
            quantity: this.state.quantity,
            didactic: this.state.didactic
        };

        this.props.editSupply(renewSupply, this.props.supply._id);
                
        this.toggle();
        window.location = `/grade/${this.props.grade.grade._id}`
    }

    showButton = (classes) => {
        return (
            <IconButton
                className={ classes.delete }
                aria-label="edit"
                onClick={this.toggle}>
                <EditIcon />
            </IconButton> 
        )
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
                        Editar { this.props.supply.name } 
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
                                <Label for="supply">
                                    Quantidade
                                </Label>
                                <Input 
                                    type="number"
                                    min="1"
                                    name="quantity"
                                    value={ this.state.quantity }
                                    id="supply"
                                    placeholder="Digite a quantidade"
                                    className="mb-3"
                                    onChange={this.onChange} 
                                />                                
                                <FormControlLabel
                                    className="mb-3"
                                    control={
                                    <LightSwitch
                                        name="didactic"                                        
                                        checked={this.state.didactic}
                                        onChange={this.onChange}
                                        value="didactic"
                                        color="primary"                                        
                                    />
                                    }
                                    label="O Material é Devolvível?"
                                />
                                <Button
                                    className={ classes.buttons }
                                    fullWidth={true}
                                    variant="outlined"
                                    onClick={this.onSubmit}
                                >
                                    Editar Material
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
    grade: state.grade,
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

export default connect(mapStateToProps, { clearErrors, editSupply })(withStyles(styles)(SupplyModal));