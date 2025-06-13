


import React, { useEffect, useState } from 'react';
import API from '../services/api';

interface User {
  _id: string;
  name: string;
}

interface KudosFormProps {
  currentUserId: string;
}

const KudosForm: React.FC<KudosFormProps> = ({ currentUserId }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [recipientId, setRecipientId] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await API.get('/api/users/all');
        setUsers(res.data);
      } catch (err) {
        console.error('Failed to load users', err);
      }
    };
    fetchUsers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await API.post('/api/kudos', {
        fromId: currentUserId,
        toId: recipientId,
        message,
      });

      setSuccess('Kudos sent successfully!');
      setRecipientId('');
      setMessage('');
      setTimeout(() => setSuccess(''), 2000);
    } catch (err) {
      console.error('Error sending Kudos', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <select
        value={recipientId}
        onChange={(e) => setRecipientId(e.target.value)}
        required
        style={styles.input}
      >
        <option value="">Select Teammate</option>
        {users
          .filter((user) => user._id !== currentUserId) 
          .map((user) => (
            <option key={user._id} value={user._id}>
              {user.name}
            </option>
          ))}
      </select>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Write your kudos message..."
        required
        style={styles.textarea}
      />

      <button type="submit" style={styles.button}>
        Send Kudos
      </button>

      {success && <p style={styles.success}>{success}</p>}
    </form>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginBottom: '2rem',
  },
  input: {
    padding: '0.5rem',
    fontSize: '1rem',
  },
  textarea: {
    padding: '0.5rem',
    fontSize: '1rem',
    height: '80px',
  },
  button: {
    padding: '0.5rem 1rem',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  success: {
    color: 'green',
    fontWeight: 'bold',
  },
};

export default KudosForm;

