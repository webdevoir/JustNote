import React from 'react';
import { Link } from 'react-router-dom';
import LogoutPopup from './popups/logout_popup';

class Side extends React.Component {
  constructor(props) {
    super(props);
    this.state = { popup: false };
    this.togglePopup = this.togglePopup.bind(this);
    this.closePopup = this.closePopup.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  togglePopup(e){
    e.stopPropagation();
    this.setState({ popup: !this.state.popup });
  }

  closePopup(){
    let target;
    if(event.relatedTarget){
      target = event.relatedTarget.className;
    }
    this.setState({ popup: false }, () => {
      if ( target === "logout-btn"){
        this.handleLogout();
      }
    });
  }

  handleLogout(){
    this.props.logout();
  }

  renderEmail() {
    const popup = this.state.popup ? "show" : "hide";
    return (
      <div className="email" onClick={this.togglePopup} onBlur={this.closePopup} tabIndex="0" >
        <div className="email-icon" >
          <svg width="32" height="32" viewBox="0 0 32 32">
            <circle cx="15" cy="15" r="13" fill="gray" strokeWidth="0.5" stroke="white"></circle>
            <text x="50%" y="50%" textAnchor="middle" stroke="white" strokeWidth="2px" strokeOpacity="0.8" dy=".3em">{this.props.currentUser.email[0].toUpperCase()}</text>
          </svg>
          <h2 className="top-email">{this.props.currentUser.email}</h2>
        </div>
        <div className={`logout-popup ${popup}`} >
          <div className="logout-popup-items">
            <p>Account</p>
            <h3 className="account-email">{this.props.currentUser.email}</h3>
            <button onClick={this.handleLogout} className="logout-btn">Sign out {this.props.currentUser.email}</button>
          </div>
        </div>
      </div>
    )
  }

  renderLinks() {
    return (
      <ul className="links">
        <Link to={'/notes'}><li key="1"><i className="fa fa-sticky-note"></i>All Notes</li></Link>
        <Link to={'/notebooks'}><li key="2"><i className="fa fa-book"></i>Notebooks</li></Link>
        <Link to={'/tags'}><li key="3"><i className="fa fa-tag"></i>Tags</li></Link>
      </ul>
    )
  }

  render() {
    if (this.props.notebookId) {
      return (
        <div className="side-nav">
          <div className="top">
            {this.renderEmail()}
            <div className="new-note">
              <Link to={`/notebooks/${this.props.notebookId}/notes/new`}><img className="new-note-img" src={window.newnoteURL} /><button>New Note</button></Link>
            </div>
          </div>
          {this.renderLinks()}
        </div>
      )
    } else if (this.props.tagId) {
      return (
        <div className="side-nav">
          <div className="top">
            {this.renderEmail()}
            <div className="new-note">
              <Link to={`/tags/${this.props.tagId}/notes/new`}><img className="new-note-img" src={window.newnoteURL} /><button>New Note</button></Link>
            </div>
          </div>
          {this.renderLinks()}
        </div>
      )
    } else {
      return (
        <div className="side-nav">
          <div className="top">
            {this.renderEmail()}
            <div className="new-note">
              <Link to={'/notes/new'}><img className="new-note-img" src={window.newnoteURL} /><button>New Note</button></Link>
            </div>
          </div>
          {this.renderLinks()}
        </div>
      )
    }
  }
}

export default Side;