const { api } = require("../config")

const getAllTasksService = async () => await api.get("/tasks").then(res => res.data)
const getTaskByIdService = async ({ id }) => await api.get(`/tasks/${id}`).then(res => res.data)
const createTaskService = async ({ task }) => await api.post("/tasks", task).then(res => res.data)
const updateTaskService = async ({ id, task }) => await api.put(`/tasks/${id}`, task).then(res => res.data)
const deleteTaskService = async ({ id }) => await api.delete(`/tasks/${id}`).then(res => res.data)

export {
    getAllTasksService,
    getTaskByIdService,
    createTaskService,
    updateTaskService,
    deleteTaskService
}