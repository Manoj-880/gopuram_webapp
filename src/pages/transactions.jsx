import React, { useEffect, useState } from 'react';
import { getAll } from '../api_calls/transactionsAi';
import RefreshIcon from '@mui/icons-material/Refresh';

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        fetchTransaction();
    }, []);

    const fetchTransaction = async () => {
        var response = await getAll();
        setTransactions(response.data);
    };

    const handleRefresh = () => {
        window.location.reload();
    };

    const handleDonationType = (transaction) => {
        if (transaction.donationType.title === "Others"){
            return transaction.donationName;
        } else {
            return transaction.donationType.title;
        }
    }

    const formatTime = (timeString) => {
        const time = new Date(timeString);
        let hours = time.getHours();
        const minutes = time.getMinutes().toString().padStart(2, '0');
        let amPm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12; 
        const formattedTime = `${hours}:${minutes} ${amPm}`;
        return formattedTime;
    }      

    return (
        <div className='webUsers'>
            <div>
                <div className='web-header'>
                    <h1>Transactions</h1>
                    <button onClick={handleRefresh} className='AddUser'><RefreshIcon/> <p>Refresh</p></button>
                </div>
                <hr />
                <table className='userTable'>
                    <thead>
                        <tr>
                            <th>User Name</th>
                            <th>Donation Type</th>
                            <th>Amount</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map(transaction => (
                            <tr key={transaction._id} style={{alignSelf:"center"}}>
                                <td>{transaction.userId.userName}</td>
                                <td>{handleDonationType(transaction)|| "Undefined"}</td>
                                <td>{transaction.donationType.amount || transaction.amount || "Undefined"}</td>
                                <td>{formatTime(transaction.createdAt)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div> 
        </div>
    );
};

export default Transactions;
