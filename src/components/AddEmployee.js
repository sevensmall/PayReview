import React from 'react';

class AddEmployee extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
        newEmployee: {
            head: 'holder.jpg',
            name: '',
            position: ''
        },
        updateIndex: -1
    };
  }

// Setup form value depends on add or edit operation
  componentDidMount() {
      this.state.updateIndex = this.props.updateInfo.id;
      if (this.state.updateIndex > -1) {
        this.nameInput.value = this.props.updateInfo.name;
        this.posiInput.value = this.props.updateInfo.position;
      } 
  }

// When form submited handle data and update state
  handleSubmit(event) {
    this.state.newEmployee.name = this.nameInput.value;
    this.state.newEmployee.position = this.posiInput.value;
    if (this.state.updateIndex > -1) {
        this.props.updateEmployee(this.state.updateIndex, this.state.newEmployee);
    } else {
        this.props.getNewEmployee(this.state.newEmployee);
    }
    event.preventDefault();
    this.props.closePopup();
  }

  render() {
    return (

      <div className="popup">
        <form className="p-5" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Please input name"
              ref={(nameInput) => { this.nameInput = nameInput; }}
            />
            <label>Position</label>
            <input
              type="text"
              className="form-control"
              placeholder="Please input position"
              ref={(posiInput) => { this.posiInput = posiInput; }}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            submit
          </button>
          <a onClick={this.props.closePopup}><span className="btn btn-danger">Close</span></a>
        </form>

      </div>
    );
  }
}

export default AddEmployee;
