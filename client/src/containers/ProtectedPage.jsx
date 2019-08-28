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
        post:{
            title:'',
            content:''
        },
        posts:[]
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
                console.log('ERROR',error);
            }
          );
      };
      changeUser = (event) => {
        const field = event.target.name;
        const post = this.state.post;
        post[field] = event.target.value;
    
        this.setState({
          post
        });
      }
    
      processForm = (event) => {
        event.preventDefault();
        
        const title = this.state.post.title;
        const content = this.state.post.content;
        const formData = {title, content};
        
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
                console.log('ERROR',error);
            }
          );
      }
    componentDidMount() {
        this.fetchApi();
    }

  /**
   * Render the component.
   */
  render() {
    return (<Protected secretData={this.state.secretData}  onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        post={this.state.post} 
        posts={this.state.posts}
        />);
  }

}

export default ProtectedPage;
