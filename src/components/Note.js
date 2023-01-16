export const Note = ({ note, setNote }) => {

    return (
        <div className="note-body">
            <textarea className="text-area" onChange={ e => setNote({ ...note, body: e.target.value }) }></textarea>
        </div>
    )
}