import axios from "axios";
import { api } from "../constatns";

const getAll = async () => {
    try {
        const response = await axios.get(api+'eventtypes/');
        return response.data;
    } catch (error) {
        console.log("Error while fetching event types: ", error);
    }
};

const getById = async (id) => {
    try {
        const response = await axios.get(api+'eventtypes/eventtypeid/'+id);
        return response.data;
    } catch (error) {
        console.log("error while fetch data: ", error)
    }
};

const add = async (payload) => {
    try {
        const response = await axios.post(api+'eventtypes/add', payload);
        return response.data;
    } catch (error) {
        console.log("error while adding event type: ", error);
    }
};

const update = async (id, payload) => {
    try {
        const response = await axios.put(api+'eventtypes/update/'+id, payload);
        return response.data;
    } catch (error) {
        console.log("error while updating data: ", error);
    }
};

const detele = async (id) => {
    try {
        const response = await axios.delete(api+'eventtypes/delete/'+id);
        return response.data;
    } catch (error) {
        console.log("error while deleting event type: ", error);
    }
};

export {getAll, getById, add, update, detele};