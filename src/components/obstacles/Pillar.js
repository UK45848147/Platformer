import {forwardRef} from "react";

// eslint-disable-next-line react/display-name
export  const Pillar = forwardRef(({ position, bottom, height, top }, ref) => {
    return (
        <div
            ref={ref}
            style={{
                position: 'absolute',
                right: `${position}px`,
                ...(bottom !== undefined ? { bottom: `${bottom}px` } : { top: `${top}px` }),
                width: '75px',
                height: `${height}px`,
                backgroundColor: 'red',
            }}
        ></div>
    );
});
