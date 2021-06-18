import React from 'react'
import BlogsContext from "../../Sections/AdminPanelBlogs/BlogsContext"
import useApi from "../../Utils/useApi"
const Container = () => {
    const {data} = useApi("http://3.138.190.235/v1/blogs")
    return (
        <div>
            <BlogsContext array={data}/>

        </div>
    )
}

export default Container
