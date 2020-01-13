import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { Box } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { getGradeSupplies, deleteSupply } from '../actions/supplyActions';
import PropTypes from 'prop-types';
import StudentSupplyCard from './StudentSupplyCard';

const styles = theme => ({
    root: {
        paddingTop: '.1rem',
        paddingRight: '1rem',
        paddingBottom: '.1rem',
        paddingLeft: '1rem'
    },    
});

class StudentSuppliesList extends Component {
    static propTypes = {
        getGradeSupplies: PropTypes.func.isRequired,
        student: PropTypes.object.isRequired,
        grade: PropTypes.object.isRequired,
        supply: PropTypes.object.isRequired,
        receiving: PropTypes.bool,
        returning: PropTypes.bool,
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

    checkDidactic = (ss) => {
        return ss.didactic;
    }

    didacticSupplies = () => {
        return this.props.supply.supplies.filter(this.checkDidactic);
    }

    showCard = (ss) => {
        if(this.props.receiving){
            return(
                <StudentSupplyCard
                    student={ this.props.student }
                    supply={ ss } 
                    receiving={ true }/>
            )
        }else if(this.props.returning){
            return(
                <StudentSupplyCard
                    student={ this.props.student }
                    supply={ ss } 
                    returning={ true }/>
            )
        }
        return(
            <StudentSupplyCard
                student={ this.props.student }
                supply={ ss }/>
        )
    }

    render() {
        const supplies = this.props.returning ? this.didacticSupplies() : this.props.supply.supplies;
        const { classes } = this.props;

        return(
            <Box>
                <ListGroup>
                    <TransitionGroup className="grade-list">
                        {supplies.map((i) => (
                            <CSSTransition key={i._id} timeout={500} classNames="fade">
                                <ListGroupItem className={ classes.root }>
                                    { this.showCard(i) }
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                        </TransitionGroup>
                </ListGroup>
            </Box>
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
)(withStyles(styles)(StudentSuppliesList));