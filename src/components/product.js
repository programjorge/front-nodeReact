const product = (props) =>{
    return (
        <div className="productScreen">
            <div className="leftScreen">
                <input id = {props.id} hidden></input>
                <img src = {props.img}></img>
                <div className="valoraciones">

                </div>
                <div className="namePrice">
                    <b>{props.name}</b>
                </div>
            </div>
            <div className="rightScreen">
                <p onClick={props.onAction}>CERRAR</p>
                <a>{props.price}</a>
            </div>
        </div>
    )
}
export default product