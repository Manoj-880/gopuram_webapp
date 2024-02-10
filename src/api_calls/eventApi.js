import axios from "axios";
import { api } from "../constatns";

const getAll = async () => {
    try {
        const response = await axios.get(api+'events/');
        return response.data;
    } catch (error) {
        console.log("Error while fetching events: ", error);
    }
};

const getById = async (id) => {
    try {
        const response = await axios.get(api+'events/eventid/'+id);
        return response.data;
    } catch (error) {
        console.log('Error while fetching event: ', error);
    }
};

const add = async (payload) => {
    try {
        const response = await axios.post(api+'events/add', payload);
        return response.data;
    } catch (error) {
        console.log("error while adding event: ", error);
    }
};

const update = async (id, payload) => {
    try {
        const response = await axios.put(api+'events/update/'+id, payload);
        return response.data;
    } catch (error) {
        console.log("Error while updating event: ", error);
    }
};

const deleteById = async (id) => {
    try {
        const response = await axios.delete(api+'events/delete/'+id);
        return response.data;
    } catch (error) {
        console.log("error while deleting event: ", error);
    }
};

export {getAll, getById, update, add, deleteById};