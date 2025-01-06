const Total = ({parts}) => {
    const sum = parts.reduce((acc, curr) => acc + curr.exercises, 0)

    return (
        <p>total of {sum} exercises</p>
    )
}

export default Total