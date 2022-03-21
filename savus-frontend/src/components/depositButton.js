import { ethers } from "ethers"
import React from "react"
import { ADDRESS, ABI, DECIMALS } from "./../config"
import './depositButton.css';

class DepositButton extends React.Component{

    constructor() {
        super()
        this.state = {
            show: false,
            savusBalance: null,
            weiAmount: null,
            goalAmount: null,
            duration: null
        }
        this.getAddress = this.getAddress.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async getAddress(){
        const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        return address;
    }

    async handleClick(_event) {
        if (this.state.show){
            this.setState({
                show: false
            });
            return;
        }
        let curAddress = await this.getAddress();
        let provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(
            ADDRESS,
            ABI,
            provider
        )
        let _savusBalance = await contract.getSavusBalances(curAddress);
        this.setState({
            show: true,
            savusBalance: _savusBalance
        });
    }

    async handleSubmit(event){
        event.preventDefault()
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(
            ADDRESS,
            ABI,
            signer
        )
        let numOfEthers = ethers.utils.formatEther(this.state.weiAmount);
        const overrides = {
            value: ethers.utils.parseEther(numOfEthers)
        }
        if (this.state.savusBalance){
            const tx = {
                ...overrides,
                to: ADDRESS,
            }
            await signer.sendTransaction(tx);
        }
        else{
            await contract.deposit(this.state.goalAmount, this.state.duration, overrides);
        }
        this.setState({
            show: false
        });
    }

    handleChange(event) {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }

    render(){
        if (this.state.show){
            return (
                <div className="deposit-container">
                    <button onClick={this.handleClick}>
                        Deposit
                    </button>
                        {!this.state.savusBalance ? (
                            <form onSubmit={this.handleSubmit}>
                                <label>Wei Amount
                                <input
                                    type="number"
                                    placeholder="Your wei amount e.g. 10"
                                    name="weiAmount"
                                    value={this.state.weiAmount}
                                    onChange={this.handleChange}
                                />
                                </label>
                                
                                <label>Goal Amount
                                <input
                                    type="number"
                                    placeholder="Your goal's wei amount e.g. 1000"
                                    name="goalAmount"
                                    value={this.state.goalAmount}
                                    onChange={this.handleChange}
                                />
                                </label>

                                <label>Duration
                                <input
                                    type="number"
                                    placeholder="Enter duration in seconds"
                                    name="duration"
                                    value={this.state.duration}
                                    onChange={this.handleChange}
                                />
                                </label>

                                <button type="submit">Submit</button>
                                <hr />
                            </form>

                        ) : (
                            <form onSubmit={this.handleSubmit}>
                                <label> Wei Amount
                                    <input
                                        type="number"
                                        placeholder="Your wei amount e.g. 10"
                                        name="weiAmount"
                                        value={this.state.weiAmount}
                                        onChange={this.handleChange}
                                    />
                                </label>
                                <button type="submit">Submit</button>
                            </form>
                        )}
                </div>
                
            )
        }
        else{
               return <div className="deposit-container"><button onClick={this.handleClick}>Deposit</button> </div>
        }
    }
}

export default DepositButton;