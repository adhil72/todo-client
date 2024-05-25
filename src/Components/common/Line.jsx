export default function Line({ width = 100, margin = 10 }) {
    return <div style={{
        width: width + '%',
        height: "1px",
        background: "#d3d3d36b",
        marginTop: margin + "px",
        marginBottom: margin + "px"
    }}></div>
}