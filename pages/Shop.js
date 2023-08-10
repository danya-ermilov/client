import { Container, Row, Col, Spinner } from "react-bootstrap";
import CategoryBar from "../components/CategoryBar.js";
import BrandBar from "../components/BrandBar.js";
import ProductList from "../components/ProductList.js";
import ProductSearch from "../components/ProductSearch.js";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../components/AppContext.js";
import {
  fetchCategories,
  fetchBrands,
  fetchAllProducts,
} from "../http/catalogAPI.js";
import { observer } from "mobx-react-lite";
import { Link, useLocation, useSearchParams } from "react-router-dom";

const getSearchParams = (searchParams) => {
  let category = searchParams.get("category");
  if (category && /[1-9][0-9]*/.test(category)) {
    category = parseInt(category);
  }
  let brand = searchParams.get("brand");
  if (brand && /[1-9][0-9]*/.test(brand)) {
    brand = parseInt(brand);
  }
  let page = searchParams.get("page");
  if (page && /[1-9][0-9]*/.test(page)) {
    page = parseInt(page);
  }
  let name = searchParams.get("name");
  let sort = searchParams.get("sort");
  return { category, brand, page, name, sort };
};

const Shop = observer(() => {
  const { catalog, user } = useContext(AppContext);

  const [categoriesFetching, setCategoriesFetching] = useState(true);
  const [brandsFetching, setBrandsFetching] = useState(true);
  const [productsFetching, setProductsFetching] = useState(true);

  const location = useLocation();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    fetchCategories()
      .then((data) => (catalog.categories = data))
      .finally(() => setCategoriesFetching(false));

    fetchBrands()
      .then((data) => (catalog.brands = data))
      .finally(() => setBrandsFetching(false));

    const { category, brand, page, name, sort } = getSearchParams(searchParams);
    catalog.category = category;
    catalog.brand = brand;
    catalog.page = page ?? 1;
    catalog.name = name;
    catalog.sort = sort;

    fetchAllProducts(
      catalog.category,
      catalog.brand,
      catalog.page,
      catalog.limit,
      catalog.name,
      catalog.sort
    )
      .then((data) => {
        catalog.products = data.rows;
        catalog.count = data.count;
      })
      .finally(() => setProductsFetching(false));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const { category, brand, page, name, sort } = getSearchParams(searchParams);

    if (category || brand || page || name || sort) {
      if (category !== catalog.category) catalog.category = category;
      if (brand !== catalog.brand) catalog.brand = brand;
      if (page !== catalog.page) catalog.page = page ?? 1;
      if (name !== catalog.name) catalog.name = name;
      if (sort !== catalog.sort) catalog.sort = sort;
    } else {
      catalog.category = null;
      catalog.brand = null;
      catalog.page = 1;
      catalog.name = null;
      catalog.sort = null;
    }
    // eslint-disable-next-line
  }, [location.search]);

  useEffect(() => {
    setProductsFetching(true);
    setTimeout(() => {
      fetchAllProducts(
        catalog.category,
        catalog.brand,
        catalog.page,
        catalog.limit,
        catalog.name,
        catalog.sort
      )
        .then((data) => {
          catalog.products = data.rows;
          catalog.count = data.count;
        })
        .finally(() => setProductsFetching(false));
    }, 1000);
    // eslint-disable-next-line
  }, [
    catalog.category,
    catalog.brand,
    catalog.page,
    catalog.name,
    catalog.sort,
  ]);

  return (
    <Container>
      {user.isAuth ? (
        <div>
          <ProductSearch />
          <Row className="mt-2">
            <Col md={3} className="mb-3">
              {categoriesFetching ? (
                <Spinner animation="border" />
              ) : (
                <CategoryBar />
              )}
            </Col>
            <Col md={9}>
              <div>
                {brandsFetching ? <Spinner animation="border" /> : <BrandBar />}
              </div>
              <div>
                {productsFetching ? (
                  <Spinner animation="border" />
                ) : (
                  <ProductList />
                )}
              </div>
            </Col>
          </Row>
        </div>
      ) : (
        <div>
          <h6>
            I see that you are an unregistered user, please follow the{" "}
            <Link to="/signup">link</Link> to register.
          </h6>
          <ProductSearch />
          <Row className="mt-2">
            <Col md={3} className="mb-3">
              {categoriesFetching ? (
                <Spinner animation="border" />
              ) : (
                <CategoryBar />
              )}
            </Col>
            <Col md={9}>
              <div>
                {brandsFetching ? <Spinner animation="border" /> : <BrandBar />}
              </div>
              <div>
                {productsFetching ? (
                  <Spinner animation="border" />
                ) : (
                  <ProductList />
                )}
              </div>
            </Col>
          </Row>
        </div>
      )}
    </Container>
  );
});

export default Shop;
