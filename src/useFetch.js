import { useState, useEffect } from 'react'

const useFetch = (url) => {

    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {

        const abortController = new AbortController()

        fetch(url, { signal: abortController.signal }).then(res => {
            if(res.ok) return res.json()
            else throw Error(res.statusText)
        }).then(data => {
            setData(data)
            setError(null)
            setIsLoading(false)
        })
        .catch(err => {
            if (err.name === 'AbortError') console.log('Fetch Aborted')
            else {
                setIsLoading(false)
                setError(err.message)
            }
        })

        return () => abortController.abort()
    }, [url])

    return { data, isLoading, error }
}

export default useFetch