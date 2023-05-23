const product = (props) =>{
    return (
        <div>
            <p>{props.id}</p>
            <p>{props.name}</p>
            <p>{props.price}</p>
            <p>{props.img}</p>
        </div>
    )
}
export default product