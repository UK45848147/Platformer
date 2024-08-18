import React from 'react';

// make score grow as you get furtherr
export const Score = ({ points }) => (
    <div style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        {points}
    </div>
);
