import React from "react";

function Hero(props) {
    return (
        <div className={`card text-center p-3 ${props.textColor} ${props.bgColor}`}>
            <div className="card-body">
                <h5 className="card-title display-2 fw-bold">{props.title}</h5>
                <p className="card-text display-6 fw-bold">{props.description}</p>
            </div>
        </div>
    )
}

export default Hero;