const contentful = require('contentful');
const fs = require('fs');

const client = contentful.createClient({
  space: 'pxjo3sqgzqm9',
  environment: 'master', // defaults to 'master' if not set
  accessToken: '39409070d11510463a6b5003e1edeba322a5367eef495132603cae8d5670f163'
});

function writeFile(slug, html) {
  var stream = fs.createWriteStream(`./blog/${slug}.html`);
  stream.once('open', () => {
    stream.write(html);
    stream.end();
  });
}

function generateBlogPosts(post) {
  var html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <!-- Global site tag (gtag.js) - Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=UA-117249841-1"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'UA-117249841-1');
  </script>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="/style.css">
  <title>Jacob H Carlton</title>
  <meta name="description" content="${post.description}">
</head>
<body>
  <div id="header">
    <p class="title-text">Jacob H Carlton</p>
    <a href="/.."><img src="/images/logo.svg" alt="The logo for Jacob H Carlton." height="200px"></a>
    <p class="title title-text">Web Developer</p>
  </div>
  <div class="blog">
    <div class="text-box">
      <h2 class="title title-text">${post.title}</h2>
    </div>
    <p class="block-text">${post.content}</p>
    <img src="${post.image.fields.file.url}">
  </div>
  <script src="script.js"></script>
</body>
</html>
`;
  writeFile(post.slug, html);
}

function generateBlogNav(data) {
  var blogNav = data.map((post, i) => {
    return `
<a href="${post.slug}.html" class="nav-btn btn${i+1}"><div>
  <p class="title title-text">${post.title}</p>
  <p class="block-text">${post.description}</p>
</div></a>
`;
  });
  var html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <!-- Global site tag (gtag.js) - Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?  id=UA-117249841-1"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'UA-117249841-1');
  </script>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="/style.css">
  <title>Jacob H Carlton || Blog</title>
</head>
<body>
  <div id="header">
    <p class="title-text">Jacob H Carlton</p>
    <a href="/.."><img src="/images/logo.svg" alt="The logo for Jacob H Carlton." height="200px"></a>
    <p class="title title-text">Web Developer</p>
  </div>
  <div id="nav">
    ${blogNav.join('')}
  </div>
  <script src="/script.js"></script>
</body>
</html>
`;
  writeFile('index', html);
}

client.getEntries({
  order: '-sys.createdAt'
})
.then((response) => {
  // console.log(response);
  let data = response.items.map((post) => {
    generateBlogPosts(post.fields);
    return post.fields;
  });
  generateBlogNav(data);
})
.catch(console.error)