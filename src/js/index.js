import "./../styles/sass/main.scss";
import { domElements } from "./config/domElements";

import List from "./models/List";
import * as listView from "./views/listView";

let list;

const init = () => {
  createListOfPosts();
};

//callbacks for Event Handlers
const createListOfPosts = async () => {
  list = new List();
  await list.getListOfPosts();

  renderPosts(list.displayItems);
};

const filterPosts = e => {
  let filteredPosts = list.searchPosts(domElements.searchInput.value);
  //renderPosts(filteredPosts);
  renderPosts(list.displayItems);
};

const loadMorePosts = () => {
  list.loadMorePosts();
  renderPosts(list.displayItems);
}

const deletePost = id => {
  list.removeItem(id);
  renderPosts(list.displayItems);
};

const showPopup = () => {
  domElements.title.value = '';
  domElements.comment.value = '';
  domElements.popup.classList.toggle('popup__modal--shown');
  document.querySelector('.popup__background').classList.toggle('popup__background--shown');
};

const showPostDetails = (id, el) => {
  //Show the comment
  document.getElementById(id).classList.toggle('post__comment--shown');

  //Read more | Read less button
  const btnDetails = el.querySelector('.btn__post-details');
  if (btnDetails.textContent.includes('Read more')){
    el.querySelector('.btn__post-details').innerHTML = 'Read less <span>&rarr;</span>';
  } else {
    el.querySelector('.btn__post-details').innerHTML = 'Read more <span>&rarr;</span>';
  }
};

const addPost = () => {
  event.preventDefault();
  if (validationOfPost()) {
    let id = list.items.length + 1;
    list.addItem(1, id, domElements.title.value, domElements.comment.value);
    renderPosts(list.displayItems);
    showPopup();
  } else {
    document.querySelector('.error-title').textContent = "Please provide from 3 to 100 letters";
    document.querySelector('.error-comment').textContent = "Please provide from 3 to 500 letters";
  }
};

//helper functions
const renderPosts = posts => {
  listView.clearPosts();
  posts.forEach(post => {
    let el = listView.renderPost(post);
    el.querySelector('.btn__post-delete').addEventListener(
      'click',
      deletePost.bind(null, post.id)
    );
    el.querySelector('.btn__post-details').addEventListener('click', showPostDetails.bind(null, post.id, el));
  });
};

const validationOfPost = () => {
  const titleIsValid =
    domElements.title.value.length >= 3 &&
    domElements.title.value.length <= 100;
  const commentIsValid =
    domElements.comment.value.length >= 3 &&
    domElements.comment.value.length <= 100;

  if (titleIsValid && commentIsValid) {
    return true;
  } else {
    return false;
  }
};

//Event Handlers
domElements.searchInput.addEventListener('input', filterPosts);
domElements.createButton.addEventListener('click', showPopup);
domElements.closePopupButton.addEventListener('click', showPopup);
domElements.addPostButton.addEventListener('click', addPost);
domElements.loadMorePosts.addEventListener('click', loadMorePosts);

//Events for validations
domElements.title.addEventListener("input", function (event) {
  let test = (domElements.title.value.length >= 3 &&
  domElements.title.value.length <= 100);

  if (test) {
    document.querySelector('.popup__title-input').classList.remove('invalid');
    // error.innerHTML = "";
    // error.className = "error";
  } else {
    document.querySelector('.popup__title-input').classList.add('invalid');
  }
}, false);

domElements.comment.addEventListener("input", function (event) {
  let test = (domElements.comment.value.length >= 3 &&
  domElements.comment.value.length <= 500);

  console.log(test);
  if (test) {
    document.querySelector('.popup__post-input').classList.remove('invalid');
    domElements.error.innerHTML = "";
    domElements.error.className = "error";
  } else {
    document.querySelector('.popup__post-input').classList.add('invalid');
  }
}, false);


//Event for search
document.querySelector('.btn__search').addEventListener('click', () => {
  document.querySelector('.search__input').classList.toggle('search__input--shown');

  if (document.querySelector('.search__icon').classList.contains('ion-ios-search')) {
    document.querySelector('.search__icon').classList.remove('ion-ios-search');
    document.querySelector('.search__icon').classList.add('ion-ios-close-outline');
  } else {
    document.querySelector('.search__icon').classList.remove('ion-ios-close-outline');
    document.querySelector('.search__icon').classList.add('ion-ios-search');
    document.querySelector('.search__input').value = '';
  }
});


init();


// document.querySelector('.btn__submit').addEventListener('click', () => {
//   if (!validationOfPost()) {
//     console.log(document.querySelector('.error'));
//     domElements.title.classList.add('invalid');
//     domElements.comment.classList.add('invalid');
//     document.querySelector('.error-title').textContent = "Please provide from 3 to 100 letters";
//     document.querySelector('.error-comment').textContent = "Please provide from 3 to 500 letters";
//     domElements.error.classList.add('active');
//   } else {
//     console.log('meow');
//     domElements.title.classList.remove('valid');
//     domElements.comment.classList.remove('valid');
//     domElements.error.innerHTML = "";
//     domElements.error.className = "error";
//   }
// });
