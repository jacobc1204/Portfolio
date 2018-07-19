const contentful = require('contentful');
const fs = require('fs');

const client = contentful.createClient({
  space: 'pxjo3sqgzqm9',
  environment: 'master', // defaults to 'master' if not set
  accessToken: '39409070d11510463a6b5003e1edeba322a5367eef495132603cae8d5670f163',
});

function writeFile(slug, html) {
  const stream = fs.createWriteStream(`./blog/${slug}.html`);
  stream.once('open', () => {
    stream.write(html);
    stream.end();
  });
}

function generateBlogPosts(post) {
  const html = `
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
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=GvkzKJv95O">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=GvkzKJv95O">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png?v=GvkzKJv95O">
  <link rel="manifest" href="/site.webmanifest?v=GvkzKJv95O">
  <link rel="mask-icon" href="/safari-pinned-tab.svg?v=GvkzKJv95O" color="#5bbad5">
  <link rel="shortcut icon" href="/favicon.ico?v=GvkzKJv95O">
  <meta name="apple-mobile-web-app-title" content="Web Developer">
  <meta name="application-name" content="Web Developer">
  <meta name="msapplication-TileColor" content="#484668">
  <meta name="theme-color" content="#ffffff">
  <title>${post.title} || Jacob H Carlton</title>
  <meta name="description" content="${post.description}">
</head>
<body>
  <header id="header">
    <p class="title-text">Jacob H Carlton</p>
    <a href="/.."><img src="/images/logo.svg" alt="The logo for Jacob H Carlton." height="200px"></a>
    <p class="title title-text">Web Developer</p>
  </header>
  <div class="blog">
    <div class="text-box">
      <h2 class="title title-text">${post.title}</h2>
    </div>
    <p class="block-text">${post.content}</p>
    <img src="${post.image ? post.image.fields.file.url : ''}">
  </div>
  <script src="script.js"></script>
</body>
</html>
`;
  writeFile(post.slug, html);
}

function generateBlogNav(data) {
  const blogNav = data.map((post, i) => `
<a href="${post.slug}.html" class="nav-btn btn${i + 1}"><div>
  <p class="title title-text">${post.title}</p>
  <p class="block-text">${post.description}</p>
</div></a>
`);
  const html = `
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
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=GvkzKJv95O">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=GvkzKJv95O">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png?v=GvkzKJv95O">
  <link rel="manifest" href="/site.webmanifest?v=GvkzKJv95O">
  <link rel="mask-icon" href="/safari-pinned-tab.svg?v=GvkzKJv95O" color="#5bbad5">
  <link rel="shortcut icon" href="/favicon.ico?v=GvkzKJv95O">
  <meta name="apple-mobile-web-app-title" content="Web Developer">
  <meta name="application-name" content="Web Developer">
  <meta name="msapplication-TileColor" content="#484668">
  <meta name="theme-color" content="#ffffff">
  <title>Blog || Jacob H Carlton</title>
</head>
<body>
  <header id="header">
    <p class="title-text">Jacob H Carlton</p>
    <a href="/.."><img src="/images/logo.svg" alt="The logo for Jacob H Carlton." height="200px"></a>
    <p class="title title-text">Web Developer</p>
  </header>
  <div id="nav">
    ${blogNav.join('')}
  </div>
</body>
</html>
`;
  writeFile('index', html);
}

client.getEntries()
  .then((response) => {
    // console.log(response);
    const data = response.items.map((post) => {
      // console.log(post.fields);
      generateBlogPosts(post.fields);
      return post.fields;
    });
    generateBlogNav(data);
  })
  .catch(error => console.error(error));
