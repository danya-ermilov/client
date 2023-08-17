import { Container, Row, Col, Button, Image, Spinner } from "react-bootstrap";
import { useEffect, useState, useContext, useCallback } from "react";
import {
  fetchOneProduct,
  fetchProdRating,
  to_rate,
  rate as fetchRate,
  delete_rate,
  download_zip,
} from "../http/catalogAPI.js";
import { get as fetchComments } from "../http/commentsAPI.js";
import { Link, useNavigate, useParams } from "react-router-dom";
import { pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { AppContext } from "../components/AppContext.js";
import { append, remove } from "../http/basketAPI.js";
import { observer } from "mobx-react-lite";
import CommentForm from "../components/CommentForm.js";
import CommentList from "../components/CommentList.js";

const Product = observer(() => {
  const navigate = useNavigate();
  const { Document, Page } = pdfjs;
  const { id } = useParams();
  const { basket, user, comment } = useContext(AppContext);
  const [product, setProduct] = useState(null);
  const [rating, setRating] = useState(null);
  const [rate, setRate] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    fetchOneProduct(id).then((data) => setProduct(data));
    fetchProdRating(id).then((data) => setRating(data));
    fetchRate(id).then((data) => setRate(data));
    fetchComments(id).then((data) => (comment.comments = data.rows));
  }, [id, comment]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const goToPrevPage = () =>
    setPageNumber(pageNumber - 1 <= 1 ? 1 : pageNumber - 1);

  const goToNextPage = () =>
    setPageNumber(pageNumber + 1 >= numPages ? numPages : pageNumber + 1);

  let b = true;
  if (rate != null) {
    if (rate.data !== 0) {
      b = false; //prinyal
    }
  }

  const handleClick = (productId) => {
    append(productId).then((data) => {
      basket.products = data.products;
    });
    window.location.reload();
  };

  const handleClickRemove = (productId) => {
    remove(productId).then((data) => {
      basket.products = data.products;
    });
    window.location.reload();
  };

  let a = true;
  if (basket.products) {
    basket.products.map((item) => {
      if (item.id == id) {
        return (a = false);
      }
    });
  }

  //console.log(a);

  const handleClick1 = (id) => {
    navigate(`/author/${id}`);
  };

  const handleClick2 = (id, rate) => {
    //console.log(id, rate);
    to_rate(id, rate);
    window.location.reload();
  };

  const handleClick3 = (id) => {
    delete_rate(id);
    window.location.reload();
  };

  function handleDownload(e) {
    e.stopPropagation();
    download_zip(product);
  }

  const texts = [1, 2, 3, 4, 5];
  const [value, setValue] = useState(0);

  const options = texts.map((text, index) => {
    return (
      <option key={index} value={index}>
        {text}
      </option>
    );
  });

  if (!product) {
    return <Spinner animation="border" />;
  }

  //console.log(product);
  return (
    <div>
      {user.isAuth ? (
        <Container>
          <Row className="mt-3 mb-3">
            <Col lg={4}>
              {product.image ? (
                <Image
                  width={300}
                  height={300}
                  src={process.env.REACT_APP_IMG_URL + product.image}
                />
              ) : (
                <Image
                  width={300}
                  height={300}
                  src={process.env.REACT_APP_IMG_URL + "photo.jpg"}
                />
              )}
            </Col>
            <Col lg={8}>
              <h1>{product.name}</h1>
              <a href={product.link} target="_blank" rel="noreferrer">
                {product.link}
              </a>
              <p>created at {product.createdAt.slice(0, 10)}</p>
              <div>
                {rating ? (
                  <p>
                    rating: {rating.rating.toFixed(2)}, votes: {rating.votes}
                  </p>
                ) : (
                  <Spinner animation="border" />
                )}
              </div>
              <div>
                {a ? (
                  <Button onClick={() => handleClick(product.id)}>
                    add to favorietes
                  </Button>
                ) : (
                  <Button
                    variant="danger"
                    onClick={() => handleClickRemove(product.id)}
                  >
                    remove from favorietes
                  </Button>
                )}
                <Button
                  style={{ margin: 10 + "px" }}
                  onClick={() => handleClick1(product.userId)}
                >
                  go to the author
                </Button>
              </div>
              <div>
                {b ? (
                  <div>
                    <select
                      value={value}
                      onChange={(event) => setValue(event.target.value)}
                      className="form-select form-select-sm"
                      aria-label=".form-select-sm example"
                    >
                      {options}
                    </select>
                    <Button
                      style={{ marginTop: 10 + "px" }}
                      onClick={() => handleClick2(product.id, texts[value])}
                      variant="success"
                    >
                      send a rate {texts[value]}
                    </Button>
                  </div>
                ) : (
                  <div>
                    <select
                      value={value}
                      onChange={(event) => setValue(event.target.value)}
                      className="form-select form-select-sm"
                      aria-label=".form-select-sm example"
                      disabled
                    >
                      {options}
                    </select>
                    <Button
                      style={{ marginTop: 10 + "px" }}
                      onClick={() => handleClick3(product.id)}
                      variant="danger"
                    >
                      delete my rate ({rate.data})
                    </Button>
                  </div>
                )}
              </div>
            </Col>
          </Row>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <nav>
              <button
                type="button"
                class="btn btn-info"
                style={{ marginRight: "3px" }}
                onClick={goToPrevPage}
              >
                Prev
              </button>
              <button type="button" class="btn btn-info" onClick={goToNextPage}>
                Next
              </button>
              <p>
                Page {pageNumber} of {numPages}
              </p>
            </nav>

            <Document
              file={process.env.REACT_APP_IMG_URL + product.pdf_file}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              <Page pageNumber={pageNumber} />
            </Document>
          </div>
          {product.zip_file ? (
            <div>
              <Button variant="secondary" onClick={(e) => handleDownload(e)}>
                download ZIP
              </Button>
            </div>
          ) : (
            <div> no zip file</div>
          )}
          <div>
            <h3>Comments</h3>
            <CommentList />
            <CommentForm id={product.id} />
          </div>
        </Container>
      ) : (
        <Container>
          To access this, you need to <Link to="/signup">sign up</Link> or{" "}
          <Link to="/login">log in</Link>
        </Container>
      )}
    </div>
  );
});

export default Product;

/*
<div style={{ display: "flex", justifyContent: "center" }}>
            <Document
              file={process.env.REACT_APP_IMG_URL + product.pdf_file}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              <div className="pages">
                {pageNumbers.map((number) => (
                  <Page key={number} pageNumber={number + 1} />
                ))}
              </div>
            </Document>
          </div>
*/
