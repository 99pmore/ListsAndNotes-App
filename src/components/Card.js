import { useState } from "react";

import { db } from "../config/firebase";
import { remove, ref } from "firebase/database";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

export const Card = ({ listId, noteId, title, body, items, user }) => {

    const [checkedItems, setCheckedItems] = useState([])

    const handleCheckboxChange = (index) => {
        if (checkedItems.includes(index)) {
            setCheckedItems(checkedItems.filter((i) => i !== index))

        } else {
            setCheckedItems([ ...checkedItems, index ])
        }
    }

    const deleteNote = () => {
        if (items) {
            remove(ref(db, `users/${user.uid}/info/lists/${listId}`))
            
        } else {
            remove(ref(db, `users/${user.uid}/info/notes/${noteId}`))
        }
    }

    const listItems = items ? items.map((item, index) => (
        <li key={`${listId}-${index}`}>
            <input type="checkbox" className={`${checkedItems.includes(index) ? 'is-checked' : ''}`} checked={ checkedItems.includes(index) } onChange={ () => handleCheckboxChange(index) } />
            <p key={index} className={checkedItems.includes(index) ? "strike" : ""}> { item }</p>
        </li>
    )) : null

    return (
        <div className="card">
            <h3 className="title">{ title }</h3>
            <p className="note-body">{ body }</p>
            <ul className="list-items">{ listItems }</ul>

            <div className="trash" onClick={ deleteNote } ><FontAwesomeIcon icon={ faTrashCan } /></div>
        </div>
    )
}