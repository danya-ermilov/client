import { useState } from "react";
import { post } from "../http/commentsAPI";

const CommentForm = ({ id }) => {
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (text) {
        post(id, { text }).then(() => {
          setText("");
        });
        window.location.reload();
      }
    } catch (error) {
      console.error("Ошибка при добавлении комментария:", error);
    }
  };

  return (
    <div className="form-floating" onSubmit={handleSubmit}>
      <textarea
        className="form-control"
        placeholder="Leave a comment here"
        id="floatingTextarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      ></textarea>
      <button className="btn btn-primary" onClick={handleSubmit}>
        Send
      </button>
    </div>
  );
};

export default CommentForm;
