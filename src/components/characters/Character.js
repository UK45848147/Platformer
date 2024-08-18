import {forwardRef} from "react";

// eslint-disable-next-line react/display-name
export const Character = forwardRef(({ jump, isJumping, height, width }, ref) => {
    return (
        <div
            ref={ref}
            style={{
                position: 'absolute',
                bottom: jump ? '200px' : '0px', // 100px is the jump height
                left: '50%', // Center horizontally
                transform: 'translateX(-50%)', // Adjust for perfect centering
                width: `${width}px`,
                height: `${height}px`,
                backgroundColor: 'green',
                transition: 'bottom 0.3s ease',
            }}
        ></div>
    );
})
