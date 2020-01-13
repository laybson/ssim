import React, { Component } from 'react';
import UsersList from '../components/UsersList';
import { Container, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    titleGrade: {
        color: 'rgba(207, 31, 37, 1)',
        textAlign: 'center',
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});

class UserPage extends Component {   

    render() {
        const { classes } = this.props;
        
        return (      
            <Container className={classes.root}>
                <Typography className={classes.titleGrade} variant='h6'>
                    Gerenciar Usuários
                </Typography>
                <UsersList />    
            </Container>            
        );
    }
}

export default withStyles(styles)(UserPage);