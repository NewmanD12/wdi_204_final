import Table from 'react-bootstrap/Table';




const ProjectTable = (props) => {
    const { projects, users } = props
    // console.log(projects)

    const findProjectLead = (id) => {
        const lead = users.find((user) => user.id === id)
        // console.log(lead)
        if(lead){
            return `${lead.firstName} ${lead.lastName}`
        }
    }


    return(

        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Name</th>
                    <th># of Issues</th>
                    <th>Lead</th>
                </tr>
            </thead>
            <tbody>
                {projects.map((project, index) => {
                    const projectUrl = `/dashboard/projects/get-one/${project.id}`
                    console.log(projectUrl)
                    return  <tr key={index}>
                                <td><a href={projectUrl}>{project.title}</a></td>
                                <td>{project.issues.length}</td>
                                <td>{findProjectLead(project.adminIds[0])}</td>
                            </tr>
                })}
            </tbody>
        
        </Table>

    )
}

export default ProjectTable