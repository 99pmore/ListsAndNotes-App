import { useState } from 'react'
import { List } from './List'
import { Note } from './Note'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { faNoteSticky } from "@fortawesome/free-regular-svg-icons";

export const Form = () => {

    const [currentComponent, setCurrentComponent] = useState()

    const handleClickList = (e) => {
        e.preventDefault();
        setCurrentComponent(<List />)
    }

    const handleClickNote = (e) => {
        e.preventDefault();
        setCurrentComponent(<Note />)
    }

    return (
        <form>
            <div className='head'>
                <input type='text' placeholder='Añade un título' />
                <button onClick={ handleClickList }><FontAwesomeIcon icon={ faList } /></button>
                <button onClick={ handleClickNote }><FontAwesomeIcon icon={ faNoteSticky } /></button>
            </div>

            <div className='body'>
                { currentComponent }
                <button className='add-button'>Añadir</button>
            </div>
        </form>
    )
}