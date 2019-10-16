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
  renderPosts(list.displayedItems);
};

const filterPosts = () => {
  list.searchPosts(domElements.searchInput.value);
  renderPosts(list.displayedItems);
};

const loadMorePosts = () => {
  list.loadMorePosts();
  renderPosts(list.displayedItems);
};

const deletePost = id => {
  list.removeItem(id);
  renderPosts(list.displayedItems);
};

const showPopup = () => {
  clearInput();
  domElements.popup.classList.toggle('popup__modal--shown');
  domElements.popupBackground.classList.toggle('popup__background--shown');
};

const showPostDetails = (id, el) => {
  //Expand the post
  document.getElementById(id).classList.toggle('post__comment--shown');
  //Read more | Read less button
  const btnDetails = el.querySelector('.btn__post-details');
  if (btnDetails.textContent.includes('Read more')) {
    btnDetails.innerHTML = 'Read less <span>&rarr;</span>';
  } else {
    btnDetails.innerHTML = 'Read more <span>&rarr;</span>';
  }
};

const addPost = () => {
  event.preventDefault();
  if (validationOfPost()) {
    let id = list.items.length + 1;
    list.addItem(1, id, domElements.title.value, domElements.comment.value);
    renderPosts(list.displayedItems);
    showPopup();
  } else {
    domElements.errorTitle.textContent = 'Please provide from 3 to 100 characters';
    domElements.errorComment.textContent = 'Please provide from 3 to 500 characters';
  }
};

//helper functions
const renderPosts = posts => {
  listView.clearPosts();
  posts.forEach(post => {
    let el = listView.renderPost(post);
    let btnPostDelete = el.querySelector('.btn__post-delete');
    let btnPostDetails= el.querySelector('.btn__post-details');
    //Event Listeners for rendered posts
    btnPostDelete.addEventListener('click', deletePost.bind(null, post.id));
    btnPostDetails.addEventListener('click', showPostDetails.bind(null, post.id, el));
  });
};

const clearInput = () => {
  domElements.title.value = '';
  domElements.comment.value = '';
  domElements.errorTitle.textContent = '';
  domElements.errorComment.textContent = '';
}

const clearValidationNotification = () => {
  domElements.errorTitle.innerHTML = '';
  domElements.errorTitle.className = 'error-title';
  domElements.errorComment.innerHTML = '';
  domElements.errorComment.className = 'error-comment';
}

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

const commentValidation = () => {
  let test =
  domElements.comment.value.length >= 3 &&
  domElements.comment.value.length <= 500;

  if (test) {
    document.querySelector('.popup__post-input').classList.remove('invalid');
    clearValidationNotification();
  } else {
    document.querySelector('.popup__post-input').classList.add('invalid');
  }
}

const titleValidation = () => {
  let test =
  domElements.title.value.length >= 3 &&
  domElements.title.value.length <= 100;

  if (test) {
    document.querySelector('.popup__title-input').classList.remove('invalid');
    clearValidationNotification();
  } else {
    document.querySelector('.popup__title-input').classList.add('invalid');
  }
}

const searchEventHandling = () => {
  domElements.searchInput.classList.toggle('search__input--shown');
  if (domElements.searchButtonIcon.classList.contains('ion-ios-search')) {
    domElements.searchButtonIcon.classList.remove('ion-ios-search');
    domElements.searchButtonIcon.classList.add('ion-ios-close-outline');
  } else {
    domElements.searchButtonIcon.classList.remove('ion-ios-close-outline');
    domElements.searchButtonIcon.classList.add('ion-ios-search');
    domElements.searchButtonIcon.value = '';
  }
}
//Event Handlers
domElements.searchInput.addEventListener('input', filterPosts);
domElements.createButton.addEventListener('click', showPopup);
domElements.closePopupButton.addEventListener('click', showPopup);
domElements.addPostButton.addEventListener('click', addPost);
domElements.loadMorePosts.addEventListener('click', loadMorePosts);
domElements.title.addEventListener( 'input',titleValidation);
domElements.comment.addEventListener('input', commentValidation);
domElements.searchButton.addEventListener('click', searchEventHandling);

init();