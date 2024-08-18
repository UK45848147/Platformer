import React from 'react';

export const GameOver = () => (
    <div
        style={{
            position: 'absolute',
            top: '40%',
            left: '50%',
            marginTop: 50,
            transform: 'translate(-50%, -50%)',
            fontSize: '80px',
            fontWeight: 'bold',
            color: '#FF0000',
            textShadow: '4px 4px 8px rgba(0, 0, 0, 0.5)',
            zIndex: 1000,
        }}
    >
        Game Over
    </div>
);
