import { useState } from "react"

const Blog = ({ blog }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)
  const detailDisplay = { display: detailsVisible ? '' : 'none' }

  const toggleVisibility = () => {
    setDetailsVisible(!detailsVisible)
  }

  return (
    <div style={{ border: '2px solid black', paddingTop: '.5em', marginBottom: '.33em'}}>
      {blog.title} {blog.author} <button onClick={toggleVisibility}>{detailsVisible ? 'hide' : 'view'}</button>
      <div style={detailDisplay}>
        <div>{blog.url}</div>
        <div>likes {blog.likes}<button>like</button></div>
      </div>
    </div>  
  )
}

export default Blog