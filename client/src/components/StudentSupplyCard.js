import React, { Component } from 'react';
import { Role } from './auth/Roles';
import {    
    Box,
    Grid,
    Input,
    Slider,
    Switch,
    InputLabel, 
    Tooltip,
    FormControlLabel } from '@material-ui/core';
import StopIcon from '@material-ui/icons/Stop';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addStudent } from '../actions/studentActions';

const styles = theme => ({
    root: {
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
    },
    obs: {
        color: 'rgba(0, 0, 0, .5)',
    },
    slider: {
        marginTop: 6,
    },
    switch: {
        marginTop: 9,
    },
    reportFalse: {
        color: 'rgba(207, 31, 37, 1)'
    },
    reportPending: {
        color: 'rgba(217, 207, 17, 1)',
    },
    reportTrue: {
        color: 'rgba(31, 207, 37, 1)',
    },
});

const LightSwitch = withStyles({
    switchBase: {
        color: 'rgba(207, 31, 37, 1)',
        '&$checked': {
            color: 'rgba(31, 207, 37, 1)',
        },
        '& + $track': {
            backgroundColor: 'rgba(207, 31, 37, 1)',
        },
        '&$checked + $track': {
            backgroundColor: 'rgba(31, 207, 37, 1)',
        },
    },
    checked: {},
    track: {},
  })(Switch);

const PrettoSlider = withStyles({
    root: {
        height: 8,
    },
    thumb: {
        height: 20,
        width: 20,
        border: '2px solid currentColor',
        marginTop: -6,
        marginLeft: -12,
        '&:focus,&:hover,&$active': {
            boxShadow: 'inherit',
        },
    },
    active: {},
    valueLabel: {
         left: 'calc(-50% + 4px)',
    },
    track: {
        marginTop: -3,
        height: 14,
        borderRadius: 8,
    },
    rail: {
        marginTop: -3,      
        height: 14,
        borderRadius: 8,
    },
  })(Slider);

class StudentSupplyCard extends Component {
    state = {
        isReceived: false,
        isReturned: false,
        incomplete: false,
        obs: ''
    }

    static propTypes = {
        user: PropTypes.object,
        student: PropTypes.object.isRequired,
        receiving: PropTypes.bool,
        returning: PropTypes.bool,
        isReceived: PropTypes.bool,
        isReturned: PropTypes.bool,
        isAuthenticated: PropTypes.bool
    }

    componentDidMount = () => {
        this.setState({isReceived:this.isFullyReceivedSupply(this.props.supply)})
        this.setState({isReturned:this.isReturnedSupply(this.props.supply)})
        this.setState({incomplete:this.isReceivedSupply(this.props.supply)&&!this.isFullyReceivedSupply(this.props.supply)})
        this.setState({obs:this.getObs(this.props.supply)})
    }

    getObs = (supply) => {
        if(this.isReceivedSupply(supply)){
            return this.props.student.receivedSupplies.find(ss => ss.id === supply._id).obs;
        }
        return '';
    }

    setObs = (supply, obs) => {
        let ss = this.props.student.receivedSupplies.find(s=>s.id === supply._id);
        if(ss) {
            ss.obs = obs;
        }
    }

    isReceivedSupply = (supply) => {
        return this.props.student.receivedSupplies.some(ss => ss.id === supply._id)
    }

    isFullyReceivedSupply = (supply) => {
        return this.props.student.receivedSupplies.some(ss => 
            (ss.id === supply._id && !ss.incomplete))
    }

    isReturnedSupply = (supply) => {
        return this.props.student.returnedSupplies.some(ss => ss.id === supply._id)
    }

    receiveSupply = (supply, v, obs) => {
        if(v === 0){
            this.props.student.receivedSupplies = this.props.student.receivedSupplies.filter(ss => ss.id !== supply._id);
        }else{
            let incomplete = false;
            if(v === 1){
                incomplete = true;
            }else if(v === 2){
                incomplete = false;
            }
            if(!this.isReceivedSupply(supply)){
                this.props.student.receivedSupplies = [{id: supply._id, incomplete: incomplete, didactic: supply.didactic, obs: this.state.obs}, ...this.props.student.receivedSupplies]
            } else {
                let ss = this.props.student.receivedSupplies.find(s=>s.id === supply._id);
                if(ss) {
                    ss.incomplete = incomplete;
                    ss.obs = obs;
                }                
            }
        }
    }

