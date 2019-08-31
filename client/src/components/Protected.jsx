import React from 'react';
import PropTypes from 'prop-types';
// import Modal from "../components/Modal.jsx";

const Protected = ({ 
  onSubmit,
  onChange,
  changeUser,
  errors,
  processForm,
  eliminar,
  post,
  posts,
  show,
  showModal,
  onUpdate,
  postUpdate,
  onChangeUpdate
}) => (
    <div>
      <section className="hero is-info welcome is-small">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">
              Hello!!
                            </h1>
            <h2 className="subtitle">
              I hope you are having a great day!
                            </h2>
            <p>This page is only accessible to authenticated users.</p>
          </div>
        </div>
      </section>

      <form action="/" onSubmit={onSubmit} className="dj-form">

        <h2 className="card-heading">What did you do today?</h2>


        <div>
          <div className="field">
            <div className="control">
              <input className="input is-info" type="text" placeholder="Titles" type="title"
                name="Title"
                id="title"
                onChange={onChange}
                value={post.Title} />
            </div>
          </div>

        </div>

        <div>
          <div className="field">
            <div className="control">
              <textarea className="textarea is-info" placeholder="Content"
                type="content"
                name="Content"
                id="content"
                onChange={onChange}
                value={post.Content}
              ></textarea>
            </div>
          </div>

        </div>


        <div>

        </div>

        <div>
          <button type="submit" className="button is-primary">Submit</button>
        </div>
      </form>
      <div className="dj-card-container">

        {posts.map((item, i) => {
          console.log("Entered");
          // Return the element. Also pass key     
          return (
            <div className="card dj-card" id={item.id} key={item.id}>
              {/* <div className="card-image">
                <figure className="image is-4by3">
                  <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image" />
                </figure>
              </div> */}
              <div className="card-content">
                <div className="media">
                  <div className="media-left">
                    <figure className="image is-48x48">
                      <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image" />
                    </figure>
                  </div>
                  <div className="media-content">
                    <p className="title is-4"> {item.Title}</p>
                    {/* <p className="subtitle is-6">@johnsmith</p> */}
                  </div>
                </div>

                <div className="content">
                  {item.Content}


                </div>
              </div>
              <footer className="card-footer">
                <span className="button card-footer-item is-danger" onClick={() => eliminar(item)}>Erase</span>
                <span className="button card-footer-item is-warning" onClick={() => { showModal(item); }}>Update</span>
              </footer>
            </div>
          )


        })}



      </div>

      <div className={show ? 'modal ' + 'is-active' : 'modal'}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Update</p>
            <button className="delete" aria-label="close" onClick={showModal}></button>
          </header>
          <section className="modal-card-body">
            <form action="/" onSubmit={onUpdate} className="dj-form">

              <h2 className="card-heading">What did you do today?</h2>


              <div>
                <div className="field">
                  <div className="control">
                    <input className="input is-info" type="text" placeholder="Titles" type="posttitle"
                      name="Title"
                      id="posttitle"
                      onChange={onChangeUpdate}
                      value={postUpdate.Title} />
                  </div>
                </div>

              </div>

              <div>
                <div className="field">
                  <div className="control">
                    <textarea className="textarea is-info" placeholder="Content"
                      type="postcontent"
                      name="Content"
                      id="postcontent"
                      onChange={onChangeUpdate}
                      value={postUpdate.Content}
                    ></textarea>
                  </div>
                </div>

              </div>


              <div>

              </div>

              <div>
                <button type="submit" className="button is-primary">Update</button>
              </div>
            </form>
          </section>
          {/* <footer className="modal-card-foot">
            <button className="button is-success">Save changes</button>
            <button className="button" onClick={showModal} >Cancel</button>
          </footer> */}
        </div>
      </div>
    </div>
  );

Protected.propTypes = {
  secretData: PropTypes.object.isRequired
};

export default Protected;
// {posts
//   .forEach(item => items.push(
//                      <li id={item.id} key={item.id} >
//                      {item.text}
//                                             </li>
//                    ))}