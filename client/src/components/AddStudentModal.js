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
import { Button, Box } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { addStudent } from '../actions/studentActions';
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

class AddStudentModal extends Component {
    state = {
        modal: false,
        name: '',
        grade: '',
        returned: [],
        received: []
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
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

        this.grade = this.props.grade.grade._id

        const newStudent = {
            name: this.state.name,
            grade: this.grade,
            received: this.state.received,
            returned: this.state.returned
        }

        this.props.addStudent(newStudent);
        
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
                        Adicionar Estudante
                    </Button> 
                    :
                    null
                }
                
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>
                        Novo Estudante
                    </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="supply">
                                    Nome
                                </Label>
                                <Input 
                                    type="text"
                                    name="name"
                                    id="supply"
                                    placeholder="Digite o nome do estudante"
                                    className="mb-3"
                                    onChange={this.onChange} 
                                />
                                <Button
                                    className={ classes.buttons }
                                    fullWidth={true}
                                    variant="outlined"
                                    onClick={this.onSubmit}
                                >
                                    Adicionar Estudante
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

export default connect(mapStateToProps, { addStudent, clearErrors })(withStyles(styles)(AddStudentModal));