import React from 'react';

export const Score = ({ points }) => {
    // Use a logarithmic scale for font size to handle large point values more gracefully
    const fontSize = Math.min(200, 20 + points * 0.1); // Cap the font size at 50px

    return (
        <div
            style={{
                marginTop: 50,
                position: 'absolute',
                top: '10%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                fontSize: `${fontSize}px`, // Apply dynamic font size
                fontWeight: 'bold', // Make the score bold for better visibility
                color: 'black', // You can change the color as needed
            }}
        >
            {points}
        </div>
    );
};
