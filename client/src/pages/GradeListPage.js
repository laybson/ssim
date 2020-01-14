import React, { Component } from 'react';
import GradeList from '../components/GradeList';
import GradeModal from '../components/GradeModal';
import { Container, Box } from '@material-ui/core';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    unlogged: {
        padding: theme.spacing(3),
        alignItems: 'center',
        textAlign: 'center',
        //backgroundColor: 'rgba(187, 21, 27, 1)',
        //backgroundImage: '/school.png'
    },
});

class GradeListPage extends Component {
    static propTypes = {
        isAuthenticated: PropTypes.bool
    }

    showGrades = (classes) => {
        return this.props.isAuthenticated ?
        <Container className={classes.root}>
            <GradeModal />
            <GradeList />
        </Container> : 
        <Box className={classes.unlogged}>
            <img
                src="/school.png"
                alt="Infantil"
                style={{ height: '300px', margin:10 }}
                />
            <img
                src="/elementary.png"
                alt="Infantil"
                style={{ height: '300px', margin:10  }}
                />
        </Box>
    }

    render() {
        const { classes } = this.props;
        
        return (
            this.showGrades(classes)       
        );
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps,{})(withStyles(styles)(GradeListPage));