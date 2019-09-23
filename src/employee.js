import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

// Navigation bar
import TopNav from './components/TopNav';

ReactDOM.render(<TopNav activeEmployee="active" />, document.getElementById('nav'));


export default class Employee extends React.Component {
  constructor(props) {
    super(props);
    this.submitFeedback = this.submitFeedback.bind(this);
    this.submitReview = this.submitReview.bind(this);
    this.state = {
        employeeID: 2,
        empoyees: [],
        reviews: [],
        reviewed: ''
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
    fetch('./get-reviews',)
    .then((res) => res.json())
    .then((data) => {
      this.setState({ reviews: data });
    })
    .catch(console.log);
  }

// Submit user's feedback to other's review
  submitFeedback(event) {
    this.state.reviews[1].feedback = this.feedbackInput.value;

    this.setState({ reviews: this.state.reviews });
    event.preventDefault();
  }

// Submit review for assigned task
  submitReview(event) {
    console.log(this.reviewInput.value);
    this.setState({ reviewed: this.reviewInput.value });
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <div className="alert alert-light">
          <img className="rounded-circle head" src="./images/steve.jpg" alt="Boss Head" />
          <h4 className="alert-heading">Wellcome Captain</h4>
          <hr />
          <p className="mb-0">
          Here are your
            {' '}
            <span className="badge badge-warning">{this.state.reviews.length}</span>
            {' '}
          reviews
          </p>
        </div>
        <div className="row">

          <div className="list-group  col-6">
            {
            this.state.reviews.map((item, index) => (
              <div className="media list-group-item ">
                <img src={`./images/${this.state.employees[item.reviewerID - 1].head}`} className="reviewHead img-thumbnail mr-3" />
                <div className="media-body">
                  <h5 className="mt-0">{this.state.employees[item.reviewerID - 1].name}</h5>
                  {item.comment}
                  <div className="media mt-3">

                    <div className="media-body">
                      <h6 className="mt-0">My feedback</h6>
                      {
                          item.feedback
                          ? item.feedback
                          : (
                            <form onSubmit={this.submitFeedback}>
                              <input type="text" placeholder="Write your feed back" ref={(feedbackInput) => { this.feedbackInput = feedbackInput; }} />
                              <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                            )
                      }
                    </div>
                  </div>
                </div>
              </div> 

            ))
          }
          </div>
          <div className="alert alert-success col-6">
            <div>
              You are assigned to write review for
              {' '}
              <h5>Tony Stark</h5>
            </div>
            <img src="./images/tony.jpg" className="reviewHead rounded-circle img-thumbnail" />
            <p>
              {
            this.state.reviewed
            ? this.state.reviewed
            : (
              <form onSubmit={this.submitReview}>
                <input type="text" placeholder="Write your review" ref={(reviewInput) => { this.reviewInput = reviewInput; }} />
                <br />
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
              )
          }
            </p>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Employee />, document.getElementById('app'));
