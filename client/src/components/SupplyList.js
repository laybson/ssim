import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { Box } from '@material-ui/core';
import { getGradeSupplies, deleteSupply } from '../actions/supplyActions';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import SupplyCard from './SupplyCard';
import ImportSuppliesModal from './ImportSuppliesModal';

const styles = theme => ({
    root: {
        paddingTop: '0rem',
        paddingRight: '1rem',
        paddingBottom: '0rem',
        paddingLeft: '1rem'
    },    
});

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

    showImport = (supplies) => {
        return supplies.length > 0 ? <Box></Box> : <ImportSuppliesModal />
    }

    render() {
        const supplies = this.props.supply.supplies;
        const { classes } = this.props;        

        return(
            <Box>
                { this.showImport(supplies) }
                <ListGroup>
                    <TransitionGroup className="grade-list">                        
                        {supplies.map((i) => (
                            <CSSTransition key={i._id} timeout={500} classNames="fade">
                                <ListGroupItem className={ classes.root }>
                                    <SupplyCard
                                        supply={ i } />
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
)(withStyles(styles)(SupplyList));