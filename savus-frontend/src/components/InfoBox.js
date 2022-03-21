
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import './InfoBox.css';
import { ADDRESS, ABI, DECIMALS } from "./../config";

function InfoBox(){

    const [etherBalance, setEtherBalance] = useState(0);
    const [savusBalance, setSavusBalance] = useState(false);
    const [goalAmount, setGoalAmount] = useState(0);
    const [expiration, setExpiration] = useState(0);

    const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }
    
    useEffect( async () => {
        let provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(
            ADDRESS,
            ABI,
            provider
        )

        const curAddress = await getAddress();
        
        let _etherBalance = await contract.getEtherBalances(curAddress);
        
        let _savusBalance = await contract.getSavusBalances(curAddress);
        
        let _goalAmount = await contract.getGoalAmounts(curAddress);

        let _expiration = await contract.getExpirations(curAddress);
        
        await sleep(500);

        setEtherBalance(parseInt(_etherBalance));
        setSavusBalance(_savusBalance);
        setGoalAmount(parseInt(_goalAmount));
        setExpiration(parseInt(_expiration));
        
    }, [])

    const getAddress = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        return address;
    }

    return (
        <div className='info-box'>
            Metis Balance: {etherBalance}
            <hr/>
            Savus Balance: {savusBalance ? "1" : "0"}
            <hr/>
            Goal Amount: {goalAmount}
            <hr/>
            {expiration === 0 ? "" : 
            parseInt(expiration - (Date.now() / 1000)) > 0 ? "You can attempt withdrawing in " + parseInt(expiration - (Date.now() / 1000)) + " seconds" 
            : "You can withdraw if you've met your goal"} 
        </div>
    )
}

export {InfoBox};
