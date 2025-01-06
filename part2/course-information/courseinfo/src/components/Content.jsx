import Part from './Part'

const Content = ({parts}) => {
    const partsJsx = parts.map(part => <Part key={part.id} part={part}/>)

    return (
        <>
            {partsJsx}
        </>
    )
}

export default Content