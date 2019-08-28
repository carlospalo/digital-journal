import React from 'react';
import PropTypes from 'prop-types';

const Protected = ({ secretData,
  onSubmit,
  onChange,
  errors,
  user, }) => (
    <div>
        <p>This page is only accessible to authenticated users.</p>
        {secretData && <p>{JSON.stringify(secretData)}</p>}
        <form action="/" onSubmit={onSubmit}>
      <h2 className="card-heading">Sign Up</h2>
      {errors.summary && <p>{errors.summary}</p>}

      <div>
        <label htmlFor="email">Email</label>
        <input
            type="email"
            name="email"
            id="email"
            onChange={onChange}
            value={user.email}
        />
        {errors.email && <p>{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
            type="password"
            name="password"
            id="password"
            onChange={onChange}
            value={user.password}
        />
        {errors.password && <p>{errors.password}</p>}
      </div>

      <div>
        <button type="submit">Submit</button>
      </div>

      <p>Already have an account? <Link to={'/login'}>Log in</Link></p>
    </form>
        <div>
          <ul>
            <li>Holi</li>
          </ul>
        </div>
    </div>
);

Protected.propTypes = {
  secretData: PropTypes.object.isRequired
};

export default Protected;
