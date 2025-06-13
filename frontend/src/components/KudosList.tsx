import React from 'react';
import { format } from 'date-fns';

interface Kudos {
  _id: string;
  from: { _id: string; name: string };
  to: { _id: string; name: string };
  message: string;
  createdAt: string;
}

interface Props {
  kudosList: Kudos[];
  currentUserId: string;
}

const KudosList: React.FC<Props> = ({ kudosList, currentUserId }) => {
  const sent = kudosList.filter(k => k.from._id === currentUserId);
  const received = kudosList.filter(k => k.to._id === currentUserId);

  const formatDate = (dateStr: string) =>
    format(new Date(dateStr), 'dd MMMM yyyy, hh:mm a');

  return (
    <div style={{ display: 'flex', gap: '2rem' }}>
      <div>
        <h4>Sent Kudos</h4>
        {sent.length === 0 ? (
          <p>No kudos sent yet.</p>
        ) : (
          sent.map(kudo => (
            <div key={kudo._id} style={styles.kudo}>
              <strong>You sent kudos to {kudo.to.name}</strong>
              <p>“{kudo.message}”</p>
              <small>{formatDate(kudo.createdAt)}</small>
            </div>
          ))
        )}
      </div>

      <div>
        <h4>Received Kudos</h4>
        {received.length === 0 ? (
          <p>No kudos received yet.</p>
        ) : (
          received.map(kudo => (
            <div key={kudo._id} style={styles.kudo}>
              <strong>{kudo.from.name} sent you kudos</strong>
              <p>“{kudo.message}”</p>
              <small>{formatDate(kudo.createdAt)}</small>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  kudo: {
    marginBottom: '1rem',
    background: '#fff',
    padding: '1rem',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
};

export default KudosList;