import { useState, forwardRef, useImperativeHandle } from "react"

const Togglable = forwardRef((props, refs) => {
    const [visible, setVisible] = useState(false)
    const displayWhenVisible = { display: visible ? '' : 'none'}

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(refs, () => {
        return { toggleVisibility }
    })

    return (
        <>
            <div style={displayWhenVisible}>
                {props.children}
            </div>
            <button onClick={toggleVisibility}>
                {visible ? 'cancel' : props.buttonLabel}
            </button>
        </>
    )
})

export default Togglable