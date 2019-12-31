import React, { Component } from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addStudent } from '../actions/studentActions';

class StudentSupplyCard extends Component {
    state = {
        isReceived: false,
        isReturned: false
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
        this.setState({isReceived:this.isReceivedSupply(this.props.supply,1)})
        this.setState({isReturned:this.isReturnedSupply(this.props.supply)})
    }

    getSupplyQuantity = (supply) => {
        console.log(this.props)
    }

    isReceivedSupply = (supply, quantity) => {
        return this.props.student.receivedSupplies.some(ss => 
            (ss.id === supply._id && ss.quantity >= quantity))
    }

    isReturnedSupply = (supply) => {
        return this.props.student.returnedSupplies.some(ss => ss.id === supply._id)
    }

    receiveSupply = (supply, quantity) => {        
        if(!this.isReceivedSupply(supply, quantity)){
            this.props.student.receivedSupplies = [{id: supply._id, quantity: quantity}, ...this.props.student.receivedSupplies]
        }
        if(this.isReceivedSupply(supply, quantity)){
            this.setState({isReceived:true})
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

    removeReceive = (supply) => {
        if(this.isReceivedSupply(supply, 1)){
            this.props.student.receivedSupplies = this.props.student.receivedSupplies.filter(ss => ss.id !== supply._id);
        }
        if(!this.isReceivedSupply(supply, 1)){
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
        this.receiveSupply(supply, 1);
    }

    onReturnClick = (supply) => {
        this.returnSupply(supply);
    }

    showButton = (supply) => {
        if(!this.props.isAuthenticated || !(this.props.receiving || this.props.returning)){
            return null;
        }
        if(this.props.receiving){
            if(this.isReceivedSupply(supply, 1)){
                return(
                    <Button 
                        className="remove-btn"
                        style={{marginLeft: '1rem'}}
                        color="dark"
                        size="sm"
                        onClick={this.removeReceive.bind(this, supply)}
                    >
                        Remover Recebimento
                    </Button>
                )
            }
            if(!this.isReceivedSupply(supply, 1)){
                return(
                    <Button 
                        className="remove-btn"
                        style={{marginLeft: '1rem'}}
                        color="dark"
                        size="sm"
                        onClick={this.onReceiveClick.bind(this, supply)}
                    >
                        Receber
                    </Button>
                )
            }            
        } else if(this.props.returning){
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