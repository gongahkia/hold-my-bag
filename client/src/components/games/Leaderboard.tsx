import React, { useState, useEffect } from "react";

interface Leader {
  id: string;
  name: string;
  score: number;
}

const Leaderboard: React.FC = () => {
  const [leaders, setLeaders] = useState<Leader[]>([]);

  useEffect(() => {
    fetch("/api/leaderboard")
      .then(res => res.json())
      .then(data => setLeaders(data));
  }, []);

  return (
    <div style={{ margin: "1.5rem 0" }}>
      <h4>Leaderboard</h4>
      <table style={{
        width: "100%",
        borderCollapse: "collapse",
        background: "#fff"
      }}>
        <thead>
          <tr style={{ background: "#eee" }}>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {leaders.length === 0 ? (
            <tr>
              <td colSpan={2}>No scores yet.</td>
            </tr>
          ) : (
            leaders.map(leader => (
              <tr key={leader.id}>
                <td>{leader.name}</td>
                <td>{leader.score}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
