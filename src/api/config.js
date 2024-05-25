import axios from "axios";

export const api = axios.create({
    baseURL: "https://todo-server-r7u4.onrender.com",
})