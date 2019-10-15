import { apiURL } from "../config/config";

export default class List {
  constructor(items) {
    this.items = [];
    this.displayItems = [];
    this.filteredItems = [];
    this.displayPostsIncrement = 10;
  }

  async getListOfPosts() {
    try {
      const request = await fetch(apiURL);
      this.items = await request.json();
      this.filteredItems = this.items;
      this.displayItems = this.items.slice(0, this.displayPostsIncrement + 1);
      document.querySelector('.spinner').remove();
    } catch {
      console.log(`Error during fetch the data from ${apiURL}`);
    }
  }

  searchPosts(input) {
    this.filteredItems = this.items.filter(el => {
      return el.title.includes(input) || el.body.includes(input);
    });
    this.displayItems = this.filteredItems.slice(0, this.displayPostsIncrement + 1);
  }

  addItem(userId, id, title, body) {
    const item = {
      userId: userId,
      id: id,
      title: title,
      body: body
    };

    this.items.unshift(item);
    this.displayItems.unshift(item);

    return item;
  }

  removeItem(id) {
    const index = this.items.findIndex(el => el.id === id);
    const indexDisplayed = this.displayItems.findIndex(el => el.id === id);
    this.items.splice(index, 1);
    this.displayItems.splice(indexDisplayed, 1);
  }

  loadMorePosts() {
    this.displayItems = this.filteredItems.slice(0, this.displayItems.length + this.displayPostsIncrement);
  }
}
