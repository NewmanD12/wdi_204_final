import axios from "axios"


const CommentCard = (props) => {

    const { comment, currentUser, projectsUrlEndpoint, issue, project } = props

    const id = 'comment-' + comment.id
    const divId = 'div-' + comment.id

    const showPrompt = () => {
        const prompt = document.getElementById(id)
        prompt.style.display = 'block'
    }

    const hidePrompt = () => {
        const prompt = document.getElementById(id)
        prompt.style.display = 'none'
    }

    const handleReplySubmit = (e) => {
        e.preventDefault()
        const reply = document.getElementById('replyText').value
        console.log(reply)
        axios.put(`${projectsUrlEndpoint}/add-reply/${project.id}/${issue.id}/${comment.id}`, {
            text : reply,
            creatorID : currentUser.id
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
        .finally(() => {
            window.location.reload(false)
        })

    }

    const addReplyField = () => {
        const div = document.getElementById(divId)
        // console.log(div)
        let addButton = document.getElementById("addCommentButton")
        addButton.style.display = 'none'
        let form = document.createElement("form")
        let saveButton = document.createElement('button')
        saveButton.value = 'submit'
        saveButton.innerText = 'Save'
        saveButton.addEventListener('click', (e) => {
            handleReplySubmit(e)
        })
        let cancelButton = document.createElement('button')
        cancelButton.innerText = 'Cancel'
        let replyArea = document.createElement('textarea')
        replyArea.id = 'replyText'
        let creatorIDInput = document.createElement('input')
        creatorIDInput.type = 'hidden'
        creatorIDInput.value = currentUser.id

        form.appendChild(replyArea)
        form.appendChild(saveButton)
        form.appendChild(cancelButton)
        form.appendChild(creatorIDInput)
        div.appendChild(form)
    }




    return (
        <div 
            onMouseEnter={(e) => {
                showPrompt()
            }}
            onMouseLeave={(e) => {
                hidePrompt()
            }}
            id={divId}
            className='comment-cards'
        >
            <h4>
                {comment.text}
            </h4>
            {comment.replies.map((reply, index) => {
                return  <div key={index}>
                            <p>{reply.text}</p>
                        </div>
            })}

            <p 
                className="add-reply-prompt" 
                id={id}
                onClick={(e) => {
                    addReplyField()
                }}
            >
                + Add Reply
            </p>
        </div>
    )
}

export default CommentCard