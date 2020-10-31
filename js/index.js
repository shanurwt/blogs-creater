
const container = document.querySelector('.blogs');
const searchForm = document.querySelector('.search');

const renderPosts = async (term) => {


    let uri = 'http://localhost:3000/posts?_sort=likes&_order=desc';
    if (term) {
        uri += `&q=${term}`;
    }
    let res = await fetch(uri);

    let posts = await res.json();

    console.log(posts);

    let template = '';

    posts.forEach(post => {
        template += `
        <div class="post"> 
        <h2> ${post.title} </h2>
        <p><small> ${post.likes} likes </p>
        <p> ${post.body.slice(0, 100)}... </p>
        <a href="/details.html?id=${post.id}"> Read More... </a>
        </div>
    `
    })

    container.innerHTML = template;
}

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    renderPosts(searchForm.term.value.trim());
})

window.addEventListener('DOMContentLoaded', () => renderPosts());