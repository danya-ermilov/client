import React, { useContext, useState } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";
import { AppContext } from "./AppContext";
import { observer } from "mobx-react-lite";

const ProductSearch = observer(() => {
  const [productName, setProductName] = useState("");
  const { catalog } = useContext(AppContext);
  const navigate = useNavigate();

  const texts = ["rate", "new", "late"];
  const mas = ["rating", "createdAt", "updatedAt"];
  const [value, setValue] = useState(0);

  const options = texts.map((text, index) => {
    return (
      <option key={index} value={index}>
        {text}
      </option>
    );
  });

  const handleInputChange = (event) => {
    setProductName(event.target.value);
    handleClick(event.target.value);
  };

  const handleClick = (name) => {
    catalog.name = name;

    const params = {};
    if (catalog.category) params.category = catalog.category;
    if (catalog.brand) params.brand = catalog.brand;
    if (catalog.page > 1) params.page = catalog.page;
    if (catalog.name) params.name = catalog.name;
    if (catalog.sort) params.sort = catalog.sort;
    navigate({
      pathname: "/market",
      search: "?" + createSearchParams(params),
    });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleClick(productName);
    }
  };

  const handleClick1 = (sort) => {
    catalog.sort = sort;

    const params = {};
    if (catalog.category) params.category = catalog.category;
    if (catalog.brand) params.brand = catalog.brand;
    if (catalog.page > 1) params.page = catalog.page;
    if (catalog.name) params.name = catalog.name;
    if (catalog.sort) params.sort = catalog.sort;
    navigate({
      pathname: "/market",
      search: "?" + createSearchParams(params),
    });
  };

  return (
    <div className="d-flex" style={{ marginTop: "5px" }}>
      <input
        className="form-control me-2"
        type="text"
        style={{ width: "17%" }}
        value={productName}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="search"
      />
      <select
        value={value}
        onChange={(event) => setValue(event.target.value)}
        className="form-select form-select-sm"
        aria-label=".form-select-sm example"
        style={{ width: "7%" }}
        onClick={() => handleClick1(mas[value])}
      >
        {options}
      </select>
    </div>
  );
});

export default ProductSearch;
/*
<div>
  <input
    type="text"
    value={productName}
    onChange={handleInputChange}
    onKeyDown={handleKeyDown}
  />
  <button onClick={() => handleClick(productName)}>Поиск</button>
</div>;

<select
        value={value}
        onChange={(event) => setValue(event.target.value)}
        className="form-select form-select-sm"
        aria-label=".form-select-sm example"
        style={{ width: "7%" }}
        onClick={() => handleClick(item.id)}
      >
        {options}
      </select>
*/
