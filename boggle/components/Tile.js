export default function Tile({id}){
    return <div className="boggle">
        <input type="number" id={id} name={id} required/>
    </div>
}