import {rosterBuilder} from '../components/rosterBuilder/rosterBuilder';

export default (req, res) => {
  let html = 'hello';
  rosterBuilder.then( (rosterHTML) => {
    res.status(200).send(renderFullPage(rosterHTML));
  });
};


function renderFullPage(html) {
  return `
    <!doctype html>
    <html lang="en">
      <head>
        <title>Stack Sports Demo</title>
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <link rel="stylesheet" type="text/css" href="/home.css">
      </head>
      <body>
      <div class="container">
        <header class="header">
          <h1>Stack Sports Demo</h1>
          <nav>
            <input type="checkbox" id="checkbox_toggle"/>
            <div class="nav-container">
              <a href="/">Home</a>
            </div>
            <label htmlFor="checkbox_toggle" class="hamburger">
                <span class="line line-1"></span>
                <span class="line line-2"></span>
                <span class="line line-3"></span>
            </label>
          </nav>
        </header>
        ${html}
        </div>
      </body>
    </html>
    `;
}