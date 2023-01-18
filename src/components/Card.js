import { useState } from "react";

export const Card = ({ title, body, items }) => {

    const [checkedItems, setCheckedItems] = useState([])

    const handleCheckboxChange = (index) => {
        if (checkedItems.includes(index)) {
            setCheckedItems(checkedItems.filter((i) => i !== index))

        } else {
            setCheckedItems([ ...checkedItems, index ])
        }
    }

    const listItems = items ? items.map((item, index) => (
        <li>
            <input type="checkbox" className={`${checkedItems.includes(index) ? 'is-checked' : ''}`} checked={ checkedItems.includes(index) } onChange={ () => handleCheckboxChange(index) } />
            <p key={index} className={checkedItems.includes(index) ? "strike" : ""}> { item }</p>
        </li>
    )) : null

    return (
        <div className="card">
            <h3 className="title">{ title }</h3>
            <p className="note-body">{ body }</p>
            <ul className="list-items">{ listItems }</ul>
        </div>
    )
}