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
        }
    };

    
      changeUser = (event) => {
        const field = event.target.name;
        const user = this.state.user;
        user[field] = event.target.value;
    
        this.setState({
          user
        });
      }
    
      processForm = (event) => {
        event.preventDefault();
        
        const email = this.state.user.email;
        const password = this.state.user.password;
        const formData = {email, password};
        
        fetch("/auth/signup", {
            body: JSON.stringify(formData),
            headers: {
                'content-type': 'application/json',
            },
            method: 'POST',
        })
        .then(res => res.json())
        .then((result) => {
                if (result.status === 200) {
                    this.setState({
                        errors: {}
                    });
                    Auth.authenticateUser(result.data.token);
                    this.props.history.push("/protected");
                } else {
                    let errors = result.data.errors ? result.data.errors : {};
                    errors.summary = result.message;
                    this.setState({errors});
                }
            },
            (error) => {
                console.log('ERROR',error);
            }
          );
      }
    componentDidMount() {
        if (!Auth.isUserAuthenticated()) {
            return this.props.history.push("/login");
        }
        fetch("/api/protected", {
            headers: {
                'Authorization': `bearer ${Auth.getToken()}`,
                'content-type': 'application/json',
            },
            method: 'GET',
        })
        .then(res => res.json())
        .then((result) => {
            if (result.status === 200) {
                this.setState({
                    secretData: result.data
                });
            }},
            (error) => {
                console.log('ERROR',error);
            }
        );
    }

  /**
   * Render the component.
   */
  render() {
    return (<Protected secretData={this.state.secretData} />);
  }

}

export default ProtectedPage;
