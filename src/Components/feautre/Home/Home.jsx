import Line from "@/Components/common/Line"
import Papper from "@/Components/common/Papper"
import styles from "./page.module.css"
import CreateTaskPopup from "./popups/CreateTaskPopup"
import { useEffect, useState } from "react"
import { IconButton, LinearProgress, Tooltip } from "@mui/material"
import { createTaskService, deleteTaskService, getAllTasksService, updateTaskService } from "@/api/services/tasks"
import { toast } from "react-toastify"
import AppBar from "./Components/AppBar"
import TaskItem from "./Components/TaskItem"

export default function Home() {

    const [openCreateTaskPopup, setOpenCreateTaskPopup] = useState(false)
    const [processing, setProcessing] = useState(true)
    const [editing, setEditing] = useState({ status: false, task: undefined })
    const [todoTasks, setTodoTasks] = useState([]);
    const [ongoingTasks, setOngoingTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);

    const fetchInitialData = async () => {
        console.log("fetching data");
        getAllTasksService().then(res => {
            const data = res.data;
            setTodoTasks(data.filter(task => task.status === "todo"));
            setOngoingTasks(data.filter(task => task.status === "ongoing"));
            setCompletedTasks(data.filter(task => task.status === "completed"));
        }).catch(err => {
            console.log(err);
            toast.error("Failed to fetch data");
        }).finally(() => {
            setProcessing(false);
        });
    }

    const createTask = (data) => {
        data.id = Math.random().toString(36).substring(7);
        setTodoTasks([...todoTasks, data]);
        setProcessing(true);
        createTaskService({ task: data }).then(res => {
            fetchInitialData();
        }).catch(err => {
            console.log(err);
            toast.error("Failed to create task");
            setTodoTasks(todoTasks.filter(task => task.id !== data.id));
        }).finally(() => {
            setProcessing(false);
        });
    }

    const updateTask = (data) => {
        setProcessing(true);
        updateTaskService({ id: data.id, task: data }).then(res => {
            fetchInitialData();
        }).catch(err => {
            console.log(err);
            toast.error("Failed to update task");
        }).finally(() => {
            setProcessing(false);
        });
    }

    const deleteTask = (id) => {
        setProcessing(true);
        setTodoTasks(todoTasks.filter(task => task.id !== id));
        deleteTaskService({ id }).then(res => {
            fetchInitialData();
        }).catch(err => {
            console.log(err);
            toast.error("Failed to delete task");
        }).finally(() => {
            setProcessing(false);
        });
    }


    const onCreateTaskSubmit = (data) => {
        if (data.editing) {
            updateTask(data.data);
        } else {
            createTask(data.data);
        }
        setOpenCreateTaskPopup(false);
    }

    useEffect(() => {
        fetchInitialData()
    }, [])

    const handleOnDragOver = (e) => {
        e.preventDefault();
        let target = e.target;
        while (target.className !== styles.task_container) target = target.parentElement;
        if (target.style.background === "#f5f5f5") return;
        target.style.transition = "0.1s";
        target.style.background = "#f5f5f5"
    }

    const handleOnDragLeave = (e) => {
        e.preventDefault();
        let target = e.target;
        while (target.className !== styles.task_container) target = target.parentElement
        if (target.style.background === "#ffffff") return;
        target.style.background = "#ffffff"
        target.style.transition = "0";
    }

    const onDragDrop = (e) => {
        e.preventDefault();

        let target = e.target;
        while (target.className !== styles.task_container) target = target.parentElement;
        target.style.background = "#ffffff";
        target.style.transition = "0";

        const task = JSON.parse(e.dataTransfer.getData("task"));
        task.status = target.id;
        setProcessing(true);
        updateTaskService({ id: task.id, task }).then(res => {
            fetchInitialData();
        }).catch(err => {
            console.log(err);
            toast.error("Failed to update task");
        }).finally(() => {
            setProcessing(false);
        });

    }

    return <div style={{ width: "100%", height: "100vh", background: "#f2f2f2" }}>

        {processing && <LinearProgress style={{ position: "fixed", top: 0, left: 0, width: "100%", zIndex: 1000 }} />}

        {/* APP BAR */}
        <AppBar />
        {/* APP BAR */}

        {/* CONTENT */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Papper id='todo' onDrop={onDragDrop} className={styles.task_container} onDragOver={handleOnDragOver} onDragLeave={handleOnDragLeave}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                        <span>TODO</span>
                    </div>
                    <div>
                        <Tooltip title="Create new task">
                            <IconButton className="ic_btn" onClick={() => { setEditing({ status: false, task: undefined }); setOpenCreateTaskPopup(true) }}>
                                <span class="material-symbols-rounded">add</span>
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>
                <Line />

                <div style={{ maxHeight: "80vh", overflowY: 'auto' }}>
                    {
                        todoTasks.map((task) => {
                            return <TaskItem task={task} key={task.id} setEditing={setEditing} setOpenCreateTaskPopup={setOpenCreateTaskPopup} deleteTask={deleteTask} />
                        })
                    }
                </div>
            </Papper>
            <Papper id='ongoing' onDrop={onDragDrop} className={styles.task_container} onDragOver={handleOnDragOver} onDragLeave={handleOnDragLeave}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                        <span>Ongoing</span>
                    </div>
                    <div style={{ visibility: "hidden" }}>
                        <Tooltip title="Create new task">
                            <IconButton className="ic_btn" onClick={() => { setEditing({ status: false, task: undefined }); setOpenCreateTaskPopup(true) }}>
                                <span class="material-symbols-rounded">add</span>
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>
                <Line />

                <div style={{ maxHeight: "80vh", overflowY: 'auto' }}>
                    {
                        ongoingTasks.map((task) => {
                            return <TaskItem task={task} key={task.id} setEditing={setEditing} setOpenCreateTaskPopup={setOpenCreateTaskPopup} deleteTask={deleteTask} />
                        })
                    }
                </div>
            </Papper>
            <Papper id='completed' onDrop={onDragDrop} className={styles.task_container} onDragOver={handleOnDragOver} onDragLeave={handleOnDragLeave}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                        <span>Completed</span>
                    </div>
                    <div style={{ visibility: "hidden" }}>
                        <Tooltip title="Create new task">
                            <IconButton className="ic_btn" onClick={() => { setEditing({ status: false, task: undefined }); setOpenCreateTaskPopup(true) }}>
                                <span class="material-symbols-rounded">add</span>
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>
                <Line />

                <div style={{ maxHeight: "80vh", overflowY: 'auto' }}>
                    {
                        completedTasks.map((task) => {
                            return <TaskItem task={task} key={task.id} setEditing={setEditing} setOpenCreateTaskPopup={setOpenCreateTaskPopup} deleteTask={deleteTask} />
                        })
                    }
                </div>
            </Papper>
        </div>
        {/* CONTENT */}
        <CreateTaskPopup editing={editing.status} defaultValue={editing.task} open={openCreateTaskPopup} onClose={() => { setEditing({ status: false, task: undefined }); setOpenCreateTaskPopup(false) }} onSubmit={onCreateTaskSubmit} />

    </div>
}