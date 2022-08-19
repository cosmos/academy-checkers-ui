import React from "react"

interface ILoadingProps {
    isLoading: boolean
    error: boolean
}

const Loading = ({ isLoading, error }: ILoadingProps) => {
    if (isLoading) {
        return <div>Loading...</div>
    } else if (error) {
        return <div>Sorry, there was a problem loading this page.</div>
    } else {
        return null
    }
}
export default Loading
