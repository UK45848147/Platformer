import React from 'react';

export const Score = ({ points }) => (
    <div style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        {points}
    </div>
);
