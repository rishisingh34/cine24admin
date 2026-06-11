"use client";

export default function LeaderboardCard() {
  const leaderboard = [
    { rank: 1, name: "Amit Sharma", score: 98, subject: "Maths" },
    { rank: 2, name: "Priya Mehta", score: 95, subject: "Physics" },
    { rank: 3, name: "Ravi Kumar", score: 93, subject: "Chemistry" },
  ];

  return (
    <div className="bg-neutral-900/70 border border-neutral-800 rounded-xl p-4">
      <h2 className="text-lg font-semibold text-white mb-4">Leaderboard</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-neutral-300">
          <thead>
            <tr className="border-b border-neutral-700">
              <th className="text-left py-2">Rank</th>
              <th className="text-left py-2">Name</th>
              <th className="text-left py-2">Score</th>
              <th className="text-left py-2">Subject</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((user) => (
              <tr
                key={user.rank}
                className="border-b border-neutral-800 hover:bg-neutral-800/50"
              >
                <td className="py-2">#{user.rank}</td>
                <td className="py-2">{user.name}</td>
                <td className="py-2">{user.score}</td>
                <td className="py-2">{user.subject}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
