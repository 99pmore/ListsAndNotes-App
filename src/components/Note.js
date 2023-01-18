export const Note = ({ note, setNote }) => {

    return (
        <div className="note-body">
            <textarea className="text-area" placeholder="Añade una nota" onChange={ e => setNote({ ...note, body: e.target.value }) }></textarea>
        </div>
    )
}