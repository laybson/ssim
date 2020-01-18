import React, { Component } from 'react';
import { AppBar, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        top: 'auto',
        bottom: 0,
        backgroundColor: "#FFF",
        color: "#555",
    },
    text: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }
});


class Footer extends Component {   

    render() {
        const { classes } = this.props;
        
        return (      
            <AppBar className={classes.root}  position="fixed">
                <Typography className={classes.text}>
                    School Supplies Input Manager
                </Typography>
                <Typography className={classes.text}>
                    © 2020, Laybson
                </Typography>
            </AppBar>            
        );
    }
}

export default withStyles(styles)(Footer);