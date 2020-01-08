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
import { addGrade } from '../actions/gradeActions';
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
        const { classes } = this.props;
        return(
            <Box>
                { this.props.isAuthenticated ? 
                    <Button
                        className="mb-3"
                        fullWidth={true}
                        variant="outlined"
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
                                    className={ classes.buttons }
                                    fullWidth={true}
                                    variant="outlined"
                                    onClick={this.onSubmit}
                                >
                                    Adicionar Turma
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

export default connect(mapStateToProps, { addGrade, clearErrors })(withStyles(styles)(GradeModal));