const Filter = (prop) => {
    return (<div>filter shown with <input type="text" onChange={prop.handleFilterInput} /></div >
    )
}

export default Filter