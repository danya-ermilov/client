import { makeAutoObservable } from "mobx";

class BasketStore {
  _products = [];

  constructor() {
    makeAutoObservable(this);
  }

  get products() {
    return this._products;
  }

  set products(products) {
    this._products = products;
  }

  get count() {
    if (this._products) {
      return this._products.length;
    } else {
      return 0;
    }
    // всего позиций в корзине
  }
}

export default BasketStore;
