import { useState, forwardRef, useImperativeHandle } from 'react'
import { Button } from '@mui/material'

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)
  const displayWhenVisible = { display: visible ? '' : 'none' }

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
      <Button variant={`${visible ? 'outlined' : 'contained'}`} onClick={toggleVisibility} style={{margin: '.5em 0'}}>
        {visible ? 'cancel' : props.buttonLabel}
      </Button>
    </>
  )
})

Togglable.displayName = 'Togglable'

export default Togglable