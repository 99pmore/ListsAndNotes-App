export const ListItems = ({ item, handleCheckboxChange }) => {

    return (
        <li className="item">
            <input type="checkbox" onChange={ handleCheckboxChange } />
            { item.text }
        </li>
    )
}