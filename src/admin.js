import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
// Module to add or edit employee
import AddEmployee from './components/AddEmployee';
// Navigation bar module
import TopNav from './components/TopNav';

ReactDOM.render(<TopNav activeAdmin="active" />, document.getElementById('nav'));


export default class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: [],
            updateIndex: -1,
            showPopup: false
        };
    }

  // Request data from Api after loaded
    async componentDidMount() {
        fetch('./get-employees')
        .then((res) => res.json())
        .then((data) => {
          this.setState({ employees: data });
        })
        .catch(console.log);
      }

    // Popup form for adding or editing employee
    togglePopup(index) {
        if (index > -1) {
            this.state.updateInfo = {
                id: index,
                name: this.state.employees[index].name,
                position: this.state.employees[index].position
            };
        } else {
            this.state.updateInfo = {
                id: index
            };
        }
        this.setState({
          showPopup: !this.state.showPopup
        });
      }

    // Function to assign review task for selected user
    assigned(name) {
        alert(`Assigned review task to ${name}`);
    }

    // Add new employee with data from child component
    async getNewEmployee(data) {
        this.state.employees.push(data);
        this.setState({ employees: this.state.employees });
        // send data to Api
        const response = await fetch('./add-employee', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
              'Content-type': 'application/json; charset=UTF-8'
            }
          });
        console.log(response);
    }

    // Edit employee
    async updateEmployee(index, data) {
        this.state.employees[index] = data;
        this.setState({ employees: this.state.employees });
        // send data to Api
        const response = await fetch('./update-employee', {
            method: 'POST',
            body: JSON.stringify({ line: index, employee: data }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8'
            }
          });
        console.log(response);
    }

    // Remove employee
    async removeEmployee(index) {
        // Save default employees for test
        if (index < 4) {
            alert("Please don't remove the first 4 employees, you can add new one then remove him.");
            return;
        }
        if (!confirm('Are you sure to fire this guy?')) {
            return;
        }
        this.state.employees.splice(index, 1);
        this.setState({ employees: this.state.employees });
        // Send remove id to Api
        const response = await fetch('./del-employee', {
            method: 'POST',
            body: JSON.stringify({ line: index }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8'
            }
          });
        console.log(response);
    }


  render() {
    return (
      <div>
        <div className="alert alert-light">
          <img className="rounded-circle head" src="./images/nick.jpg" alt="Boss Head" />
          <h4 className="alert-heading">Wellcome Sir Fury</h4>
          <hr />
          <p className="mb-0">Here are all your employees</p>
          <button
            className="btn btn-primary float-right"
            type="button"
            onClick={() => { this.togglePopup(-1); }}
          >
          +Add New

          </button>
        </div>
        {this.state.showPopup
         ? (
           <AddEmployee
             updateInfo={this.state.updateInfo}
             getNewEmployee={this.getNewEmployee.bind(this)}
             updateEmployee={this.updateEmployee.bind(this)}
             closePopup={this.togglePopup.bind(this)}
           />
)
         : null}
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col" />
              <th scope="col">Name</th>
              <th scope="col">Position</th>
              <th scope="col">Actions</th>
              <th scope="col">Assign To Review</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.employees.map((item, index) => (
                <tr>
                  <th><img className="rounded-circle head" src={`./images/${item.head}`} /></th>
                  <td>{item.name}</td>
                  <td>{item.position}</td>
                  <td>
                    <div className="btn-group">
                      <a className="btn btn-sm btn-success" onClick={() => { this.togglePopup(index); }}>Update</a>
                      <a className="btn btn-sm btn-danger" onClick={() => { this.removeEmployee(index); }}>Remove</a>
                      <a className="btn btn-sm btn-info" href="./adminReview.html">Reviews</a>
                    </div>
                  </td>
                  <td>
                    <div>
                      <select className="custom-select custom-select-sm">
                        <option selected>Choose one to review</option>
                        {
                            this.state.employees.map((itemN) => (
                              <option value={itemN.name}>{itemN.name}</option>
                            ))
                            
                        }
                      </select>
                      <a className="btn btn-sm btn-primary" onClick={() => { this.assigned(item.name); }}>Assign</a>
                    </div>
                  </td>
                </tr>
                ))
            }
          </tbody>
        </table>
        
      </div>
    );
  }
}

ReactDOM.render(<Admin />, document.getElementById('app'));
