import { useState } from 'react'
import { List } from './List'
import { Note } from './Note'

import { db } from "../config/firebase";
import { set, ref, push } from "firebase/database";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { faNoteSticky } from "@fortawesome/free-regular-svg-icons";

export const Form = () => {

    const [currentComponent, setCurrentComponent] = useState()
    const [note, setNote] = useState({ title: '', body: '' })

    const handleClickList = (e) => {
        e.preventDefault()
        setCurrentComponent(<List />)
    }

    const handleClickNote = (e) => {
        e.preventDefault()
        setCurrentComponent(<Note note = { note } setNote = { setNote } />)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        push(ref(db, 'notes/'), {
            title: note.title,
            body: note.body
        })
    }

    return (
        <form onSubmit={ handleSubmit }>
            <div className='head'>
                <input type='text' placeholder='Añade un título' onChange={ e => setNote({ ...note, title: e.target.value }) } />
                <button onClick={ handleClickList }><FontAwesomeIcon icon={ faList } /></button>
                <button onClick={ handleClickNote }><FontAwesomeIcon icon={ faNoteSticky } /></button>
            </div>

            <div className='body'>
                { currentComponent }
            </div>

            <button type='submit' className='add-button'>Añadir</button>
        </form>
    )
}