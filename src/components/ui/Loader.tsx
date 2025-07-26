import React from "react";

const Loader: React.FC = () => (
    <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
    }}>
        <div className="pulse-loader">
            <span />
            <span />
            <span />
        </div>
        <style>
            {`
                .pulse-loader {
                    display: flex;
                    gap: 8px;
                }
                .pulse-loader span {
                    display: block;
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    background: #6366f1;
                    opacity: 0.7;
                    animation: pulse 1s infinite;
                }
                .pulse-loader span:nth-child(2) {
                    animation-delay: 0.2s;
                }
                .pulse-loader span:nth-child(3) {
                    animation-delay: 0.4s;
                }
                @keyframes pulse {
                    0%, 100% {
                        transform: scale(1);
                        opacity: 0.7;
                    }
                    50% {
                        transform: scale(1.4);
                        opacity: 1;
                    }
                }
            `}
        </style>
    </div>
);

export default Loader;