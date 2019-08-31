/* global fetch:false */
import React from 'react';
import Auth from '../modules/Auth';
import Protected from '../components/Protected.jsx';

class ProtectedPage extends React.Component {
  state = {
    secretData: {},
    errors: {},
    user: {
      email: '',
      password: ''
    },
    post: {
      Title: '',
      Content: ''
    },
    show: false,
    posts: [],
    postUpdate: { Title: '', Content: '' }
  };

  fetchApi(url) {
    console.log('holi');

    fetch("/api/journals/", {
      headers: {
        'Authorization': `bearer ${Auth.getToken()}`,
        'content-type': 'application/json',
      },
      method: 'GET',
    })
      .then(res => res.json())
      .then((result) => {
        if (result.status === 200) {
          console.log(result);
          const posts = result.data
          this.setState({
            posts
          });

        } else {
          console.log('holi');
        }

      },
        (error) => {
          console.log('ERROR', error);
        }
      );
  };
  onChangeUpdate = (event) => {
    const field = event.target.name;
    const postUpdate = this.state.postUpdate;
    postUpdate[field] = event.target.value;

    this.setState({
      postUpdate
    });
  }

  changeUser = (event) => {
    const field = event.target.name;
    const post = this.state.post;
    post[field] = event.target.value;

    this.setState({
      post
    });
  }
  onUpdate = (event) => {
    event.preventDefault();
    const Title = this.state.postUpdate.Title;
    const Content = this.state.postUpdate.Content;
    const formData = { Title, Content };
    fetch("/api/journals/" + this.state.postUpdate.id, {
      body: JSON.stringify(formData),
      headers: {
        'Authorization': `bearer ${Auth.getToken()}`,
        'content-type': 'application/json',
      },
      method: 'POST',
    })
      .then(res => res.json())
      .then((result) => {
        if (result.status === 200) {
          console.log(result);

        } else {
          console.log('holi');
        }
        this.fetchApi();
        this.setState({
     
     
          show: !this.state.show
        });
      },
        (error) => {
          console.log('ERROR', error);
        }
      );
  }
  processForm = (event) => {
    event.preventDefault();

    const Title = this.state.post.Title;
    const Content = this.state.post.Content;
    const formData = { Title, Content };

    fetch("/api/journals/", {
      body: JSON.stringify(formData),
      headers: {
        'Authorization': `bearer ${Auth.getToken()}`,
        'content-type': 'application/json',
      },
      method: 'POST',
    })
      .then(res => res.json())
      .then((result) => {
        if (result.status === 200) {
          console.log(result);

        } else {
          console.log('holi');
        }
        this.fetchApi();
      
      },
        (error) => {
          console.log('ERROR', error);
        }
      );
  }
  componentDidMount() {
    this.fetchApi();
  }
  showModal = (item) => {
    

    this.setState({
     
      postUpdate: item,
     
    });
    this.setState({
     
     
      show: !this.state.show
    });
    console.log(item);

    console.log(this.state.postUpdate.id);
  };


  eliminar = (item) => {
    console.log(item);
    fetch("/api/journals/" + item.id, {
      headers: {
        'Authorization': `bearer ${Auth.getToken()}`,
        'content-type': 'application/json',
      },
      method: 'DELETE',
    })
      .then(res => res.json())
      .then((result) => {
        console.log(result);
        this.fetchApi();
        this.setState((prevState) => ({
          posts: prevState.posts.filter(item => item.id !== item.id),
        }))
      },
        (error) => {
          console.log('ERROR', error);
        }
      );


    // console.log(item);
  }
  /**
   * Render the component.
   */
  render() {
    return (<Protected secretData={this.state.secretData} onSubmit={this.processForm}
      onChange={this.changeUser}
      errors={this.state.errors}
      post={this.state.post}
      posts={this.state.posts}
      eliminar={this.eliminar}
      show={this.state.show}
      showModal={this.showModal}
      postUpdate={this.state.postUpdate}
      onUpdate={this.onUpdate}
      onChangeUpdate={this.onChangeUpdate}
    />);
  }

}

export default ProtectedPage;
