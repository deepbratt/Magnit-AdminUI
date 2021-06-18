import React from 'react'
import JoinTeamContext from "../../Sections/AdminPanelJoinTeam/JoinTeamContext"
import useApi from "../../Utils/useApi"
const Container = () => {
    const {data} = useApi("http://3.138.190.235/v1/teams")
    return (
        <div>
            <JoinTeamContext array={data}/>

        </div>
    )
}

export default Container
