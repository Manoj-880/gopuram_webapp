import axios from "axios";
import { api } from "../constatns";

const getAll = async () => {
    try {
        const response = await axios.get(api+'donationtypes/');
        return response.data;
    } catch (error) {
        console.log('Error while fetchng donation types: ', error);
    }
};

const getById = async (id) => {
    try {
        const response = await axios.get(api+'donationtypes/donationid/'+id);
        return response.data;
    } catch (error) {
        console.log("error while fetching donation type: ", error);
    }
};

const add = async (payload) => {
    try {
        const response = await axios.post(api+'donationtypes/add', payload);
        return response.data;
    } catch (error) {
        console.log('Error while adding donation type: ', error);
    }
};

const update = async (id, payload) => {
    try {
        const response = await axios.put(api+'donationtypes/update/'+id, payload);
        return response.data;
    } catch (error) {
        console.log("error while updating donation type: ", error);
    }
};

export {getAll, getById, add, update};