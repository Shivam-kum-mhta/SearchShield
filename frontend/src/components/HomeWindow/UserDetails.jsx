import  { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
const UserDetails = ({email}) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);



  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.post('https://searchshield-2.onrender.com/user', { email});
        setUser(response.data);
      } catch (err) {
        setError('Error fetching user details');
        console.error(err);
      }
    };

    fetchUserDetails();
  }, [email]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className='flex [flex-flow:column] justify-center items-center' >
      <h2 className='text-cyan-500 text-[x-large]'>User Details</h2>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>Created At: {new Date(user.createdAt).toLocaleDateString()}</p>
      <button className='bg-red-500'> Change password </button>
    </div>
  );
};

UserDetails.propTypes = {
  // Define prop types here
  email: PropTypes.string.isRequired,
}

export default UserDetails;
