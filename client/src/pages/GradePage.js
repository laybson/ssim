import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteGrade, getGradeById } from '../actions/gradeActions'; 
import SupplyList from '../components/SupplyList';
import StudentList from '../components/StudentList';
import AddSupplyModal from '../components/AddSupplyModal';
import AddStudentModal from '../components/AddStudentModal';

class GradePage extends Component {
    static propTypes = {
        isAuthenticated: PropTypes.bool,
        grade: PropTypes.object.isRequired,
        getGradeById: PropTypes.func.isRequired,
        deleteGrade: PropTypes.func.isRequired
    }

    componentDidMount = () => {
        if(this.props.match.params.id) {
            this.props.getGradeById(this.props.match.params.id);
        }
    }

    onDeleteClick = (id) => {
        this.props.deleteGrade(id)
        window.location = '/';
    }

    render() {
        const grade = this.props.grade.grades;        
                
        return (      
            <Container>
                <Row>
                    <Col>
                        {grade.name+" "+grade.shift}
                    </Col>
                </Row>
                <Row>
                    <Col xs="6">
                        Material
                        <AddSupplyModal />
                        <SupplyList 
                            grade={ {id:this.props.match.params.id} }/>
                    </Col>
                    <Col xs="6">
                        Alunos
                        <AddStudentModal />
                        <StudentList 
                            grade={ {id:this.props.match.params.id} }/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        { this.props.isAuthenticated ?
                            <Button 
                                className="remove-btn"
                                style={{marginLeft: '1rem'}}
                                color="danger"
                                size="sm"
                                onClick={this.onDeleteClick.bind(this, grade._id)}
                            >
                                Apagar Turma
                            </Button> :
                            null
                        }
                    </Col>
                </Row>
            </Container>            
        );
    }
}

const mapStateToProps = (state) => ({
    grade: state.grade,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(
    mapStateToProps, 
    { deleteGrade, getGradeById }
)(GradePage);