import { useState } from 'react'
import { ListItems } from "./ListItems"

export const List = ({ items: initialItems, setItems: setItemsParent }) => {

    const [items, setItems] = useState(initialItems)
    const [item, setItem] = useState({ text: '', checkbox: false })

    const handleSubmit = e => {
        e.preventDefault()

        setItems(prevItems => [ ...prevItems, { text: item.text, checkbox: item.checkbox } ])
        setItemsParent(prevItems => [ ...prevItems, { text: item.text, checkbox: item.checkbox } ])
        setItem({ text: '', checkbox: false })
    }

    const listItems = items.map((item, index) =>
        <ListItems key={ index } item={ item } />
    )

    return (
        <div className='list'>
            <div className="list-head">
                <input type='text' className="item" value={ item.text } placeholder='Añade un elemento' onChange={ e => setItem({ ...item, text: e.target.value }) } />
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