const PersonForm = ({onSubmit, fields}) => {
    const fieldsJsx = fields.map(field => <div key={field.title}>{field.title} <input value={field.value} onChange={field.onChange}/></div>)

    return (
        <form onSubmit={onSubmit}>
            {fieldsJsx}
            <button type="submit">add</button>
        </form>
    )
}

export default PersonForm