import axios from "axios";
import {api} from "../constatns";

const add = async (payload) => {
    try {
        const response = await axios.post(api+'images/add', payload,{headers: {'Content-Type': 'multipart/form-data'}});
        return response.data;
    } catch (error) {
        console.log(`Error while uploading image ${error}`);
    }
};

const get = async () => {
    try {
        const response = await axios.get(api+'images/');
        return response.data;
    } catch (error) {
        console.log(`Error while fetching images${error}`);
    }
}

const deleteImage = async (id) => {
    try {
        const response = await axios.delete(api+'images/delete/'+id);
        return response.data;
    } catch (error) {
        console.log(`Error while deletng mage ${error}`);
    }
}

export {add,
        get,
        deleteImage};