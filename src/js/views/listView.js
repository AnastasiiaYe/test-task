import { domElements } from '../config/domElements';

export const renderPost = post => {
  const container = document.createElement('div');
  container.className = 'post';

  const html = `
    <h1 class="heading-1">${post.title}<h1>
    <button class="btn__post-delete"><i class="ion-ios-trash-outline post__delete-icon"></i></button>

    <p class="post__comment" id="${post.id}">${post.body}</p>

    <button class="btn__post-details u-margin-top-small">Read more <span>&rarr;</span></button></div>
   
    `;
  container.innerHTML = html;

  domElements.postsList.appendChild(container);

  return container;

};


export const clearPosts = () => {
  domElements.postsList.innerHTML = '';
}
