import { makeAutoObservable } from "mobx";

class CatalogStore {
  _categories = [];
  _brands = [];
  _products = [];
  _category = null; // выбранная категория
  _brand = null; // выбранный бренд
  _page = 1; // текущая страница
  _count = 0; // сколько всего товаров
  _limit = 12; // товаров на страницу
  _name = "";
  _sort = "";

  constructor() {
    makeAutoObservable(this);
  }

  get categories() {
    return this._categories;
  }

  get brands() {
    return this._brands;
  }

  get products() {
    return this._products;
  }

  get category() {
    return this._category;
  }

  get brand() {
    return this._brand;
  }

  get page() {
    return this._page;
  }

  get count() {
    return this._count;
  }

  get limit() {
    return this._limit;
  }

  get name() {
    return this._name;
  }

  get sort() {
    return this._sort;
  }

  get pages() {
    // всего страниц
    return Math.ceil(this.count / this.limit);
  }

  set categories(categories) {
    this._categories = categories;
  }

  set brands(brands) {
    this._brands = brands;
  }

  set products(products) {
    this._products = products;
  }

  set category(id) {
    this.page = 1;
    this._category = id;
  }

  set brand(id) {
    this.page = 1;
    this._brand = id;
  }

  set page(page) {
    this._page = page;
  }

  set count(count) {
    this._count = count;
  }

  set limit(limit) {
    this._limit = limit;
  }

  set name(name) {
    this._name = name;
  }

  set sort(sort) {
    this._sort = sort;
  }
}

export default CatalogStore;
