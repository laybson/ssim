import React, { Component } from 'react';
import {    
    Box,
    Grid,
    Input,
    Slider,
    Switch,
    InputLabel, 
    Typography,
    FormControlLabel } from '@material-ui/core';
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
    slider: {
        marginTop: 6,
    }
});

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
        height: 8,
        borderRadius: 4,
    },
    rail: {        
        height: 8,
        borderRadius: 4,
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
                this.props.student.receivedSupplies = [{id: supply._id, incomplete: incomplete, obs: this.state.obs}, ...this.props.student.receivedSupplies]
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
        this.setObs(this.props.supply, e.target.value);
    }

    showObs = () => {        
        return this.state.incomplete ?
            (
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
                </Box>
            ) : null
    }

    showButton = (supply, classes) => {
        if(!this.props.isAuthenticated || !(this.props.receiving || this.props.returning)){
            return null;
        }
        if(this.props.receiving){
            const defaultValue = this.mapReceiveStateToValue();
            return(
                <Grid container spacing={2} className={ classes.root } justify="center">
                    <Grid item xs={12} sm={2} className={ classes.slider }>
                        <PrettoSlider
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
                    </Grid>
                    <Grid item xs={12} sm={10}>
                        <Typography>
                            O material foi recebido?
                        </Typography>
                    </Grid>
                </Grid>
            )
            
        } else if(this.props.returning){
            if(!this.isFullyReceivedSupply(supply)){
                return(
                    <Box>Material não recebido</Box>
                )
            }
            return (
                <FormControlLabel
                    className="mb-3"
                    control={
                    <Switch
                        name="isReturned"
                        checked={this.state.isReturned}
                        onChange={this.onReturnClick.bind(this, supply)}
                        value="isReturned"
                        color="primary"                                        
                    />
                    }
                    label="O Material foi devolvido?"
                />
            )          
        }
        return null
    }

    showStatus = () => {
        if(this.props.receiving) {
            return this.state.isReceived ? (<span>Recebido</span>) : (<span>Não Recebido</span>)
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
                { supply.quantity+" "+supply.name }
                { this.showButton(supply, classes) }
                { this.showObs() }
                <br></br>
                { this.showStatus() }                
            </Box>
        )
    }
}

const mapStateToProps = (state) => ({
    grade: state.grade,
    students: state.student,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(
    mapStateToProps, 
    { addStudent }
)(withStyles(styles)(StudentSupplyCard));