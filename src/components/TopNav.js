import React from 'react';

class TopNav extends React.Component {
  render() {
    const { activeHome, activeAdmin, activeEmployee } = this.props;
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#">Pay Review</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <a className={`nav-item nav-link ${activeHome}`} href="./index.html">Home </a>
              <a className={`nav-item nav-link ${activeAdmin}`} href="./admin.html">Admin</a>
              <a className={`nav-item nav-link ${activeEmployee}`} href="./employee.html">Employee</a> 
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default TopNav;
