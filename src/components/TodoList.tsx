import { observer } from 'mobx-react-lite';
import { List, Input, Button, Checkbox, Radio, Space, Spin } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useTodoStore } from '../stores/TodoContext';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const TodoList = observer(() => {
  const store = useTodoStore();
  const [newTodo, setNewTodo] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    store.fetchTodos();
    // eslint-disable-next-line
  }, []);

  const handleAddTodo = async () => {
    if (newTodo.trim()) {
      await store.addTodo(newTodo.trim());
      setNewTodo('');
    }
  };

  return (
    <div style={{ width: '100%' }}>
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        <Space.Compact style={{ width: '100%' }}>
          <Input
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add new todo"
            onPressEnter={handleAddTodo}
          />
          <Button type="primary" onClick={handleAddTodo}>
            Add
          </Button>
        </Space.Compact>

        <Radio.Group
          value={store.filter}
          onChange={(e) => store.setFilter(e.target.value)}
        >
          <Radio.Button value="all">All</Radio.Button>
          <Radio.Button value="active">Active</Radio.Button>
          <Radio.Button value="completed">Completed</Radio.Button>
        </Radio.Group>

        {store.loading ? (
          <Spin />
        ) : (
          <List
            bordered
            dataSource={store.filteredTodos}
            renderItem={(todo) => (
              <List.Item
                actions={[
                  <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={async () => await store.removeTodo(todo.id)}
                  />,
                ]}
                onClick={() => navigate(`/todos/${todo.id}`)}
                style={{ cursor: 'pointer' }}
              >
                <Checkbox
                  checked={todo.completed}
                  onChange={e => {
                    e.stopPropagation();
                    store.toggleTodo(todo.id);
                  }}
                  onClick={e => e.stopPropagation()}
                >
                  <span
                    style={{
                      textDecoration: todo.completed ? 'line-through' : 'none',
                    }}
                  >
                    {todo.text}
                  </span>
                </Checkbox>
              </List.Item>
            )}
          />
        )}
      </Space>
    </div>
  );
}); 