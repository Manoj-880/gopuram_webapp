import axios from "axios"
import {api} from "../constatns"

const loginform = async (payload) => {
    try {
        const response = await axios.post(api+'webusers/login', payload);
        return response.data;
    } catch (error) {
        console.log('error while login: ', error);
    }
}

const addUser = async (payload) => {
    try {
        const response = await axios.post(api+'webusers/add', payload);
        return response.data
    } catch (error) {
        console.log('error while adding user: ', error);
    }
}

const getAll = async () => {
    try {
        const response = await axios.get(api+'webusers/');
        return response.data;
    } catch (error) {
        console.log('Error fetching users: ', error);
    }
};

const getUserById = async (id) => {
    try {
        const response = await axios.get(api+'webusers/userid/'+id);
        return response.data;
    } catch (error) {
        console.log(`Error fetching user: ${id} is ${error}`);
    }
};

const editUser = async (id, payload) => {
    try {
        const response = await axios.put(api+'webusers/update/'+id, payload);
        return response.data;
    } catch (error) {
        console.log('error whit editing user', error);
    };
};

const deleteUser = async (id) => {
    try {
        const response = await axios.delete(api+'webusers/delete/'+id);
        return response.data;
    } catch (error) {
        console.log('error while deleting the user', error);
    }
}

export {getAll, getUserById, editUser, deleteUser, addUser, loginform};