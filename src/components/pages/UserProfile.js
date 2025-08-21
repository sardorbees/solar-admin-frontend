import React from 'react';
import '../assets/css/UserProfile.css';

const UserProfile = () => {
    return (
        <div className="profile-container">
            <section className="profile-header">
                <img src="https://via.placeholder.com/100" alt="Profile" className="profile-image" />
                <div className="profile-details">
                    <h2>Musharof Chowdhury</h2>
                    <p>Team Manager | Arizona, United States</p>
                </div>
                <div className="social-icons">
                    <i className="fab fa-facebook-f"></i>
                    <i className="fab fa-x-twitter"></i>
                    <i className="fab fa-linkedin-in"></i>
                    <i className="fab fa-instagram"></i>
                </div>
                <button className="edit-btn">Edit</button>
            </section>

            <section className="profile-section">
                <div className="section-header">
                    <h3>Personal Information</h3>
                    <button className="edit-btn">Edit</button>
                </div>
                <div className="info-grid">
                    <div><strong>First Name:</strong> Chowdury</div>
                    <div><strong>Last Name:</strong> Musharof</div>
                    <div><strong>Email address:</strong> randomuser@pimjo.com</div>
                    <div><strong>Phone:</strong> +09 363 398 46</div>
                    <div><strong>Bio:</strong> Team Manager</div>
                </div>
            </section>

            <section className="profile-section">
                <div className="section-header">
                    <h3>Address</h3>
                    <button className="edit-btn">Edit</button>
                </div>
                <div className="info-grid">
                    <div><strong>Country:</strong> United States</div>
                    <div><strong>City/State:</strong> Arizona, United States</div>
                    <div><strong>Postal Code:</strong> ERT 2489</div>
                    <div><strong>TAX ID:</strong> AS4568384</div>
                </div>
            </section>
        </div>
    );
};

export default UserProfile;
