import React, { Component } from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import { Button, Switch, Box, FormControlLabel } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { addSupply } from '../actions/supplyActions';
import PropTypes from 'prop-types';
import { clearErrors } from '../actions/errorActions';

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

        this.grade = this.props.grade.grade._id

        const newSupply = {
            name: this.state.name,
            grade: this.grade,
            quantity: this.state.quantity,
            didactic: this.state.didactic
        }

        this.props.addSupply(newSupply);
        
        this.toggle();
    }

    render() {
        const { classes } = this.props;
        return(
            <Box>
                { this.props.isAuthenticated ? 
                    <Button
                        className={ classes.buttons }
                        fullWidth={true}
                        variant="outlined"
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
                                <FormControlLabel
                                    className="mb-3"
                                    control={
                                    <Switch
                                        name="didactic"
                                        checked={this.state.didactic}
                                        onChange={this.onChange}
                                        value="didactic"
                                        color="primary"                                        
                                    />
                                    }
                                    label="O Material é Didático?"
                                />
                                <Button
                                    className={ classes.buttons }
                                    fullWidth={true}
                                    variant="outlined"
                                    onClick={this.onSubmit}
                                >
                                    Adicionar Material
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
    grade: state.grade,
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

export default connect(mapStateToProps, { addSupply, clearErrors })(withStyles(styles)(AddSupplyModal));