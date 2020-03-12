# Contribution to Project

:+1::tada: First off, thanks for taking the time to contribute! :tada::+1:

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

The following is a set of guidelines for contributing to Project.These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

## Table of Content

[Code of Conduct](#code-of-conduct)

[What should I know before I get started?](#what-should-i-know-before-i-get-started)

- [HTML5](##html5)
- [CSS](#css3)
- [JavaScript](#javascript)
- [Bootstrap](#bootstrap)
- [ReactJS](reactjs)
- [NodeJS](nodejs)
- [Express](express)
- [MongoDB](mongodb)
- [socket.io](#socket-io)
- [JWT Authentication](#jwt-authentication)

[How Can I Contribute?](#how-can-i-contribute)

- [Reporting Bugs](#reporting-bugs)
- [Suggesting Enhancements](#suggesting-enhancements)
- [Your First Code Contribution](#your-first-code-contribution)
- [Pull Requests](#pull-requests)

[Styleguides](#styleguides)

- [Git Commit Messages](#git-commit-messages)
- [JavaScript Styleguide](#javaScript-styleguide)

## Code of Conduct

This project and everyone participating in it is governed by the [Projects Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to [correspond.rishav@gmail.com](mailto:correspond.rishav@gmail.com).

## What should I know before I get started?

### HTML5

HTML stands for "Hypertext Markup Language." HTML is the language used to create webpages. "Hypertext" refers to the hyperlinks that an HTML page may contain. "Markup language" refers to the way tags are used to define the page layout and elements within the page.

Below is an example of HTML used to define a basic webpage with a title and a single paragraph of text.

```
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>I'm Title of the Page</title>
  </head>
  <body>
  <h1>Hello World!</h1>
  </body>
</html>
```

You can refer [HTML by MDN web docs](https://developer.mozilla.org/en-US/docs/Learn/HTML) for more in-depth knowledge of HTML.

### CSS

Cascading Style Sheets, fondly referred to as CSS, is a simple design language intended to simplify the process of making web pages presentable.

CSS handles the look and feel part of a web page. Using CSS, you can control the color of the text, the style of fonts, the spacing between paragraphs, how columns are sized and laid out, what background images or colors are used, layout designs,variations in display for different devices and screen sizes as well as a variety of other effects.

CSS is easy to learn and understand but it provides powerful control over the presentation of an HTML document. Most commonly, CSS is combined with the markup languages HTML or XHTML.

CSS Syntax:

`selector { property: value }`

example:

```
  h1 {
   color: #36CFFF;
  }
```

You can refer [CSS by MDN web docs](https://developer.mozilla.org/en-US/docs/Learn/CSS) for more in-depth knowledge of CSS.

### JavaScript

JavaScript is a scripting or programming language that allows you to implement complex features on web pages — every time a web page does more than just sit there and display static information for you to look at — displaying timely content updates, interactive maps, animated 2D/3D graphics, scrolling video jukeboxes, etc. — you can bet that JavaScript is probably involved. It is the third layer of the layer cake of standard web technologies, two of which (HTML and CSS) we have covered in much more detail in other parts of the Learning Area.

You can refer [JavaScript by MDN web docs](https://developer.mozilla.org/en-US/docs/Learn/JavaScript) for more in-depth knowledge of JavaScript.

### Bootstrap

Bootstrap is an open source toolkit for developing with HTML, CSS, and JS. Quickly prototype your ideas or build your entire app with our Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful plugins built on jQuery.

You can refer [Bootstrap docs](https://getbootstrap.com/docs/4.4/getting-started/introduction/) for more in-depth knowledge of Bootstrap.

### ReactJS

React is a JavaScript library for building user interfaces.
It is JavaScript library that specializes in helping developers build user interfaces, or UIs. In terms of websites and web applications, UIs are the collection of on-screen menus, search bars, buttons, and anything else someone interacts with to USE a website or app.

React comes with two key features that add to its appeal for JavaScript developers:

- JSX
  At the heart of any basic website are HTML documents. Web browsers read these documents and display them on your computer, tablet, or phone as web pages. During this process, browsers create something called a Document Object Model (DOM), a representational tree of how the web page is arranged. Developers can then add dynamic content to their projects by modifying the DOM with languages like JavaScript.

  JSX (short for JavaScript eXtension) is a React extension that makes it easy for web developers to modify their DOM by using simple, HTML-style code. And—since React JS browser support extends to all modern web browsers—JSX is compatible with any browser platform you might be working with.

- Virtual DOM

  If you’re not using React JS (and JSX), your website will use HTML to update its DOM (the process that makes things “change” on screen without a user having to manually refresh a page). This works fine for simple, static websites, but for dynamic websites that involve heavy user interaction it can become a problem (since the entire DOM needs to reload every time the user clicks a feature calling for a page refresh).

  However, if a developer uses JSX to manipulate and update its DOM, React JS creates something called a Virtual DOM. The Virtual DOM (like the name implies) is a copy of the site’s DOM, and React JS uses this copy to see what parts of the actual DOM need to change when an event happens (like a user clicking a button).

  Let’s say a user enters a comment in a blog post form and pushes the “Comment” button. Without using React JS, the entire DOM would have to update to reflect this change (using the time and processing power it takes to make this update). React, on the other hand, scans the Virtual DOM to see what changed after a user action (in this case, a comment being added) and selectively updates that section of the DOM only.

You can refer [ReactJS docs](https://reactjs.org/) for more in-depth knowledge of ReactJS.

### NodeJS

As an asynchronous event-driven JavaScript runtime, Node.js is designed to build scalable network applications. In the following "hello world" example, many connections can be handled concurrently. Upon each connection, the callback is fired, but if there is no work to be done, Node.js will sleep.

HTTP is a first-class citizen in Node.js, designed with streaming and low latency in mind. This makes Node.js well suited for the foundation of a web library or framework.

```
  const http = require('http');

  const hostname = '127.0.0.1';
  const port = 3000;

  const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
  });

  server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
```

You can refer [NodeJS docs](https://nodejs.org/en/docs/) for more in-depth knowledge of NodeJS.

### Express

Express is a minimal and flexible Node.js web application framework that provides a robust set of features to develop web and mobile applications. It facilitates the rapid development of Node based Web applications. Following are some of the core features of Express framework −

- Allows to set up middlewares to respond to HTTP Requests.
- Defines a routing table which is used to perform different actions based on HTTP Method and URL.
- Allows to dynamically render HTML Pages based on passing arguments to templates.

```
  var express = require('express');
  var app = express();

  app.get('/', function (req, res) {
    res.send('Hello World');
  })

  var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
  })
```

You can refer [Express docs](https://expressjs.com/) for more in-depth knowledge of Express.

### MongoDB

MongoDB is a document-oriented NoSQL database used for high volume data storage. MongoDB is a database which came into light around the mid-2000s. It falls under the category of a NoSQL database.

Features of MongoDB-

- MongoDB stores data in flexible, JSON-like documents, meaning fields can vary from document to document and data structure can be changed over time
- The document model maps to the objects in your application code, making data easy to work with
- Ad hoc queries, indexing, and real time aggregation provide powerful ways to access and analyze your data
- MongoDB is a distributed database at its core, so high availability, horizontal scaling, and geographic distribution are built in and easy to use
- MongoDB is free to use. Versions released prior to October 16, 2018 are published under the AGPL. All versions released after October 16, 2018, including patch fixes for prior versions, are published under the Server Side Public License (SSPL) v1.

You can refer [MongoDB docs](https://www.mongodb.com/) for more in-depth knowledge of MongoDB.

### socket io

Socket.IO is a JavaScript library for real-time web applications. It enables real-time, bi-directional communication between web clients and servers. It has two parts: a client-side library that runs in the browser, and a server-side library for node.js. Both components have an identical API.

It works on every platform, browser or device, focusing equally on reliability and speed. Socket.IO is built on top of the WebSockets API (Client side) and Node.js. It is one of the most depended upon library on npm (Node Package Manager).

You can refer [Socket.io docs](https://socket.io/) for more in-depth knowledge of Socket.io.

### JWT Authentication

JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. This information can be verified and trusted because it is digitally signed. JWTs can be signed using a secret (with the HMAC algorithm) or a public/private key pair using RSA or ECDSA.

Although JWTs can be encrypted to also provide secrecy between parties, we will focus on signed tokens. Signed tokens can verify the integrity of the claims contained within it, while encrypted tokens hide those claims from other parties. When tokens are signed using public/private key pairs, the signature also certifies that only the party holding the private key is the one that signed it.

You can refer [JWT Authentication docs](https://jwt.io/introduction/) for more in-depth knowledge of JWT Authentication.

## How Can I Contribute?

### Reporting Bugs

### Suggesting Enhancements

### Your First Code Contribution

### Pull Requests

## Styleguides

### Git Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line
- When only changing documentation, include `[ci skip]` in the commit title
- Consider starting the commit message with an applicable emoji:
  | Commit type | Emoji |
  |:---------------------------|:----------------------------------------------|
  | Initial commit | :tada: `:tada:` |
  | Version tag | :bookmark: `:bookmark:` |
  | New feature | :sparkles: `:sparkles:` |
  | Bugfix | :bug: `:bug:` |
  | Metadata | :card_index: `:card_index:` |
  | Documentation | :books: `:books:` |
  | Documenting source code | :bulb: `:bulb:` |
  | Performance | :racehorse: `:racehorse:` |
  | Cosmetic | :lipstick: `:lipstick:` |
  | Tests | :rotating_light: `:rotating_light:` |
  | Adding a test | :white_check_mark: `:white_check_mark:` |
  | Make a test pass | :heavy_check_mark: `:heavy_check_mark:` |
  | General update | :zap: `:zap:` |
  | Improve format/structure | :art: `:art:` |
  | Refactor code | :hammer: `:hammer:` |
  | Removing code/files | :fire: `:fire:` |
  | Continuous Integration | :green_heart: `:green_heart:` |
  | Security | :lock: `:lock:` |
  | Upgrading dependencies | :arrow_up: `:arrow_up:` |
  | Downgrading dependencies | :arrow_down: `:arrow_down:` |
  | Lint | :shirt: `:shirt:` |
  | Translation | :alien: `:alien:` |
  | Text | :pencil: `:pencil:` |
  | Critical hotfix | :ambulance: `:ambulance:` |
  | Deploying stuff | :rocket: `:rocket:` |
  | Fixing on MacOS | :apple: `:apple:` |
  | Fixing on Linux | :penguin: `:penguin:` |
  | Fixing on Windows | :checkered_flag: `:checkered_flag:` |
  | Work in progress | :construction: `:construction:` |
  | Adding CI build system | :construction_worker: `:construction_worker:` |
  | Analytics or tracking code | :chart_with_upwards_trend: `:chart_with_upwards_trend:` |
  | Removing a dependency | :heavy_minus_sign: `:heavy_minus_sign:` |
  | Adding a dependency | :heavy_plus_sign: `:heavy_plus_sign:` |
  | Docker | :whale: `:whale:` |
  | Configuration files | :wrench: `:wrench:` |
  | Package.json in JS | :package: `:package:` |
  | Merging branches | :twisted_rightwards_arrows: `:twisted_rightwards_arrows:` |
  | Bad code / need improv. | :hankey: `:hankey:` |
  | Reverting changes | :rewind: `:rewind:` |
  | Breaking changes | :boom: `:boom:` |
  | Code review changes | :ok_hand: `:ok_hand:` |
  | Accessibility | :wheelchair: `:wheelchair:` |
  | Move/rename repository | :truck: `:truck:` |
  | Other | [Be creative](http://www.emoji-cheat-sheet.com/) |

  #### Example

  ```
  feat: add hat wobble
  ^--^  ^------------^
  |     |
  |     +-> Summary in present tense.
  |
  +-------> Type: chore, docs, feat, fix, refactor, style, or test.
  ```

  More Examples:

- `feat`: (new feature for the user, not a new feature for build script)
- `fix`: (bug fix for the user, not a fix to a build script)
- `docs`: (changes to the documentation)
- `style`: (formatting, missing semi colons, etc; no production code change)
- `refactor`: (refactoring production code, eg. renaming a variable)
- `test`: (adding missing tests, refactoring tests; no production code change)
- `chore`: (updating grunt tasks etc; no production code change)

References:

- [https://www.conventionalcommits.org/](https://www.conventionalcommits.org/)
- [https://seesparkbox.com/foundry/semantic_commit_messages](https://seesparkbox.com/foundry/semantic_commit_messages)
- [http://karma-runner.github.io/1.0/dev/git-commit-msg.html](http://karma-runner.github.io/1.0/dev/git-commit-msg.html)

### JavaScript Styleguide

All JavaScript must adhere to [JavaScript Standard Style](https://standardjs.com/).

- Prefer the object spread operator (`{...anotherObj}`) to `Object.assign()`
- Inline `export`s with expressions whenever possible

  ```js
  // Use this:
  export default class ClassName {}

  // Instead of:
  class ClassName {}
  export default ClassName;
  ```

- use camelCase for proper naming convention of variables, functions, etc.
