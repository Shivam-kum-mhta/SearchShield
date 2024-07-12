import  { useState, useEffect } from 'react';
import axios from 'axios';

const UserDetails = ({email}) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);



  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.post('http://localhost:3003/user', { email});
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
      <h2 className='text-cyan-500'>User Details</h2>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>Created At: {new Date(user.createdAt).toLocaleDateString()}</p>
      <button className='bg-red-500'> Change password </button>
    </div>
  );
};

export default UserDetails;
