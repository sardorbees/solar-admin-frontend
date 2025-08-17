import React, { useEffect, useState } from "react";
import axios from "axios";

const Iframe = () => {
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        const fetchData = () => {
            axios.get("https://django-admin-pro.onrender.com/api/locations/locations/")
                .then(res => setLocations(res.data))
                .catch(err => console.error("Ошибка при загрузке локаций:", err));
        };
        fetchData();
        const interval = setInterval(fetchData, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            {Array.isArray(locations) && locations.map((loc) => (
                <div key={loc.id} style={{ marginBottom: "10px" }}>
                    <iframe
                        src={loc.iframe}
                        style={{
                            width: "100%",
                            height: "800px",
                            border: "none"
                        }}
                        allowFullScreen
                        loading="lazy"
                    />
                </div>
            ))}
        </div>
    );
};

export default Iframe;