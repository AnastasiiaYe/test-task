import { apiURL } from "../config/config";
import { domElements } from "../config/domElements";

export default class List {
  constructor(items) {
    this.items = [];
    this.displayedItems = [];
    this.filteredItems = [];
    this.displayedPostsIncrement = 10;
  }

  async getListOfPosts() {
    try {
      const request = await fetch(apiURL); //API call GET
      this.items = await request.json();
      this.filteredItems = this.items;
      this.displayedItems = this.items.slice(0, this.displayedPostsIncrement + 1);
      domElements.spinner.remove();
    } catch {
      console.error(`Error during fetch the data from ${apiURL}`);
    }
  }

  searchPosts(input) {
    this.filteredItems = this.items.filter(el => {
      return el.title.includes(input) || el.body.includes(input);
    });
    this.displayedItems = this.filteredItems.slice(0, this.displayedPostsIncrement + 1);
  }

  addItem(userId, id, title, body) {
    //API call POST would have to be placed here | Possibly using axios
    const item = {
      userId: userId,
      id: id,
      title: title,
      body: body
    };

    this.items.unshift(item);
    this.displayedItems.unshift(item);

    return item;
  }

  removeItem(id) {
    //API call DELETE would have to be placed here | Possibly using axios
    const index = this.items.findIndex(el => el.id === id);
    const indexDisplayed = this.displayedItems.findIndex(el => el.id === id);
    this.items.splice(index, 1);
    this.displayedItems.splice(indexDisplayed, 1);
  }

  loadMorePosts() {
    //Possibly could be received with additional API call
    this.displayedItems = this.filteredItems.slice(0, this.displayedItems.length + this.displayedPostsIncrement);
  }
}