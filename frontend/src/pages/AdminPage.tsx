import { useEffect, useState } from 'react';
import { fetchUsers } from '../api/userApi';

const AdminPage = () => {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    };
    load();
  }, []);

  return (
    <section className="page admin-page">
      <h2>Admin panel</h2>
      <div className="card">
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Nickname</th>
              <th>MMR</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.email}</td>
                <td>{user.nickname}</td>
                <td>{user.rating?.mmr ?? '-'}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AdminPage;
