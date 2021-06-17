import React from 'react'
import DisplayData from "../../Sections/AdminPanelAwards/AwardsContext"
import useApi from "../../Utils/useApi"

const Container = () => {
    const {data} = useApi("http://3.138.190.235/v1/awards")
    return (
        <div>
            <DisplayData array={data}/>

        </div>
    )
}

export default Container
