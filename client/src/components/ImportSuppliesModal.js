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
import { Button, Box } from '@material-ui/core';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { addSupply } from '../actions/supplyActions';
import { getGrades } from '../actions/gradeActions';
import { getGradeSupplies } from '../actions/supplyActions';
import PropTypes from 'prop-types';
import { clearErrors } from '../actions/errorActions';

const styles = theme => ({
    root: {
        flexGrow: 1,
        display: 'flex',
        width: '100%',
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

class ImportSuppliesModal extends Component {
    state = {
        modal: false,
        selectedGrade: 0,
        importedSupplies: []
    }

    static propTypes = {
        user: PropTypes.object,
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        getGrades: PropTypes.func.isRequired,
        getGradeSupplies: PropTypes.func.isRequired,
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

    componentDidMount() {
        this.props.getGrades();
    }

    toggle = () => {        
        this.props.clearErrors();
        this.setState({
            modal: !this.state.modal,
            didactic: false
        });
    }

    onChange = (e) => {
        let value = e.target.value;        
        this.setState({
            [e.target.name]: value
        });        
    }

    gradesOptions = () => {
        return this.props.grade.grades.map(grade => {
            return grade._id !== this.props.grade.grade._id ? 
                <option key={grade._id} value={grade._id}>{ grade.name+" "+grade.shift }</option> :
                null
        })
    }

    getImportedSupplies = id => {
        axios.get(`/api/supplies/grade/${id}`)
            .then(res => {
                this.setState({
                    importedSupplies: res.data
                });
                
            })
    }

    onSubmit = (e) => {
        e.preventDefault();
        if(this.state.selectedGrade) {
            axios.get(`/api/supplies/grade/${this.state.selectedGrade}`)
                .then(res => {
                    this.setState({
                        importedSupplies: res.data
                    });
                    this.state.importedSupplies.forEach(supply => {
                        const newSupply = {
                            name: supply.name,
                            grade: this.props.grade.grade._id,
                            quantity: supply.quantity,
                            didactic: supply.didactic
                        }

                        this.props.addSupply(newSupply);
                    });
            })
        }
        this.toggle();
    }

    render() {
        const { classes } = this.props;

        return(
            <Box className={ classes.root }>
                { this.props.isAuthenticated && (this.props.user.role === Role.Admin || this.props.user.role === Role.User) ?
                    <Button
                        className={ classes.buttons }
                        fullWidth={true}
                        variant="outlined"
                        onClick={this.toggle}
                    >
                        Importar Materiais
                    </Button> :
                    null
                }
                
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>
                        Importar Materiais
                    </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="selectedGrade">
                                    Turma
                                </Label>
                                <Input 
                                    type="select"
                                    defaultValue={this.state.level}
                                    name="selectedGrade"
                                    id="selectedGrade"
                                    placeholder="Selecione a turma"
                                    className="mb-3"
                                    onChange={this.onChange} 
                                >
                                    <option value="">Selecione a Turma</option>
                                    { this.gradesOptions() }
                                </Input>                                                           
                                <Button
                                    className={ classes.buttons }
                                    fullWidth={true}
                                    variant="outlined"
                                    onClick={this.onSubmit}
                                >
                                    Importar Materiais
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
    user: state.auth.user,
    grade: state.grade,
    supply: state.supply,
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

export default connect(mapStateToProps, { getGrades, getGradeSupplies, addSupply, clearErrors })(withStyles(styles)(ImportSuppliesModal));