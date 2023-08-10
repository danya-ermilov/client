import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import {
  createProduct,
  fetchCategories,
  fetchBrands,
} from "../http/catalogAPI.js";
import { useState, useEffect, useContext } from "react";
import { AppContext } from "./AppContext.js";

const defaultValue = {
  name: "",
  category: "",
  brand: "",
  pdf_file_name: "",
};
const defaultValid = {
  name: null,
  category: null,
  brand: null,
  pdf_file_name: null,
};

const isValid = (value) => {
  const result = {};
  const pattern = /^[1-9][0-9]*$/;
  //console.log(value);
  for (let key in value) {
    if (key === "name") result.name = value.name.trim() !== "";
    if (key === "pdf_file_name")
      result.pdf_file_name = value.pdf_file_name !== "";
    if (key === "category") result.category = pattern.test(value.category);
    if (key === "brand") result.brand = pattern.test(value.brand);
  }
  return result;
};

const CreateProduct = (props) => {
  const { user } = useContext(AppContext);
  const { show, setShow, setChange } = props;

  const [value, setValue] = useState(defaultValue);
  const [valid, setValid] = useState(defaultValid);

  //console.log(valid);

  // выбранное для загрузки изображение товара
  const [image, setImage] = useState(null);
  const [pdf_file, setPdf_file] = useState(null);
  const [zip_file, setZip_file] = useState(null);
  const [link, setLink] = useState(null);

  // список категорий и список брендов для возможности выбора
  const [categories, setCategories] = useState(null);
  const [brands, setBrands] = useState(null);

  // нужно получить с сервера список категорий и список брендов
  useEffect(() => {
    fetchCategories().then((data) => setCategories(data));
    fetchBrands().then((data) => setBrands(data));
  }, []);

  const handleInputChange = (event) => {
    const data = {
      ...value,
      [event.target.name]: event.target.value,
      //[event.target.link]: event.target.value,
    };
    setValue(data);
    setValid(isValid(data));
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleZipChange = (event) => {
    setZip_file(event.target.files[0]);
  };

  const handlePdfChange = (event) => {
    const data = {
      ...value,
      pdf_file_name: event.target.files[0].name,
    };
    //console.log(event.target);
    //console.log(event.target.files[0].name);
    setValue(data);
    setValid(isValid(data));
    setPdf_file(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    /*
     * На первый взгляд кажется, что переменная correct не нужна, можно обойтись valid, но это
     * не так. Нельзя использовать значение valid сразу после изменения этого значения — ф-ция
     * setValid не изменяет значение состояния мгновенно. Вызов функции лишь означает — React
     * «принял к сведению» наше сообщение, что состояние нужно изменить.
     */
    const correct = isValid(value);
    setValid(correct);

    // все поля формы прошли проверку, можно отправлять данные на сервер
    if (
      correct.name &&
      correct.category &&
      correct.brand &&
      correct.pdf_file_name
    ) {
      const data = new FormData();
      data.append("name", value.name.trim());
      if (value.link) data.append("link", value.link.trim());
      data.append("categoryId", value.category);
      data.append("brandId", value.brand);
      data.append("userId", user.id);
      if (image) data.append("image", image, image.name);
      data.append("pdf_file", pdf_file, pdf_file.name);
      if (zip_file) data.append("zip_file", zip_file, zip_file.name);
      createProduct(data)
        .then((data) => {
          // приводим форму в изначальное состояние
          event.target.image.value = "";
          event.target.pdf_file.value = "";
          setValue(defaultValue);
          setValid(defaultValid);
          // закрываем модальное окно создания товара
          setShow(false);
          // изменяем состояние компонента списка товаров,
          // чтобы в этом списке появился и новый товар
          setChange((state) => !state);
        })
        .catch((error) => alert(error.response.data.message));
    }
  };

  return (
    <Modal show={show} onHide={() => setShow(false)} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>create</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Control
            name="name"
            value={value.name}
            onChange={(e) => handleInputChange(e)}
            isValid={valid.name === true}
            isInvalid={valid.name === false}
            placeholder="name"
            className="mb-3"
          />
          <Form.Control
            name="link"
            value={value.link}
            onChange={(e) => handleInputChange(e)}
            isValid={valid.link === true}
            isInvalid={valid.link === false}
            placeholder="link"
            className="mb-3"
          />
          <Row className="mb-3">
            <Col>
              <Form.Select
                name="category"
                value={value.category}
                onChange={(e) => handleInputChange(e)}
                isValid={valid.category === true}
                isInvalid={valid.category === false}
              >
                <option value="">financial instrument</option>
                {categories &&
                  categories.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
              </Form.Select>
            </Col>
            <Col>
              <Form.Select
                name="brand"
                value={value.brand}
                onChange={(e) => handleInputChange(e)}
                isValid={valid.brand === true}
                isInvalid={valid.brand === false}
              >
                <option value="">timeframe</option>
                {brands &&
                  brands.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
              </Form.Select>
            </Col>
          </Row>
          <Row>
            <Col>
              <p>choose picture (optional):</p>
            </Col>
            <Col>
              <Form.Control
                name="image"
                type="file"
                onChange={(e) => handleImageChange(e)}
                placeholder="image..."
                accept="image/jpeg"
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <p>choose pdf:</p>
            </Col>
            <Col>
              <Form.Control
                name="pdf_file"
                type="file"
                onChange={(e) => handlePdfChange(e)}
                placeholder="pdf..."
                accept="application/pdf"
                isValid={valid.pdf_file_name === true}
                isInvalid={valid.pdf_file_name === false}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <p>choose zip (optional):</p>
            </Col>
            <Col>
              <Form.Control
                name="zip_file"
                type="file"
                onChange={(e) => handleZipChange(e)}
                placeholder="zip..."
                accept=".zip"
              />
            </Col>
          </Row>
          <Button type="submit">submit</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateProduct;
