import { Container, Button, Spinner, Table, Pagination } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../components/AppContext.js";
import { useNavigate } from "react-router-dom";
import { fetchProdUser, logout } from "../http/userAPI.js";
import CreateProduct from "../components/CreateProduct.js";
import UpdateProduct from "../components/UpdateProduct.js";
import { deleteProduct, fetchAllProducts } from "../http/catalogAPI.js";
import { observer } from "mobx-react-lite";

const ADMIN_PER_PAGE = 6;

const User = observer(() => {
  const [products, setProducts] = useState([]); // список загруженных товаров
  const [fetching, setFetching] = useState(true); // загрузка списка товаров с сервера
  const [createShow, setCreateShow] = useState(false); // модальное окно создания товар
  const [updateShow, setUpdateShow] = useState(false); // модальное окно редактирования

  const [change, setChange] = useState(false);
  const [product, setProduct] = useState(null);

  const { user } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = (event) => {
    logout();
    user.logout();
    navigate("/login", { replace: true });
  };

  const handleUpdateClick = (id) => {
    setProduct(id);
    setUpdateShow(true);
  };

  const handleDeleteClick = (id) => {
    deleteProduct(id)
      .then((data) => {
        setChange(!change);
        alert(`product «${data.name}» was deleted`);
      })
      .catch((error) => alert(error.response.data.message));
  };

  const [currentPage, setCurrentPage] = useState(1);
  // сколько всего страниц списка товаров
  const [totalPages, setTotalPages] = useState(1);

  // обработчик клика по номеру страницы
  const handlePageClick = (page) => {
    setCurrentPage(page);
    setFetching(true);
  };

  // содержимое компонента <Pagination>
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
    fetchProdUser(user.id, currentPage, ADMIN_PER_PAGE)
      .then((data) => {
        setProducts(data.rows);
        setTotalPages(Math.ceil(data.count / ADMIN_PER_PAGE));
      })
      .finally(() => setFetching(false));
  }, [change, currentPage]);

  //console.log(products);

  if (fetching) {
    return <Spinner animation="border" />;
  }

  return (
    <Container>
      <h1>{user.email}</h1>
      <Button onClick={() => setCreateShow(true)}>create</Button>
      <CreateProduct
        show={createShow}
        setShow={setCreateShow}
        setChange={setChange}
      />
      <UpdateProduct
        id={product}
        show={updateShow}
        setShow={setUpdateShow}
        setChange={setChange}
      />

      {products.length > 0 ? (
        <>
          <p>my products:</p>
          <Table bordered hover size="sm" className="mt-3">
            <thead>
              <tr>
                <th>name</th>
                <th>timeframe</th>
                <th>subject</th>
                <th>edit</th>
                <th>delete</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item) => (
                <tr key={item.id}>
                  <td>
                    <button
                      onClick={() => navigate(`/product/${item.id}`)}
                      type="button"
                      class="btn btn-link"
                    >
                      {item.name}
                    </button>
                  </td>
                  <td>{item.category?.name || "NULL"}</td>
                  <td>{item.brand?.name || "NULL"}</td>
                  <td>
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => handleUpdateClick(item.id)}
                    >
                      edit
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDeleteClick(item.id)}
                    >
                      delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {totalPages > 1 && <Pagination>{pages}</Pagination>}
        </>
      ) : (
        <p>
          By clicking the button above, you can share your trading strategy.
        </p>
      )}
      <Button onClick={handleLogout}>log out</Button>
    </Container>
  );
});

export default User;
