const blogContainer = document.querySelector('#nav');

function generateBlog(data) {
    let html = data.map((post, i) => {
        return `
            <a href="${post.slug}" class="nav-btn btn${i+1}"><div>
                <p class="title title-text">${post.title}</p>
                <p class="block-text">${post.description}</p>
            </div></a>
        `;
    });
    blogContainer.innerHTML = html.join('');
}

fetch('https://cdn.contentful.com/spaces/pxjo3sqgzqm9/entries?access_token=39409070d11510463a6b5003e1edeba322a5367eef495132603cae8d5670f163')
.then((response) => {
    return response.json();
})
.then((data) => {
    if (data.items.length == 0) {
        return;
    } else {
        let posts = data.items.map((post) => {
            return post.fields;
        });
        generateBlog(posts);
    }
})
.catch(console.error)