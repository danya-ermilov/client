import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import {
  fetchOneProduct,
  updateProduct,
  fetchCategories,
  fetchBrands,
} from "../http/catalogAPI.js";
import { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";

const defaultValue = { name: "", category: "", brand: "", pdf_file_name: "" };
const defaultValid = {
  name: null,
  category: null,
  brand: null,
  pdf_file_name: null,
};

const isValid = (value) => {
  const result = {};
  const pattern = /^[1-9][0-9]*$/;
  for (let key in value) {
    if (key === "name") result.name = value.name.trim() !== "";
    if (key === "pdf_file") result.pdf_file_name = value.pdf_file.name !== "";
    if (key === "category") result.category = pattern.test(value.category);
    if (key === "brand") result.brand = pattern.test(value.brand);
  }
  return result;
};

const UpdateProduct = observer((props) => {
  const { id, show, setShow, setChange } = props;

  const [value, setValue] = useState(defaultValue);
  const [valid, setValid] = useState(defaultValid);

  // список категорий и список брендов для возможности выбора
  const [categories, setCategories] = useState(null);
  const [brands, setBrands] = useState(null);

  // выбранное для загрузки изображение товара
  const [image, setImage] = useState(null);
  const [pdf_file, setPdf_file] = useState(null);
  const [zip_file, setZip_file] = useState(null);

  // список характеристик товара

  useEffect(() => {
    if (id) {
      // нужно получить с сервера данные товара для редактирования
      fetchOneProduct(id)
        .then((data) => {
          const prod = {
            name: data.name,
            category: data.categoryId.toString(),
            brand: data.brandId.toString(),
            pdf_file: data.pdf_file,
            link: data.link,
          };

          //setPdf_file(prod.pdf_file);

          setValue(prod);
          setValid(isValid(prod));
          // для удобства работы с хар-ми зададим для каждой уникальный идентификатор
          // и доп.свойства, которые подскажут нам, какой http-запрос на сервер нужно
          // выполнить — добавления, обновления или удаления характеристики
        })
        .catch((error) => alert(error.response.data.message));
      // нужно получить с сервера список категорий и список брендов
      fetchCategories().then((data) => setCategories(data));
      fetchBrands().then((data) => setBrands(data));
    }
  }, [id]);

  const handleInputChange = (event) => {
    const data = { ...value, [event.target.name]: event.target.value };
    setValue(data);
    setValid(isValid(data));
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handlePdfChange = (event) => {
    const data = {
      ...value,
      pdf_file: event.target.files[0],
    };
    //console.log(event.target);
    //console.log(event.target.files[0].name);
    setValue(data);
    setValid(isValid(data));
    setPdf_file(event.target.files[0]);
  };

  const handleZipChange = (event) => {
    setZip_file(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    /*
     * На первый взгляд кажется, что переменная correct не нужна, можно обойтись valid, но это
     * не так. Нельзя использовать значение valid сразу после изменения этого значения — ф-ция
     * setValid не изменяет значение состояния мгновенно. Вызов функции лишь означает — React
     * «принял к сведению» наше сообщение, что состояние нужно изменить.
     */
    const correct = isValid(value);
    setValid(correct);

    // если введенные данные прошли проверку — можно отправлять их на сервер
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
      if (image) data.append("image", image, image.name);
      if (zip_file) data.append("zip_file", zip_file, zip_file.name);
      //console.log(process.env.REACT_APP_IMG_URL + pdf_file);
      if (pdf_file) data.append("pdf_file", pdf_file, pdf_file.name);

      // нужно обновить, добавить или удалить характеристики и обязательно дождаться
      // ответа сервера — поэтому функция updateProperties() объявлена как async, а
      // в теле функции для выполнения действия с каждой хар-кой используется await

      updateProduct(id, data)
        .then((data) => {
          // сбрасываем поле загрузки изображения, чтобы при сохранении товара,
          // когда новое изображение не выбрано, не загружать старое повтороно
          event.target.image.value = "";
          event.target.pdf_file.value = "";
          event.target.zip_file.value = "";
          // в принципе, мы могли бы сбросить все поля формы на дефолтные значения, но
          // если пользователь решит отредатировать тот же товар повтороно, то увидит
          // пустые поля формы — http-запрос на получение данных для редактирования мы
          // выполняем только тогда, когда выбран новый товар (изменился id товара)
          const prod = {
            name: data.name,
            category: data.categoryId.toString(),
            brand: data.brandId.toString(),
          };
          setValue(prod);
          setValid(isValid(prod));
          // мы получим актуальные значения хар-тик с сервера, потому что обновление
          // хар-тик завершилось еще до момента отправки этого http-запроса на сервер

          // закрываем модальное окно редактирования товара
          setShow(false);
          // изменяем состояние, чтобы обновить список товаров
          setChange((state) => !state);
        })
        .catch((error) => alert(error.response.data.message));
    }
  };

  return (
    <Modal show={show} onHide={() => setShow(false)} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>edit</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Control
            name="name"
            value={value.name}
            onChange={(e) => handleInputChange(e)}
            isValid={valid.name === true}
            isInvalid={valid.name === false}
            placeholder="name..."
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
              <p>update picture(optional):</p>
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
              <p>update pdf:</p>
            </Col>
            <Col>
              <Form.Control
                name="pdf_file"
                type="file"
                value={value.pdf_file_name}
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
              <p>update zip(optional):</p>
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

          <Col>
            <Button type="submit">submit</Button>
          </Col>
        </Form>
      </Modal.Body>
    </Modal>
  );
});

export default UpdateProduct;
