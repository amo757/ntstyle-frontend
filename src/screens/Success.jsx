import React from 'react';
import { Link } from 'react-router-dom';

const Success = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '80vh',
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* მწვანე ნიშანი (SVG) */}
      <div style={{
        width: '100px',
        height: '100px',
        backgroundColor: '#d4edda',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '20px'
      }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#28a745" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>

      <h1 style={{ color: '#28a745', marginBottom: '10px' }}>გადახდა წარმატებულია!</h1>
      <p style={{ color: '#555', fontSize: '18px', maxWidth: '400px' }}>
        მადლობა შეკვეთისთვის. დადასტურების წერილი გამოგზავნილია თქვენს ელ-ფოსტაზე.
      </p>

      <Link to="/" style={{ textDecoration: 'none' }}>
        <button style={{
          marginTop: '30px',
          padding: '15px 30px',
          backgroundColor: '#000',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          fontSize: '16px',
          cursor: 'pointer',
          transition: '0.3s'
        }}>
          მთავარ გვერდზე დაბრუნება
        </button>
      </Link>
    </div>
  );
};

export default Success;