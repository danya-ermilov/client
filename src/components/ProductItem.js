import { Card, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { fetchOneUser } from "../http/userAPI.js";
import { useNavigate } from "react-router-dom";

const ProductItem = ({ data }) => {
  const [userFetching, setUserFetching] = useState(true);
  const navigate = useNavigate();
  //console.log(data);

  useEffect(() => {
    fetchOneUser(data.userId).then(function (result) {
      setUserFetching(result);
    });
  }, [data.userId]);

  return (
    <Col
      xl={3}
      lg={4}
      sm={6}
      className="mt-3"
      //onClick={() => handleClick(data.id)}
      onClick={() => navigate(`/product/${data.id}`)}
    >
      <Card style={{ width: 200, cursor: "pointer" }}>
        {data.image ? (
          <Card.Img
            width={200}
            height={200}
            variant="top"
            src={process.env.REACT_APP_IMG_URL + data.image}
          />
        ) : (
          <Card.Img
            variant="top"
            src={process.env.REACT_APP_IMG_URL + "photo.jpg"}
          />
        )}
        <Card.Body style={{ height: 100, overflow: "hidden" }}>
          <strong
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {data.name}
          </strong>
          <br />
          <a>autor: {userFetching}</a>
          <br />
          <a>rating:{data.rating}</a>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ProductItem;
