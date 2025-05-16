import Comment from "@/Components/Comment"
import { getComments } from "@/utils/comment"
import { useEffect, useState } from "react"

const CommentList = ({pId}: { pId: string}) => {
  const [comments, setComments] = useState<{
    id: string,
    name: string | null,
    userImg: string | null,
    time: Date | null,
    content: string
  }[]>()

  useEffect(() => {
    const fetchPostComments = async () => {
      const res = await getComments(pId)
      if (res.success) {
        setComments(res.data)
      }
    }
    fetchPostComments()
  }, [pId])

  return (
    <div className="p-5 border border-gray-400">
      {comments?.map((c, index) => (
        <Comment
        id={c.id}
        key={index}
        name={c.name}
        userImg={c.userImg}
        time={c.time}
        content={c.content}/>
))}
    </div>
  )
}
export default CommentList