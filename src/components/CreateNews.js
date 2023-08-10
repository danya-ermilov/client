import { useContext, useState } from "react";
import { post } from "../http/newsAPI";
import { AppContext } from "./AppContext";

const CreateNews = () => {
  const [text, setText] = useState("");

  const { user } = useContext(AppContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (text) {
        post({ text }).then(() => {
          setText("");
        });
        window.location.reload();
      }
    } catch (error) {
      console.error("Ошибка при добавлении новости:", error);
    }
  };

  return (
    <div>
      {user.isAdmin ? (
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
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default CreateNews;
