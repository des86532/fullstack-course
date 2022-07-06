const PersonForm = ({name, number, handleChangeName, handleChangeNumber, handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                name: <input value={name} onChange={handleChangeName} />
            </div>
            <div>
                number: <input value={number} onChange={handleChangeNumber} />
            </div>
            <div>
            <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm;