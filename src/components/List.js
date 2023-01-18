import { useState } from 'react'
import { ListItems } from "./ListItems"

export const List = ({ items: initialItems, setItems: setItemsParent }) => {

    const [items, setItems] = useState(initialItems)
    const [item, setItem] = useState('')

    const handleSubmit = e => {
        e.preventDefault()

        setItems(prevItems => [ ...prevItems, item ])
        setItemsParent(prevItems => [ ...prevItems, item ])
        setItem('')
    }

    const listItems = items.map((item, index) =>
        <ListItems key={ index } item={ item } />
    )

    return (
        <div className='list'>
            <div className="list-head">
                <input type='text' className="item" value={ item } placeholder='Añade un elemento' onChange={ e => setItem(e.target.value) } />
                <button onClick={ handleSubmit } className="add-item" disabled={ item ? '' : 'disabled' }>+</button>
            </div>
            { 
                listItems.length > 0 ?
                    <div className="list-body">
                        <ul>
                            { listItems }
                        </ul>
                    </div>
                : null 
            }
        </div>
    )
}