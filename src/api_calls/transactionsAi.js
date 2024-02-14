import axios from "axios";
import { api } from "../constatns";

const getAll = async () => {
    try {
        const response = await axios.get(api+'transactions/');
        return response.data;
    } catch (error) {
        console.log('Error fetching transactions: ', error);
    }
}

export {getAll}