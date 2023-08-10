import { makeAutoObservable } from "mobx";

class CommentStore {
  _comments = [];

  constructor() {
    makeAutoObservable(this);
  }

  get comments() {
    return this._comments;
  }

  set comments(comments) {
    this._comments = comments;
  }

  get count() {
    if (this._comments) {
      return this._comments.length;
    } else {
      return 0;
    }
    // всего позиций в корзине
  }
}

export default CommentStore;
