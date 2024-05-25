import Line from "@/Components/common/Line"
import Papper from "@/Components/common/Papper"
import styles from "./page.module.css"
import Tooltip from "@/Components/common/Tooltip"
import CreateTaskPopup from "./popups/CreateTaskPopup"
import { useState } from "react"

export default function Home() {

    const [openCreateTaskPopup, setOpenCreateTaskPopup] = useState(false)

    const [todoTasks, setTodoTasks] = useState([]);
    const [ongoingTasks, setOngoingTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);

    const onCreateTaskSubmit = (data) => {
        console.log(data);
    }

    return <div style={{ width: "100%", height: "100vh", background: "#f2f2f2" }}>

        {/* APP BAR */}
        <div style={{ padding: "10px" }}>
            <Papper>
                <span style={{ fontWeight: "bold", fontSize: "20px" }}>Todo</span>
            </Papper>
        </div>
        {/* APP BAR */}

        {/* CONTENT */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Papper style={{ width: "300px", marginLeft: "5px", marginRight: "5px" }}>
                <span>TODO</span>
                <Line />

                <div>
                    <div style={{ color: 'blue', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 10 }} className={`${styles.item} ${styles.clickable}`}>
                        <span>New task</span>
                    </div>
                    <div className={styles.item}>
                        <div className={styles.d}>
                            <span className={styles.title}>TaskName</span>
                        </div>
                        <div className={styles.d}>
                            <span className={styles.desc}>Enter description here</span>
                        </div>
                        <div className={styles.d}>
                            <div style={{ marginTop: "20px", display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Tooltip text={"Create you by today"}>
                                    <div className={styles.green_box}>
                                        Today
                                    </div>
                                </Tooltip>
                            </div>
                        </div>
                        <Line margin={10} />
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'gray', marginBottom: '10px' }} className={styles.d}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <span class="material-symbols-rounded">clock_loader_80</span>
                                <span style={{ marginLeft: 5 }}>2 days left</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <span class="material-symbols-rounded">event</span>
                                <span style={{ marginLeft: 5 }}>May 24</span>
                            </div>
                        </div>
                        <Line margin={0} />
                        <div onClick={() => { setOpenCreateTaskPopup(true) }} style={{ padding: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'blue' }} className={`${styles.d} ${styles.clickable}`}>
                            <span>Edit</span>
                        </div>
                        <Line margin={0} />
                        <div style={{ padding: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'red' }} className={`${styles.d} ${styles.clickable}`}>
                            <span>Delete</span>
                        </div>
                    </div>
                </div>
            </Papper>
            <Papper style={{ width: "300px", marginLeft: "5px", marginRight: "5px" }}>
                <span>Ongoing</span>
                <Line />
            </Papper>
            <Papper style={{ width: "300px", marginLeft: "5px", marginRight: "5px" }}>
                <span>Completed</span>
                <Line />
            </Papper>
        </div>
        {/* CONTENT */}
        <CreateTaskPopup open={openCreateTaskPopup} onClose={() => setOpenCreateTaskPopup(false)} onSubmit={onCreateTaskSubmit} />

    </div>
}