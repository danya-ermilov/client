import { useContext } from "react";
import { AppContext } from "./AppContext";
import { observer } from "mobx-react-lite";
import CommentItem from "./CommentItem.js";

const CommentList = observer(() => {
  const { comment } = useContext(AppContext);

  const renderComments = () => {
    if (comment.comments.length === 0) {
      return <p>No comments yet.</p>;
    }

    return (
      <div>
        {comment.comments.map((comment) => (
          <CommentItem key={comment.id} data={comment} />
        ))}
      </div>
    );
  };

  return <div>{renderComments()}</div>;
});

export default CommentList;
/*
<ul>
  {comment.comments.map((comment) => (
    <li key={comment.id}>
      <strong>{comment.userId}:</strong>
      {comment.text}
    </li>
  ))}
</ul>;
*/
