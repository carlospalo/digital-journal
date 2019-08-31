import React from "react";
// import "./modal.css";
import PropTypes from "prop-types";

export default class Modal extends React.Component {
  onClose = e => {
    this.props.onClose && this.props.onClose(e);
  };
  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      // <div className="modal" id="modal">
      //   <h2>Modal Window</h2>
      //   <div className="content">{this.props.children}</div>
      //   <div className="actions">
      //     <button className="toggle-button" onClick={this.onClose}>
      //       close
      //     </button>
      //   </div>
      // </div>
      <div className="modal">
  <div className="modal-background"></div>
  <div className="modal-card">
    <header className="modal-card-head">
      <p className="modal-card-title">Modal title</p>
      <button className="delete" aria-label="close"></button>
    </header>
    <section className="modal-card-body">
     
    </section>
    <footer className="modal-card-foot">
      <button className="button is-success">Save changes</button>
      <button className="button" onClick={this.onClose}>Cancel</button>
    </footer>
  </div>
</div>
    );
  }
}
// Modal.propTypes = {
//   onClose: PropTypes.func.isRequired,
//   show: PropTypes.bool.isRequired
// };