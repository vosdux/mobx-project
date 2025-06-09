import { useEffect, useState } from 'react';
import { List, Card, Spin } from 'antd';
import axios from 'axios';

interface User {
  id: number;
  name: string;
  email: string;
}

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(res => setUsers(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ margin: '0 auto', width: '100%' }}>
      <Card title="Users">
        {loading ? <Spin /> : (
          <List
            dataSource={users}
            renderItem={user => (
              <List.Item key={user.id}>
                <List.Item.Meta
                  title={user.name}
                  description={user.email}
                />
              </List.Item>
            )}
          />
        )}
      </Card>
    </div>
  );
};

export default UsersPage; 