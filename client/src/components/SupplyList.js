import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getGradeSupplies, deleteSupply } from '../actions/supplyActions';
import PropTypes from 'prop-types';
import SupplyCard from './SupplyCard';

class SupplyList extends Component {
    static propTypes = {
        getGradeSupplies: PropTypes.func.isRequired,
        grade: PropTypes.object.isRequired,
        supply: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool
    }

    componentDidMount = () => {        
        if(this.props.grade.id) {
            this.props.getGradeSupplies(this.props.grade.id);
        }
    }

    onDeleteClick = (id) => {
        this.props.deleteSupply(id);
    }

    render() {
        const supplies = this.props.supply.supplies;        

        return(
            <Container>
                <ListGroup>
                    <TransitionGroup className="grade-list">
                        {supplies.map((i) => (
                            <CSSTransition key={i._id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                    <SupplyCard
                                        supply={ i } />
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                        </TransitionGroup>
                </ListGroup>
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    supply: state.supply,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(
    mapStateToProps, 
    { getGradeSupplies, deleteSupply }
)(SupplyList);