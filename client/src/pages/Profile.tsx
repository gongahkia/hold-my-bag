import React from "react";

const stats = {
  gamesPlayed: 12,
  topScore: 109,
  nickname: "AnonPlayer"
};

const Profile: React.FC = () => (
  <div style={{ textAlign: "center", padding: "2rem" }}>
    <h2>My Profile</h2>
    <div>Nickname: <strong>{stats.nickname}</strong></div>
    <div>Games Played: <strong>{stats.gamesPlayed}</strong></div>
    <div>Best Score: <strong>{stats.topScore}</strong></div>
  </div>
);

export default Profile;
