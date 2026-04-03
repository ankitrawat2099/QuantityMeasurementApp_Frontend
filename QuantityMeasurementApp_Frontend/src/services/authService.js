import axios from "axios";

export const loginUser = async (data) => {
    const res = await axios.post("http://localhost:5263/api/Auth/login", data);

    return res.data;
};

export const signupUser = async (data) => {
    const res = await axios.post("http://localhost:5263/api/Auth/signup", data);
    return res.data;
};