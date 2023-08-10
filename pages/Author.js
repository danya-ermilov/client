import { useEffect, useState } from "react";
import { fetchOneUser, fetchProdUser } from "../http/userAPI.js";
import { useParams } from "react-router-dom";
import { Container, Row, Pagination } from "react-bootstrap";
//import { fetchAllProducts, fetchProdUser } from "../http/catalogAPI.js";
import ProductItem from "../components/ProductItem.js";

const ADMIN_PER_PAGE = 6;

const Author = () => {
  const { id } = useParams();

  const [userFetching, setUserFetching] = useState(true);
  const [fetchingProdUser, setFetchingProdUser] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(true); // загрузка списка товаров с сервера

  // сколько всего страниц списка товаров
  const [totalPages, setTotalPages] = useState(1);

  const handlePageClick = (page) => {
    setCurrentPage(page);
    setFetching(true);
  };

  const pages = [];
  for (let page = 1; page <= totalPages; page++) {
    pages.push(
      <Pagination.Item
        key={page}
        active={page === currentPage}
        activeLabel=""
        onClick={() => handlePageClick(page)}
      >
        {page}
      </Pagination.Item>
    );
  }

  useEffect(() => {
    fetchOneUser(id).then(function (result) {
      setUserFetching(result);
    });
    fetchProdUser(id, currentPage, ADMIN_PER_PAGE).then(function (result) {
      setFetchingProdUser(result);
    });
    //console.log(fetchingProdUser);

    //console.log(fetchingProdUser);
  }, []);

  return (
    <Container>
      <h1>{userFetching}</h1>

      <Row className="mb-3">
        {fetchingProdUser.count ? (
          fetchingProdUser.rows.map((item) => (
            <ProductItem key={item.id} data={item} />
          ))
        ) : (
          <p className="m-3">No results found.</p>
        )}
      </Row>
    </Container>
  );
};

export default Author;
