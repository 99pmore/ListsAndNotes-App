import { useState } from "react";

import { db } from "../config/firebase";
import { remove, update, ref, set } from "firebase/database";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import Swal from "sweetalert2";

export const Card = ({ listId, noteId, title, body, items, user }) => {

    const [checkedItems, setCheckedItems] = useState(
        items
          ? items.map((item, index) => (item.checkbox ? index : null))
          .filter((i) => i !== null)
        : []
      )

    const handleCheckboxChange = async (index) => {
        if (checkedItems.includes(index)) {
            setCheckedItems(checkedItems.filter((i) => i !== index))

        } else {
            setCheckedItems([...checkedItems, index])
        }

        const dbRef = ref(db, `users/${user.uid}/info/lists/${listId}/items/${index}`)
        await update(dbRef, { checkbox: !items[index].checkbox })
    }

    const deleteNote = () => {
        Swal.fire({
            title: "¿Estás seguro/a?",
            showCancelButton: true,
            confirmButtonColor: "#ba95d2",
            cancelButtonColor: "#ffb0bf",
            confirmButtonText: "Eliminar",
            cancelButtonText: "Cancelar",
            icon: "warning",
            iconColor: "#ba95d2"

        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire("Eliminado", "La nota se ha eliminado", "success")
                Swal.fire({
                    title: "Eliminado",
                    text: `La ${listId ? "lista" : "nota"} se ha eliminado con éxito`,
                    confirmButtonColor: "#ba95d2",
                    confirmButtonText: "Aceptar",
                    icon: "success",
                    iconColor: "#ba95d2"
                })

                if (items) {
                    remove(ref(db, `users/${user.uid}/info/lists/${listId}`))

                } else {
                    remove(ref(db, `users/${user.uid}/info/notes/${noteId}`))
                }
            }
        })
    }

    const editNote = () => {
        if (body) {
            Swal.fire({
                input: 'textarea',
                title: `${title}`,
                inputValue: `${body}`,
                showCancelButton: true,
                confirmButtonColor: "#ba95d2",
                cancelButtonColor: "#ffb0bf",
                confirmButtonText: "Aceptar",
                cancelButtonText: "Cancelar",

            }).then((result) => {
                if (result.isConfirmed) {
                    const dbRef = ref(db, `users/${user.uid}/info/notes/${noteId}`)
                    update(dbRef, { body: Swal.getInput().value })
                }
            })
            
        } else if (items) {
            Swal.fire({
                input: 'text',
                title: `${title}`,
                showCancelButton: true,
                confirmButtonColor: "#ba95d2",
                cancelButtonColor: "#ffb0bf",
                confirmButtonText: "Añadir",
                cancelButtonText: "Cancelar",
                
            }).then((result) => {
                if (result.isConfirmed) {
                    const newItem = { text: Swal.getInput().value, checkbox: false };
                    const dbRef = ref(db, `users/${user.uid}/info/lists/${listId}/items`)
                    set(dbRef, [...items, newItem])
                }
            })
        }
    }

    const listItems = items ? items.map((item, index) => (
              <li key={`${listId}-${index}`}>
                  <input
                        type="checkbox"
                        className={ `${ checkedItems.includes(index) ? "is-checked" : "" }` }
                        checked={ checkedItems.includes(index) }
                        onChange={ () => handleCheckboxChange(index) }
                  />
                  <p key={ index } className={ checkedItems.includes(index) ? "strike" : "" }> { item.text } </p>
              </li>
          ))
        : null

    return (
        <div className="card">
            <h3 className="title">{ title }</h3>
            <p className="note-body">{ body }</p>
            <ul className="list-items">{ listItems }</ul>

            <div className="trash" onClick={ deleteNote }>
                <FontAwesomeIcon icon={ faTrashCan } />
            </div>
            <div className="edit" onClick={ editNote }>
                <FontAwesomeIcon icon={ faPenToSquare } />
            </div>
        </div>
    )
}
