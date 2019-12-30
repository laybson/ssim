import React, { Component } from 'react';
import GradeList from '../components/GradeList';
import GradeModal from '../components/GradeModal';
import { Container } from 'reactstrap';


class GradeListPage extends Component {

    render() {
        return (      
            <Container>
                <GradeModal />
                <GradeList />
            </Container>            
        );
    }
}

export default GradeListPage;