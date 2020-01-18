import React, { Component, Fragment } from 'react';
import { Role } from './auth/Roles';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container
} from 'reactstrap';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RegisterModal from './auth/RegisterModal';
import LoginModal from './auth/LoginModal';
import Logout from './auth/Logout';

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    nav: {
        backgroundColor: 'rgba(207, 31, 37, 1)'
    },
    rightSection: {
        color: 'white',
        display: 'flex',
        
    },
    icon: {
        color: 'white',
    },
});

class AppNavbar extends Component {
    state = {
        isOpen: false
    }

    static propTypes = {
        auth: PropTypes.object.isRequired
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render() {
        const { classes } = this.props;
        const { isAuthenticated, user } = this.props.auth;

        const authLinks = (
            <Fragment>
                <NavItem>
                    <span className="navbar-text mr-3" >
                        <strong>
                            {  user ? `Olá ${user.name}` : '' }
                        </strong>
                    </span>
                </NavItem>
                { user && user.role === Role.Admin ? 
                    <Fragment>
                        <NavLink href="/history">                    
                            Histórico
                        </NavLink>
                        <NavLink href="/management">
                            Gerenciar
                        </NavLink>
                        <NavLink href="/report">
                            Relatório
                        </NavLink>  
                    </Fragment> : '' }                
                <NavItem>
                    <Logout />
                </NavItem>                
            </Fragment>
        )

        const guestLinks = (
            <Fragment>
                <NavItem>
                    <RegisterModal />
                </NavItem>
                <NavItem>
                    <LoginModal />
                </NavItem>
            </Fragment>
        )

        return (
            <div>
                <Navbar style={{backgroundColor: 'rgba(187, 21, 27, 1)'}} dark expand="sm" className="mb-4">
                    <Container className={classes.rightSection}>
                        <NavbarBrand href="/">
                            ssim
                        </NavbarBrand>
                        <NavbarToggler onClick={this.toggle}/>
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                { isAuthenticated ? authLinks : guestLinks }                                
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </div>
        );        
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, null)(withStyles(styles)(AppNavbar));