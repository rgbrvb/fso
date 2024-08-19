const Form = (prop) => {
    return (
        <form onSubmit={prop.handleSubmit}>
            <div>
                name: <input value={prop.newName} onChange={prop.handleNameInput} />
            </div>
            <div>number: <input value={prop.newNumber} onChange={prop.handleNumberInput} /></div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default Form