import React, { Component } from 'react';
import GradeList from '../components/GradeList';
import GradeModal from '../components/GradeModal';
import { Container } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});

class GradeListPage extends Component {   

    render() {
        const { classes } = this.props;
        
        return (      
            <Container className={classes.root}>
                <GradeModal />
                <GradeList />    
            </Container>            
        );
    }
}

export default withStyles(styles)(GradeListPage);