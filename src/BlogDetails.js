import { useParams, useHistory } from 'react-router-dom'
import useFetch from './useFetch'

const BlogDetails = () => {

    const { id } = useParams();
    const { data: blog, error, isLoading } = useFetch(`http://localhost:8000/blogs/${id}`)
    const history = useHistory()

    const handleDelete = () => {
        fetch(`http://localhost:8000/blogs/${blog.id}`, {
            method: 'DELETE'
        }).then(() => history.goBack())
        .catch(err => console.error(err))
    }

    return (
        <div className="blog-details">
            {isLoading && <div>Loading...</div>}
            {error && <div><strong>Error: </strong>{error}</div>}
            {blog && (
                <article>
                    <h2>{blog.title}</h2>
                    <p>Written By - {blog.author}</p>
                    <div>{blog.body}</div>
                    <button onClick={handleDelete}>Delete post</button>
                </article>
            )}
        </div>
    )
}

export default BlogDetails
