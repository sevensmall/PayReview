import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
// import Navigation Bar
import TopNav from './components/TopNav';


ReactDOM.render(<TopNav activeHome="active" />, document.getElementById('nav'));
export default class Home extends React.Component {
  render() {
    return (
      <div>
        <a className="col-sm-2 btn btn-warning btn-lg ml-1" href="./admin.html">Admin</a>
        <a className="col-sm-2 btn btn-success btn-lg ml-1" href="./employee.html">Employee</a>
      </div>
    );
  }
}

ReactDOM.render(<Home />, document.getElementById('app'));
