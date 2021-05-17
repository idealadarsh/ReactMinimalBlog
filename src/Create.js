import { useState } from 'react'
import { useHistory } from 'react-router-dom'

const Create = () => {

    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [author, setAuthor] = useState('Mario')
    const [isPending, setIsPending] = useState(false)
    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault()
        const blog = { title, body, author }

        setIsPending(true)
        
        fetch(`http://localhost:8000/blogs`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(blog)
        }).then(() => {
            console.log("Blog Post Publised")
            setIsPending(false)
            history.push('/')
        })
        .catch(err => console.error(err));
    }

    return (
        <div className="create">
            <h2>Add a new blog post</h2>
            <form onSubmit={handleSubmit}>
                <label>Title: </label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                <label>Content: </label>
                <textarea rows="5" value={body} onChange={(e) => setBody(e.target.value)}required></textarea>
                <label>Author:</label>
                <select value={author} onChange={(e) => setAuthor(e.target.value)}>
                    <option value="Mario">Mario</option>
                    <option value="Luigi">Luigi</option>
                    <option value="Yoshi">Yoshi</option>
                </select>
                {isPending ? <button disabled>Publshing Your Post...</button> : <button>Publish Post</button>}
            </form>
        </div>
    )
}

export default Create
