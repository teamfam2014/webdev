import React from 'react'
import ReactDOM from 'react-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { App } from './App'

library.add(fas)

const Greeting = ({className,message:msg, date:today}) => (
  <div class="banner">
    <h1 className={className}>{msg + today}</h1>
  </div>
)

const message = "Hello React! Today's Date is ";
const date = new Date();

const MyApp = () => (
  <div className="App">
    <Greeting className="ikea" message={message} date={date}/>
    <Greeting className="home-depot" message="Hello Today is " date={date}/>
  </div>
)

ReactDOM.render(
  <MyApp/>,
  document.getElementById('root')
)