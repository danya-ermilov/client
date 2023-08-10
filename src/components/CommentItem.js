import { useContext, useEffect, useState } from "react";
import { fetchOneUser } from "../http/userAPI";
import { observer } from "mobx-react-lite";
import { AppContext } from "./AppContext";
import { delete_comment } from "../http/commentsAPI.js";
const CommentItem = observer(({ data }) => {
  const [userFetching, setUserFetching] = useState(true);

  const { user } = useContext(AppContext);

  useEffect(() => {
    fetchOneUser(data.userId).then(function (result) {
      setUserFetching(result);
    });
  }, [data.userId]);

  const handleClickDelete = (id) => {
    //console.log(id, rate);
    delete_comment(id);
    window.location.reload();
  };

  return (
    <div>
      {user.id == data.userId || user.isAdmin ? (
        <div style={{ wordWrap: "break-word", width: "auto" }}>
          {userFetching} : {data.text}
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() => handleClickDelete(data.id)}
          ></button>
        </div>
      ) : (
        <div style={{ wordWrap: "break-word", width: "auto" }}>
          {userFetching} : {data.text}
        </div>
      )}
    </div>
  );
});

export default CommentItem;
