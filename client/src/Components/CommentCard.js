import AddReplyForm from "./AddReplyForm"
import ReplyCard from "./ReplyCard"


const CommentCard = (props) => {

    const { comment, currentUser, projectsUrlEndpoint, issue, project, userList } = props

    const id = 'comment-' + comment.id
    const divId = 'div-' + comment.id
    // const replyFormID = 'replyForm' + comment.id

    const showPrompt = () => {
        const prompt = document.getElementById(id)
        prompt.style.display = 'block'
    }

    const hidePrompt = () => {
        const prompt = document.getElementById(id)
        prompt.style.display = 'none'
    }

 

    const findCreator = (id) => {
        const creator = userList.filter((user) => {
            return user.id === id
        })[0]
        return creator.firstName[0].toUpperCase() + creator.firstName.slice(1, creator.firstName.length) + ' ' + creator.lastName[0].toUpperCase()
    }

    const showReplyForm = () => {
        const form = document.getElementById(`comment-reply-${comment.id}`)
        form.style.display = 'block'
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
            <p>{findCreator(comment.creatorID)}</p>
            <h4>
                {comment.text}
            </h4>
            {comment.replies.map((reply, index) => {
                return  <ReplyCard 
                            key={index}
                            reply={reply}
                            userList={userList}
                        />
            })}



            <p 
                className="add-reply-prompt" 
                id={id}
                onClick={(e) => {
                    showReplyForm()
                }}
            >
                + Add Reply
            </p>

            <AddReplyForm 
                currentUser={currentUser}
                comment={comment}
                project={project}
                projectsUrlEndpoint={projectsUrlEndpoint}
                issue={issue}
            />
        </div>
    )
}

export default CommentCard