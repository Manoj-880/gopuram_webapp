import axios from "axios";
import { api } from "../constatns";

const getAll = async () => {
    try {
        const response = await axios.get(api+'mobileusers/');
        return response.data;
    } catch (error) {
        console.log('Error fetching mobile users: ', error);
    }
}

const getUserById = async (id) => {
    try {
        const response = await axios.get(api+'mobileusers/userid/'+id);
        return response.data;
    } catch (error) {
        console.log('error fetching user', error);
    }
};

const editUser = async (id, payload) => {
    try {
        const response = await axios.put(api+'mobileusers/update/'+id, payload);
        return response.data;
    } catch (error) {
        console.log("error while editing user details", error);
    }
};

const deleteUser = async (id) => {
    try {
        const response = await axios.delete(api+'mobileusers/delete/'+id);
        return response.data;
    } catch (error) {
        console.log("error while deleting user", error);
    }
};

export {getAll, getUserById, editUser, deleteUser};