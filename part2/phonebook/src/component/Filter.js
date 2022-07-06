const Filter = ({ filterText, handleChangeFilterText }) => {
    return <p>filter shown with <input value={filterText} onChange={handleChangeFilterText}/></p>
}

export default Filter;