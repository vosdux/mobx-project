import { useParams, useNavigate } from 'react-router-dom';
import { useTodoStore } from '../stores/TodoContext';
import { observer } from 'mobx-react-lite';
import { Card, Input, Button, Checkbox, Space, message } from 'antd';
import { useState, useEffect } from 'react';

const TodoDetailsPage = observer(() => {
  const { id } = useParams();
  const store = useTodoStore();
  const navigate = useNavigate();
  const todoId = Number(id);
  const todo = store.todos.find(t => t.id === todoId);
  const [text, setText] = useState(todo?.text || '');
  const [completed, setCompleted] = useState(todo?.completed || false);

  useEffect(() => {
    if (todo) {
      setText(todo.text);
      setCompleted(todo.completed);
    }
  }, [todo]);

  if (!todo) {
    return <div>Todo not found</div>;
  }

  const handleSave = () => {
    store.updateTodo(todoId, { text, completed });
    message.success('Todo updated');
    navigate('/todos');
  };

  return (
    <div style={{ margin: '0 auto', width: '100%' }}>
      <Card title={`Todo #${todoId}`}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Input value={text} onChange={e => setText(e.target.value)} />
          <Checkbox checked={completed} onChange={e => setCompleted(e.target.checked)}>
            Completed
          </Checkbox>
          <Button type="primary" onClick={handleSave}>
            Save
          </Button>
          <Button onClick={() => navigate('/todos')}>Back</Button>
        </Space>
      </Card>
    </div>
  );
});

export default TodoDetailsPage; 