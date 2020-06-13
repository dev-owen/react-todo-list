import React, { useReducer, useState, useRef, useCallback } from 'react';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

function createBulkTodos() {
	const array = [];
	for(let i = 1; i <= 2500; i++) {
		array.push({
			id: i,
			text: `할 일 ${i}`,
			checked: false,
		});
	}
	return array;
}

function todoReducer(todos, action) {
	switch (action.type) {
		case 'INSERT' : return todos.concat(action.todo);
		case 'REMOVE' : return todos.filter(todo => todo.id !== action.id);
		case 'TOGGLE' : return todos.map(todo => todo.id === action.id ? {...todo, checked: !todo.checked} : todo);
		default : return todos;
	}
}

const App = () => {
  // const [todos, setTodos] = useState([
  //   {
  //     id: 1,
  //     text: '리액트의 기초 알아보기',
  //     checked: true,
  //   },
  //   {
  //     id: 2,
  //     text: '컴포넌트 스타일링 해 보기',
  //     checked: true,
  //   },
  //   {
  //     id: 3,
  //     text: '일정 관리 앱 만들어 보기',
  //     checked: false,
  //   },
  // ]);

	// 이렇게 해 주면 컴포넌트가 처음 렌더링 될 때만 createBulkTodos 함수가 호출 된다.
	const [todos, dispatch] = useReducer(todoReducer, undefined, createBulkTodos);

  // 고유값으로 사용될 id
  // id 값은 렌더링되는 정보가 아니기 때문에 useRef를 사용해야 한다.
  const nextId = useRef(2501);

  const onRemove = useCallback(id => {
  	dispatch({type: 'REMOVE', id});
	  }, []
  );

  const onInsert = useCallback(text => {
  	const todo = {
  		id: nextId.current,
		  text,
		  checked: false
	  };
  	dispatch({type: 'INSERT', todo});
  	nextId.current += 1;
  }, []);

  const onToggle = useCallback(id => {
  	dispatch({type: 'TOGGLE', id})
  }, []);
  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle}/>
    </TodoTemplate>
  );
};

export default App;
