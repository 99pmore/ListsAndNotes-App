export const Card = ({ title, body, items }) => {

    const listItems = items ? items.map((item, index) => (
        <li key={index}>{item}</li>
    )) : null

    return (
        <div className="card">
            <h3 className="title">{ title }</h3>
            <p className="note-body">
                { body }
            </p>
            <ul className="list-items">
                { listItems }
            </ul>
        </div>
    )
}