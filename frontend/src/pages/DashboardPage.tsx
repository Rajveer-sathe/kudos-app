import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import KudosForm from '../components/KudosForm';
import KudosList from '../components/KudosList';
import API from '../services/api'

interface User {
  _id: string;
  name: string;
  kudosLeft: number;
}

interface Kudos {
  _id: string;
  from: { _id: string; name: string };
  to: { _id: string; name: string };
  message: string;
  createdAt: string;
}

const DashboardPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [kudosList, setKudosList] = useState<Kudos[]>([]);

  useEffect(() => {
    const fetchUserAndKudos = async () => {
      const userId = location.state?.user?._id;
      if (!userId) {
        alert('No user ID found. Redirecting to login.');
        navigate('/');
        return;
      }

      try {
        const userRes = await API.get(`/api/users/${userId}`);
        setUser(userRes.data);

        const kudosRes = await API.get(`/api/kudos/${userId}`);
        setKudosList(kudosRes.data); 
      } catch (err) {
        console.error('Error fetching user or kudos', err);
        alert('Failed to fetch user data');
        navigate('/');
      }
    };

    fetchUserAndKudos();
  }, [location.state, navigate]);

  const handleLogout = () => {
    alert('Logout clicked');
    navigate('/');
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h2>Welcome, {user?.name || 'User'}</h2>
          {user && <p style={styles.kudosLeft}>Kudos Left: {user.kudosLeft}</p>}
        </div>
        <button style={styles.logoutBtn} onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div style={styles.content}>
        <h3>Give Kudos</h3>
        {user && <KudosForm currentUserId={user._id} />}

        <h3>Your Kudos</h3>
        {user ? (
          <KudosList kudosList={kudosList} currentUserId={user._id} />
        ) : (
          <p>Loading kudos...</p>
        )}
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: '2rem',
    fontFamily: 'sans-serif',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '2rem',
  },
  logoutBtn: {
    padding: '0.4rem 0.8rem',
    backgroundColor: '#dc3545', 
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '0.95rem',
    lineHeight: '1.2',
    whiteSpace: 'nowrap',
    width: 'fit-content',
    height: 'fit-content',
  },
  kudosLeft: {
    fontSize: '1rem',
    color: '#007bff',
    marginTop: '0.5rem',
  },
  content: {
    backgroundColor: '#f8f9fa',
    padding: '1.5rem',
    borderRadius: '8px',
  },
};

export default DashboardPage;
