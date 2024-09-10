const Notification = ({ message, error }) => {
    if (message === null) {
        return null
    }

    return (
        <div className={`notification ${error === true ? 'error' : 'added'}`}>{message}</div>
    )
}

export default Notification