    returnSupply = (supply) => {
        if(!this.state.isReturned){
            this.props.student.returnedSupplies = [{id: supply._id}, ...this.props.student.returnedSupplies];
        }
        if(this.state.isReturned){
            this.props.student.returnedSupplies = this.props.student.returnedSupplies.filter(ss => ss.id !== supply._id);
        }
    }

    onReceiveClick = (supply, e, v) => {
        this.mapValueToReceiveState(v);
        this.receiveSupply(supply, v, this.state.obs);        
    }

    mapValueToReceiveState = (value) => {
        if(value === 0){
            this.setState({isReceived:false});
            this.setState({incomplete:false});
        }else if(value === 1){
            this.setState({isReceived:false});
            this.setState({incomplete:true});
        }else if(value === 2){
            this.setState({isReceived:true});
            this.setState({incomplete:false});
        }            
    }

    mapReceiveStateToValue = () => {
        if(!this.state.isReceived){
            if(this.state.incomplete){
                return 1;
            }
            return 0;
        }
        return 2;
    }

    onReturnClick = (supply) => {
        this.setState({isReturned:!this.state.isReturned});
        this.returnSupply(supply);
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    showObs = (classes) => {        
        return this.state.incomplete && this.props.receiving ?
            (
                this.props.user.role === Role.Admin || this.props.user.role === Role.User ?
                    <Box>
                        <InputLabel htmlFor="obs">Obs.:</InputLabel>
                        <Input
                            value={ this.state.obs }
                            name="obs"
                            id="obs"
                            placeholder="Digite a observação"
                            className="mb-3"
                            fullWidth={true}
                            onChange={this.onChange} 
                        />
                    </Box> : 
                    <Box className={ classes.obs }>
                        Obs.: { this.state.obs }
                    </Box>
            ) : null
    }

    report = (classes, value) => {
        if(value === 2){
            return classes.reportTrue;
        }else if(value === 1) {
            return classes.reportPending;
        }
        return classes.reportFalse;
    }

    showButton = (supply, classes) => {
        if(!this.props.isAuthenticated || !(this.props.receiving || this.props.returning)){
            return null;
        }
        if(this.props.receiving){
            const defaultValue = this.mapReceiveStateToValue();
            return this.props.user.role === Role.Admin || this.props.user.role === Role.User ? (                
                <PrettoSlider
                    className={this.report(classes,this.mapReceiveStateToValue())}
                    defaultValue={defaultValue}
                    value={this.mapReceiveStateToValue()}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="off"
                    onChange={this.onReceiveClick.bind(this, supply)}
                    step={1}
                    marks
                    min={0}
                    max={2}
                />                
            ) : <StopIcon 
                    className={ this.report(classes,this.mapReceiveStateToValue()) }
                    aria-label="report" />;
            
        } else if(this.props.returning){
            if(!this.isFullyReceivedSupply(supply)){
                return(
                    <StopIcon 
                        className={ this.report(classes,this.mapReceiveStateToValue()) }
                        aria-label="report" />
                )
            }
            return this.props.user.role === Role.Admin || this.props.user.role === Role.User ? (
                <FormControlLabel
                    className="mb-3"
                    control={
                    <LightSwitch
                        name="isReturned"
                        checked={this.state.isReturned}
                        onChange={this.onReturnClick.bind(this, supply)}
                        value="isReturned"
                        className={ classes.switch }                                        
                    />
                    }
                />
            ) : <StopIcon 
                    className={ this.report(classes,this.mapReceiveStateToValue()) }
                    aria-label="report" />;
        }
        return null
    }    

    showStatus = () => {
        if(this.props.receiving) {
            return this.state.isReceived ? (<span>Recebido</span>) : (this.state.incomplete ? <span>Pendente</span> : <span>Não Recebido</span>)
        } else if(this.props.returning) {
            return this.state.isReturned ? (<span>Devolvido</span>) : (<span>Não Devolvido</span>)
        }
        return null
    }

    render() {
        const supply = this.props.supply;
        const { classes } = this.props;

        return(
            <Box>
                <Tooltip title={this.showStatus()} placement="right">
                    <Grid container spacing={2} className={ classes.root } justify="center">
                        <Grid item xs={12} sm={2} className={ classes.slider }>
                            { this.showButton(supply, classes) }                     
                        </Grid>
                        <Grid item xs={12} sm={10}>
                            { supply.quantity+" "+supply.name }
                        </Grid>
                    </Grid>
                </Tooltip>
                { this.showObs(classes) }
            </Box>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    grade: state.grade,
    students: state.student,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(
    mapStateToProps, 
    { addStudent }
)(withStyles(styles)(StudentSupplyCard));