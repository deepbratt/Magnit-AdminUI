import React from 'react'
import FooterContext from "../../Sections/AdminPanelFooter/FooterContext"
import useApi from "../../Utils/useApi"
const Container = () => {
    const {data} = useApi("http://3.138.190.235/v1/sliders")
    return (
        <div>
            <FooterContext array={data}/>

        </div>
    )
}

export default Container
