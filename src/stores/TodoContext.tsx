import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { TodoStore } from './TodoStore';

const TodoContext = createContext<TodoStore | null>(null);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const store = new TodoStore();
  return <TodoContext.Provider value={store}>{children}</TodoContext.Provider>;
};

export const useTodoStore = () => {
  const store = useContext(TodoContext);
  if (!store) {
    throw new Error('useTodoStore must be used within a TodoProvider');
  }
  return store;
}; 