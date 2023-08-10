import { useContext, useState, useEffect } from "react";
import { AppContext } from "./AppContext.js";
import { fetchBasket } from "../http/basketAPI.js";
import { Spinner, Row } from "react-bootstrap";
import BasketItem from "./BasketItem.js";
import { observer } from "mobx-react-lite";

const BasketList = observer(() => {
  const { basket } = useContext(AppContext);

  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    fetchBasket()
      .then((data) => (basket.products = data.products))
      .finally(() => setFetching(false));
  }, []);

  if (fetching) {
    return <Spinner animation="border" />;
  }

  return (
    <>
      <Row className="mb-3">
        {basket.count ? (
          basket.products.map((item) => (
            <BasketItem key={item.id} data={item} />
          ))
        ) : (
          <p>Add the strategy to the favorietes to see it here.</p>
        )}
      </Row>
    </>
  );
});

export default BasketList;
