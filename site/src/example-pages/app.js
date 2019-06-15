// only for authentication section of workshop
import React from "react"
import { Router } from "@reach/router"
import Layout from "../components/AuthLayout"
import Details from "../components/AuthDetails"
import Home from "../components/AuthHome"
import Login from "../components/AuthLogin"
import SignUp from "../components/AuthSignUp"
import PrivateRoute from "../components/AuthPrivateRoute"

const App = () => (
  <Layout>
    <Router>
      <PrivateRoute default path="/app/home" component={Home} />
      <PrivateRoute path="/app/profile" component={Details} />
      <Login path="/app/login" />
      <SignUp path="/app/signup" />
    </Router>
  </Layout>
)

export default App
