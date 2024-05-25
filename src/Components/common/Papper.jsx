export default function Papper(props) {
    return <div {...props} style={{
        background: "white",
        borderRadius: "10px",
        padding: "20px",
        boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
        ...props.style
    }}>{props.children}</div>
}