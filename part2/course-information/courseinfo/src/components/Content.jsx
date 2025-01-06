import Part from './Part'
import Total from './Total'

const Content = ({parts}) => {
    const partsJsx = parts.map(part => <Part key={part.id} part={part}/>)

    return (
        <>
            {partsJsx}
            <Total parts={parts}/>
        </>
    )
}

export default Content