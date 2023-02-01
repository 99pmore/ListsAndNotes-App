import { useState } from 'react'
import { List } from './List'
import { Note } from './Note'

import { db } from "../config/firebase";
import { ref, push } from "firebase/database";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { faNoteSticky } from "@fortawesome/free-regular-svg-icons";
import Swal from "sweetalert2";

export const Form = ({ user }) => {

    const [currentComponent, setCurrentComponent] = useState()
    const [title, setTitle] = useState('')
    const [items, setItems] = useState([])
    const [list, setList] = useState({ title: title, items: items, date: '' })
    const [note, setNote] = useState({ title: title, body: '', date: '' })
    const [isList, setIsList] = useState(true)

    const handleClickList = (e) => {
        e.preventDefault()
        setIsList(true)
        setCurrentComponent(<List items={ items } setItems={ setItems } />)
    }

    const handleClickNote = (e) => {
        e.preventDefault()
        setIsList(false)
        setCurrentComponent(<Note note={ note } setNote={ setNote } />)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        const today = new Date()
        const day = today.getDate()
        const month = today.getMonth() + 1
        const year = today.getFullYear()
        const hour = today.getHours()
        const minute = today.getMinutes()
        const second = today.getSeconds()

        if (user) {
            if (isList) {
                setList({ title: title, items: items })
    
                push(ref(db, `users/${user.uid}/info/lists/`), {
                    title: title,
                    items: items,
                    date: `${year}-${month}-${day} ${hour}:${minute}:${second}`
                })
                
            } else {
                setNote({ ...note, title: title })
                
                push(ref(db, `users/${user.uid}/info/notes/`), {
                    title: title,
                    body: note.body,
                    date: `${year}-${month}-${day} ${hour}:${minute}:${second}`
                })
            }

        } else {
            Swal.fire({
                title: "Inicia sesión para añadir notas",
                confirmButtonColor: "#ba95d2",
                confirmButtonText: "Aceptar",
                icon: "error",
                iconColor: "#ffb0bf",
            })
        }

        reset()
    }

    const reset = () => {
        setTitle('')
        document.querySelector('input').value = ''
        setItems([])
        setList({ title: '', items: [] })
        setNote({ title: '', body: '' })
        setCurrentComponent()
    }

    return (
        <form onSubmit={ handleSubmit }>
            <div className='head'>
                <input type='text' placeholder='Añade un título' onChange={ e => setTitle(e.target.value) } />
                <button onClick={ handleClickList }><FontAwesomeIcon icon={ faList } /></button>
                <button onClick={ handleClickNote }><FontAwesomeIcon icon={ faNoteSticky } /></button>
            </div>

            <div className='body'>
                { currentComponent }
            </div>

            {
                currentComponent ?
                    <div className="buttons">
                        <button type='reset' onClick={ reset } className='delete-button'>Borrar</button>
                        <button type='submit' className='add-button'>Añadir</button>
                    </div>
                : null
            }
        </form>
    )
}