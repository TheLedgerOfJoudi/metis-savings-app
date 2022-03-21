
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import './InfoBox.css';
import { ADDRESS, ABI, DECIMALS } from "./../config";

function InfoBox(props){

    const [etherBalance, setEtherBalance] = useState(0);
    const [savusBalance, setSavusBalance] = useState(false);
    const [goalAmount, setGoalAmount] = useState(0);
    // const [expiration, setExpiration] = useState(0);
    const [timeToExpire, setTimeToExpire] = useState(0);

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
        function toDateTime(secs) {
            var t = new Date(1970, 0, 1); // Epoch
            t.setSeconds(secs);
            return t;
        }
        const updateInfo = async () => {
            const curAddress = await getAddress();
        

            // let _expiration = await contract.getExpirations(curAddress);

            let _etherBalance = await contract.getEtherBalances(curAddress);
            
            let _savusBalance = await contract.getSavusBalances(curAddress);
            
            let _goalAmount = await contract.getGoalAmounts(curAddress);
            
            await sleep(1000);

            // if (parseInt(_expiration) !== 0)
            //     setTimeToExpire(parseInt(parseInt(_expiration) - (Date.now() / 1000)));
            if (timeToExpire && timeToExpire > 0)
                setTimeToExpire(val => val - 1);
            else if (timeToExpire){
                setTimeToExpire(-1);
            }
            setEtherBalance(parseInt(_etherBalance));
            setSavusBalance(_savusBalance);
            setGoalAmount(parseInt(_goalAmount));
            // setExpiration(parseInt(_expiration));
            // console.log(timeToExpire)
        }

        const interval = setInterval(() => {
            updateInfo();
        }, 1000);
        return () => {clearInterval(interval)}

    }, [])

    const getAddress = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        return address;
    }

    if (timeToExpire){
        if(timeToExpire > 0){
            return (
                <div className='info-box'>
                Metis Balance: {etherBalance}
                <hr/>
                Savus Balance: {savusBalance ? "1" : "0"}
                <hr/>
                Goal Amount: {goalAmount}
                <hr/>
                {/* {"You can attempt withdrawing in " + timeToExpire + " seconds" } */}
            </div>
            )
        }
        else{
            // "You can withdraw if you've met your goal"
            return (
                <div className='info-box'>
                Metis Balance: {etherBalance}
                <hr/>
                Savus Balance: {savusBalance ? "1" : "0"}
                <hr/>
                Goal Amount: {goalAmount}
                <hr/>
                {/* {"You can withdraw if you've met your goal"} */}
            </div>
            )
        }
    }
    return (
        <div className='info-box'>
                Metis Balance: {etherBalance}
                <hr/>
                Savus Balance: {savusBalance ? "1" : "0"}
                <hr/>
                Goal Amount: {goalAmount}
                <hr/>
        </div>
    )
    
}

export {InfoBox};
