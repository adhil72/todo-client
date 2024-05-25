import { Tooltip } from "@mui/material";
import styles from "../page.module.css";
import Line from "@/Components/common/Line";

const createdDayCounter = (date) => {
    const createdDate = new Date(date);
    const currentDate = new Date();
    const diffTime = Math.abs(currentDate - createdDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

const dueDayCounter = (date) => {
    const dueDate = new Date(date);
    const currentDate = new Date();
    const diffTime = Math.abs(dueDate - currentDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

export default function TaskItem({ task, setEditing, setOpenCreateTaskPopup, deleteTask }) {

    const onDragStart = (e) => {
        e.dataTransfer.setData("task", JSON.stringify(task));
    }

    return <div onDragStart={onDragStart} draggable key={task.id} className={styles.item}>
        <div className={styles.d}>
            <span className={styles.title}>{task.title}</span>
        </div>
        <div className={styles.d}>
            <span className={styles.desc}>{task.description}</span>
        </div>
        <div className={styles.d}>
            <div style={{ marginTop: "20px", display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Tooltip title={"Create you by today"}>
                    <div className={styles.green_box}>
                        {createdDayCounter(task.createdAt) == 1 ? 'Today' : createdDayCounter(task.createdAt) + ' days ago'}
                    </div>
                </Tooltip>
            </div>
        </div>
        <Line margin={10} />
        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'gray', marginBottom: '10px' }} className={styles.d}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <span className="material-symbols-rounded">clock_loader_80</span>
                <span style={{ marginLeft: 5 }}>{dueDayCounter(task.dueDate)} day{dueDayCounter(task.dueDate) === 1 ? "" : "s"} left</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <span className="material-symbols-rounded">event</span>
                <span style={{ marginLeft: 5 }}>
                    {new Date(task.dueDate).toLocaleDateString()}
                </span>
            </div>
        </div>
        <Line margin={0} />
        <div onClick={() => { setEditing({ status: true, task }); setOpenCreateTaskPopup(true) }} style={{ padding: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'blue' }} className={`${styles.d} ${styles.clickable}`}>
            <span>Edit</span>
        </div>
        <Line margin={0} />
        <div onClick={() => { deleteTask(task.id) }} style={{ padding: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'red' }} className={`${styles.d} ${styles.clickable}`}>
            <span>Delete</span>
        </div>
    </div>
}