# Amplify CLI

You have been experiencing [the Amplify Console](https://console.aws.amazon.com/amplify/home). This is great for setting up JAMstack builds and continuous deployment from Git by default.

To get extra serverless power, we're going to be using Amplify CLI:

- Docs on [Github](https://github.com/aws-amplify/amplify-cli) and [Amplify](https://aws-amplify.github.io/docs/cli/concept)

## Install

```bash
npm install -g @aws-amplify/cli
amplify configure # optional, opens AWS Management Console, sign in if you aren't logged in
# pick a AWS region
# create new IAM user
# get accessKeyId and secretAccessKey pair (look out for this!)
# name profile whatever you want like gatsby-amplify
```

To start using it for your Gatsby project, run

```bash
amplify init # default choices for everything
```

Note the new `/amplify` folder.

For easier operation with React, we can now install the helper libraries as well:

```bash
npm i aws-amplify aws-amplify-react
```

## Adding AWS services

There are various backend services you can addon to your app:

```
amplify add {service}
```

These are:

- `auth` (Amazon Cognito)
- `storage` (Amazon S3 & Amazon DynamoDB)
- `function` (AWS Lambda)
- `api` (AWS AppSync & Amazon API Gateway)
- `analytics` (Amazon Pinpoint)
- `hosting` (Amazon S3 and Amazon CloudFront distribution)
- `notifications` (Amazon Pinpoint)
- `interactions` (Amazon Lex)

We will practice by adding auth and storage.

## Serverless Authentication with AWS Cognito

```bash
amplify add auth # go with default config
# Username
# just Email
```

At any point, you can run `amplify status` to check that what you have configured.

When you're happy you have it right, run

```bash
amplify push
```

You should see a new file `src/aws-exports.js`. Don't touch it.

We'll now have to pass this configuration to Amplify in our Gatsby app:

```js
// pages/index.js
import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"

import Amplify from "aws-amplify"
import config from "../aws-exports"
Amplify.configure(config)

const IndexPage = () => (
  <Layout>
    <h1>Hi people</h1>
    <p>
      Welcome to your new Gatsby site with multi-user authentication powered by{" "}
      <a href="https://amplify.aws">AWS Amplify</a>
    </p>
    <p>
      Create a new account: <Link to="/app/signup">Sign Up</Link>
    </p>
    <Link to="/app/login">Sign In</Link>
    <br />
    <Link to="/app/home">Home</Link>
    <br />
    <Link to="/app/profile">Your profile</Link>
  </Layout>
)

export default IndexPage
```

and we'll also have to make sure to create dynamic pages (client-only, no static pages since it's all behind an authentication wall):

```js
// gatsby-node.js
exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions

  // page.matchPath is a special key that's used for matching pages
  // only on the client.
  if (page.path.match(/^\/app/)) {
    page.matchPath = `/app/*`

    // Update the page.
    createPage(page)
  }
}
```

All of these pages will match to the `/app` page:

and make an `app` page as well

```js
// pages/app.js
import React from "react"
import { Router } from "@reach/router"
import Layout from "../components/layout"
import Details from "../components/Details"
import Home from "../components/Home"
import Login from "../components/Login"
import SignUp from "../components/SignUp"
import PrivateRoute from "../components/PrivateRoute"

const App = () => (
  <Layout>
    <Router>
      <PrivateRoute path="/app/home" component={Home} />
      <PrivateRoute path="/app/profile" component={Details} />
      <Login path="/app/login" />
      <SignUp path="/app/signup" />
    </Router>
  </Layout>
)

export default App
```

We'll check for the authenticated user in `gatsby-browser.js`:

```js
// gatsby-browser.js
import Auth from "@aws-amplify/auth"
import { setUser } from "./src/utils/auth"

export const onRouteUpdate = (state, page, pages) => {
  Auth.currentAuthenticatedUser()
    .then((user) => {
      const userInfo = {
        ...user.attributes,
        username: user.username
      }
      setUser(userInfo)
    })
    .catch((err) => {
      window.localStorage.setItem("gatsbyUser", null)
    })
}
```

For the actual signup/login components, we aren't going to go through all of them but you can [check the Gatsby Amplify Auth starter here](https://github.com/dabit3/gatsby-auth-starter-aws-amplify).

## Serverless Compute with AWS Lambda

```bash
amplify add api # choose REST
# name your api here, i'll use "jsconfapi"
```

Pick the local express function, and restrict it to Authenticated users only. Feel free to edit the code to your needs.

When you're ready,

```bash
amplify push
```

to deploy the serverless function.

Now we need to access it from within our app. Head to `src/components/Home.js` (assuming you are following the starter above) and:

```js
// src/components/Home.js
import React from "react"
import { Link } from "gatsby"
import { API } from "aws-amplify"

const Home = () => {
  const [state, setState] = React.useState([])
  const getAPI = () => API.get("jsconfapi").then(setState)
  return (
    <div>
      <h1>Home</h1>
      <p>
        You are now logged in! <Link to="/app/profile">View profile</Link>
      </p>
      <div>
        <button onClick={getAPI}>Click Me!</button>
        <pre>{JSON.stringify(state, null, 2)}</pre>
      </div>
      <p>
        Now go build something great and deploy it using the{" "}
        <a href="https://console.amplify.aws">AWS Amplify Console</a>
      </p>
    </div>
  )
}

export default Home
```

and that's it!

> REMEMBER: every time you make changes to your Amplify functions, you need to run `amplify push` again.

## Serverless Storage with AWS Lambda

```bash
amplify add storage # choose Content
# give a friendly name
```

When you're ready,

```bash
amplify push
```

In your React component, you can import accordingly:

```js
import React, { Component } from "react"
import logo from "./logo.svg"
import "./App.css"

import { withAuthenticator } from "aws-amplify-react"
import { Storage } from "aws-amplify"

class App extends Component {
  state = { fileUrl: "", file: "", filename: "", storedImgs: null }
  componentDidMount() {
    Storage.get("1500x500.jpeg")
      .then((data) => {
        this.setState({
          storedImgs: data
        })
      })
      .catch((err) => {
        console.log("error fetching image")
      })
  }
  handleChange = (e) => {
    const file = e.target.files[0]
    this.setState({
      fileUrl: URL.createObjectURL(file),
      file,
      filename: file.name
    })
  }
  saveFile = () => {
    Storage.put(this.state.filename, this.state.file)
      .then(() => {
        console.log("successfully uploading file!")
        this.setState({ fileUrl: "", file: "", filename: "" })
      })
      .catch((err) => {
        console.log("error uploading file!", err)
      })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <input type="file" onChange={this.handleChange} />
        <img src={this.state.fileUrl} />
        <button onClick={this.saveFile}>Save File</button>
      </div>
    )
  }
}
```

To verify you are indeed saving correctly in S3, you can open your AWS Console, head to S3 and look for the uploaded files, in the bucket we created, in the `/public` folder

## Exercise

Create an Instagram clone using:

- Amplify Console
- Authentication
- Storage
- Serverless Functions

You can use [the Instapaper Material UI theme](https://themes.material-ui.com/themes/instapaper/) to get a leg up on UI.
