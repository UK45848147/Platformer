import {forwardRef} from "react";

// eslint-disable-next-line react/display-name
export  const Windmil = forwardRef(({ position }, ref) => {
    return (
        <div
            ref={ref}
            style={{
                position: 'absolute',
                right: `${position}px`,
                bottom: '0px',
                width: '100px',
                height: '90px',
            }}
        >
            <img src="/windmil.svg" height="100%" width="100%" alt="wheat" />
        </div>
    );
});
