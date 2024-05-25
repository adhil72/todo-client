import { Button, Dialog, TextField } from "@mui/material";


export default function CreateTaskPopup({ editing = false, defaultValue = { title: "Task name", description: "Description goes here", dueDate: new Date().toISOString().split('T')[0], status: "todo" }, onClose, open = true, onSubmit }) {
    return <Dialog open={open} onClose={onClose} >
        <div style={{ padding: 20, width: "400px" }}>
            <span style={{ fontWeight: "bold", fontSize: "25px" }}>{editing ? "Edit" : "Create"} Task</span>
            <form onSubmit={(e) => { e.preventDefault(); onSubmit({ data: defaultValue, editing }) }} style={{ marginTop: "20px" }}>
                <TextField onChange={(e) => { defaultValue.title = e.target.value }} label="Task name" fullWidth defaultValue={defaultValue?.title} InputProps={{ sx: { borderRadius: "15px" } }} />
                <TextField onChange={(e) => { defaultValue.description = e.target.value }} label="Description" multiline minRows={3} fullWidth defaultValue={defaultValue?.description} InputProps={{ sx: { borderRadius: "15px" } }} sx={{ mt: 1.5 }} />
                <TextField onChange={(e) => { defaultValue.dueDate = e.target.value }} label="Due date" type="date" fullWidth defaultValue={defaultValue?.dueDate} InputProps={{ sx: { borderRadius: "15px" } }} sx={{ mt: 1.5 }} />
                <Button type="submit" variant="contained" sx={{ mt: 2, borderRadius: "10px", padding: "10px" }} fullWidth>{editing ? "Edit" : "Create"}</Button>
                <Button variant="contained" color="error" sx={{ mt: 1, borderRadius: "10px", padding: "10px" }} fullWidth onClick={onClose}>Cancel</Button>
            </form>
        </div>
    </Dialog>
}