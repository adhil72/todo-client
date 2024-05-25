import { Button, Dialog, TextField } from "@mui/material";


export default function CreateTaskPopup({ editing = false, defaultValue = { name: "Task name", description: "Description goes here", date: "2021-05-24" }, onClose, open = true, onSubmit }) {
    return <Dialog open={open} onClose={onClose} >
        <div style={{ padding: 20, width: "400px" }}>
            <span style={{ fontWeight: "bold", fontSize: "25px" }}>{editing ? "Edit" : "Create"} Task</span>
            <form style={{ marginTop: "20px" }}>
                <TextField onChange={(e) => { defaultValue.name = e.target.value }} label="Task name" fullWidth defaultValue={defaultValue?.name} InputProps={{ sx: { borderRadius: "15px" } }} />
                <TextField onChange={(e) => { defaultValue.description = e.target.value }} label="Description" multiline minRows={3} fullWidth defaultValue={defaultValue?.description} InputProps={{ sx: { borderRadius: "15px" } }} sx={{ mt: 2 }} />
                <TextField onChange={(e) => { defaultValue.date = e.target.value }} label="Date" type="date" fullWidth defaultValue={defaultValue?.date} InputProps={{ sx: { borderRadius: "15px" } }} sx={{ mt: 1 }} />
                <Button variant="contained" sx={{ mt: 2, borderRadius: "10px", padding: "10px" }} fullWidth>{editing ? "Edit" : "Create"}</Button>
                <Button variant="contained" color="error" sx={{ mt: 1, borderRadius: "10px", padding: "10px" }} fullWidth onClick={onClose}>Cancel</Button>
            </form>
        </div>
    </Dialog>
}