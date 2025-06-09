import { TodoList } from '../components/TodoList';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const TodosPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
        <Button type="primary" onClick={() => navigate('/todos/new')}>
          New Todo
        </Button>
      </div>
      <TodoList />
    </div>
  );
};

export default TodosPage; 