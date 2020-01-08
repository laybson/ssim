import React, { Component } from 'react';
import { Box, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteSupply } from '../actions/supplyActions';

const styles = theme => ({
    root: {
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
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

class SupplyCard extends Component {
    static propTypes = {
        isAuthenticated: PropTypes.bool
    }

    onDeleteClick = (id) => {
        this.props.deleteSupply(id);
    }

    render() {
        const supply = this.props.supply;
        const { classes } = this.props;

        return(
            <Box className={ classes.root }>
                { supply.quantity+" "+supply.name }
                { this.props.isAuthenticated ?
                    <IconButton
                        className={ classes.delete }
                        color="secondary" 
                        aria-label="delete"
                        onClick={this.onDeleteClick.bind(this, supply._id)}>
                        <DeleteIcon />
                    </IconButton> :
                    null
                }
            </Box>
        )
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(
    mapStateToProps, 
    { deleteSupply }
)(withStyles(styles)(SupplyCard));