import { Card, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";

const BasketItem = observer(({ data }) => {
  const navigate = useNavigate();

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
        <Card.Body style={{ height: 65, overflow: "hidden" }}>
          <strong
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {data.name}
          </strong>
        </Card.Body>
      </Card>
    </Col>
  );
});

export default BasketItem;
