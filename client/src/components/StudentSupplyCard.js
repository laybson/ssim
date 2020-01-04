import React, { Component } from 'react';
import { Button, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addStudent } from '../actions/studentActions';

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

    receiveSupply = (supply, incomplete, obs) => {
        if(!this.isReceivedSupply(supply)){
            this.props.student.receivedSupplies = [{id: supply._id, incomplete: incomplete, obs: obs}, ...this.props.student.receivedSupplies]
        } else if (!this.isFullyReceivedSupply(supply)){
            let ss = this.props.student.receivedSupplies.find(s=>s.id === supply._id);
            if(ss) {
                ss.incomplete = incomplete;
                ss.obs = obs;
            }                
        }
        if(this.isFullyReceivedSupply(supply)){
            this.setState({isReceived:true})
            this.setState({incomplete:false})
        }
    }

    returnSupply = (supply) => {
        if(!this.isReturnedSupply(supply)){
            this.props.student.returnedSupplies = [{id: supply._id}, ...this.props.student.returnedSupplies]
        }
        if(this.isReturnedSupply(supply)){
            this.setState({isReturned:true})
        }
    }

    removeReceive = (supply, incomplete, obs) => {
        if(this.isReceivedSupply(supply)){
            let ss = this.props.student.receivedSupplies.find(s=>s.id === supply._id);
            if(ss) {
                ss.incomplete = incomplete;
                ss.obs = obs;
            } 
            if(!ss.incomplete)
                this.props.student.receivedSupplies = this.props.student.receivedSupplies.filter(ss => ss.id !== supply._id);
        }
        if(!this.isFullyReceivedSupply(supply)){
            this.setState({isReceived:false})
        }
    }

    removeReturn = (supply) => {
        if(this.isReturnedSupply(supply)){
            this.props.student.returnedSupplies = this.props.student.returnedSupplies.filter(ss => ss.id !== supply._id);
        }
        if(!this.isReturnedSupply(supply)){
            this.setState({isReturned:false})
        }
    }

    onReceiveClick = (supply) => {
        this.setState({incomplete:false})
        this.receiveSupply(supply, false, this.state.obs);
    }

    onReceiveIncompleteClick = (supply) => {
        this.setState({incomplete:true})
        this.receiveSupply(supply, true, this.state.obs);
    }

    onReturnClick = (supply) => {
        this.returnSupply(supply);
    }

    onChange = (e) => {        
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    showObs = () => {
        return this.state.incomplete ?
            (
                <div>
                    <Label for="supply">
                        Obs.
                    </Label>
                    <Input 
                        type="text"
                        name="obs"
                        id="supply"
                        placeholder="Digite a observação"
                        className="mb-3"
                        onChange={this.onChange} 
                    />
                    <span>{ this.state.obs }</span>
                </div>
            ) : null
    }

    showButton = (supply) => {
        if(!this.props.isAuthenticated || !(this.props.receiving || this.props.returning)){
            return null;
        }
        if(this.props.receiving){
            if(this.isFullyReceivedSupply(supply)){
                return(
                    <div>                        
                        <Button 
                            className="remove-btn"
                            style={{marginLeft: '1rem'}}
                            color="dark"
                            size="sm"
                            onClick={this.removeReceive.bind(this, supply, this.state.obs)}
                        >
                            Remover Recebimento
                        </Button>
                    </div>
                    
                )
            }
            if(!this.isFullyReceivedSupply(supply)){
                return(
                    <div>
                        <Button 
                            className="remove-btn"
                            style={{marginLeft: '1rem'}}
                            color="dark"
                            size="sm"
                            onClick={this.onReceiveIncompleteClick.bind(this, supply)}
                        >
                            Pera
                        </Button>
                        <Button 
                            className="remove-btn"
                            style={{marginLeft: '1rem'}}
                            color="dark"
                            size="sm"
                            onClick={this.onReceiveClick.bind(this, supply)}
                        >
                            Receber
                        </Button>
                    </div>
                )
            }            
        } else if(this.props.returning){
            if(!this.isFullyReceivedSupply(supply)){
                return(
                    <div>Material não recebido</div>
                )
            }
            if(this.isReturnedSupply(supply)){
                return(
                    <Button 
                        className="remove-btn"
                        style={{marginLeft: '1rem'}}
                        color="dark"
                        size="sm"
                        onClick={this.removeReturn.bind(this, supply)}
                    >
                        Desfazer Devolução
                    </Button>
                )
            }
            if(!this.isReturnedSupply(supply)){
                return(
                    <Button 
                        className="remove-btn"
                        style={{marginLeft: '1rem'}}
                        color="dark"
                        size="sm"
                        onClick={this.onReturnClick.bind(this, supply)}
                    >
                        Devolver
                    </Button>
                )
            }            
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

        return(
            <div>
                { supply.quantity+" "+supply.name }
                { this.showButton(supply) }
                { this.showObs() }
                <br></br>
                { this.showStatus() }                
            </div>
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
)(StudentSupplyCard);