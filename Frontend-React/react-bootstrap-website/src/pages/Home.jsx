import React from "react";
import Hero from "../components/Hero";

function Home() {
    return (
        <div className="container mt-3">
            <Hero textColor="text-danger" bgColor="bg-warning" title="Home Page" description="Welcome to Home Page of our Website" />
        </div>
    )
}

export default Home;