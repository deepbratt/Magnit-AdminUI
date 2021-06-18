import React from 'react'
import BlogsContext from "../../Sections/AdminPanelBlogs/BlogsContext"
import useApi from "../../Utils/useApi"
const Container = () => {
    const {data} = useApi("")
    return (
        <div>
            <BlogsContext array={data}/>

        </div>
    )
}

export default Container
