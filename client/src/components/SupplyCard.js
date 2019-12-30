import React, { Component } from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteSupply } from '../actions/supplyActions';

class SupplyCard extends Component {
    static propTypes = {
        isAuthenticated: PropTypes.bool
    }

    onDeleteClick = (id) => {
        this.props.deleteSupply(id);
    }

    render() {
        const supply = this.props.supply;

        return(
            <div>
                { supply.quantity+" "+supply.name }
                { this.props.isAuthenticated ?
                    <Button 
                        className="remove-btn"
                        style={{marginLeft: '1rem'}}
                        color="danger"
                        size="sm"
                        onClick={this.onDeleteClick.bind(this, supply._id)}
                    >
                        &times;
                    </Button> :
                    null
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(
    mapStateToProps, 
    { deleteSupply }
)(SupplyCard);