import React from 'react';
import { Link } from 'react-router-dom';

function Arrow() {
  return (
    <Link to="/Login">
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '90px',
        height: '90px',
        backgroundColor: '#333',
        borderRadius: '25px',
        position: 'fixed',
        bottom: '270px',
        right: '50px',
       
        cursor: 'pointer',
      }}>
        <i style={{
          color: '#fff',
          fontSize: '24px',
        }} className="fas fa-arrow-right text-white"/> Login
      </div>
    </Link>
    
  );
}

function LandingPage() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100vw',
      height: '100vh',
      backgroundColor: '#F0F0F0',
      textAlign: 'center',
    }}>
      <h1 style={{
        fontSize: '42px',
        color: '#333',
        marginBottom: '30px',
      }}>Welcome!</h1>
      <img
        src="https://source.unsplash.com/1600x900/?nature,landscape"
        alt="Landing Page Background"
        style={{
          width: '100%',
          maxWidth: '600px',
          height: 'auto',
          marginBottom: '30px',
        }}
      />
      <p style={{
        fontSize: '18px',
        color: '#555',
      }}>This is a simple landing page template using ReactJS and inline styling.</p>
      <Arrow />
    </div>
  );
}

export default LandingPage;
