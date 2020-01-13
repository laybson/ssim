import React, { Component } from 'react';
import { 
    Container, 
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    TablePagination,
    Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { getHistory } from '../actions/historyActions';
import PropTypes from 'prop-types';

const styles = theme => ({
    root: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    table: {
        minWidth: 650,
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

class HistoryPage extends Component {
    state = {
        page: 0,
        rowsPerPage: 25,
    }

    static propTypes = {
        getHistory: PropTypes.func.isRequired,
        history: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool
    }

    componentDidMount() {
        this.props.getHistory();
    }

    handleChangePage = (event, newPage) => {
        this.setState({
            page: newPage
        });
    };

    handleChangeRowsPerPage = event => {
        this.setState({
            page: 0,
            rowsPerPage: event.target.value
        });
    };

    render() {
        const { history } = this.props.history;
        const { classes } = this.props;

        return (
            <Container className={classes.root}>
                <Typography className={classes.titleGrade} variant='h6'>
                    Histórico
                </Typography>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableBody>
                            {history.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map(i => (
                                <TableRow key={i._id}>
                                    <TableCell component="th" scope="row">
                                        { i.student.name+" da turma "+
                                        i.grade.name+" "+i.grade.shift+
                                        " foi modificada(o) por "+i.user.name+
                                        " em "+new Date(i.register_date).getDate()+
                                        "/"+(new Date(i.register_date).getMonth()+1)+
                                        "/"+new Date(i.register_date).getFullYear()+
                                        " às "+new Date(i.register_date).getHours()+
                                        "h"+new Date(i.register_date).getMinutes() }
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    labelDisplayedRows={({ from, to, count }) =>from+"-"+((to === -1) ? count : to)+" de "+count}
                    labelRowsPerPage='Dados por página:'
                    rowsPerPageOptions={[25, 50, 100]}
                    component="div"
                    count={history.length}
                    rowsPerPage={this.state.rowsPerPage}
                    page={this.state.page}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
            </Container>           
        );
    }
}

const mapStateToProps = (state) => ({
    history: state.history,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { getHistory })(withStyles(styles)(HistoryPage));