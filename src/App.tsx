// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { Button, DatePicker, message } from 'antd';

const App: React.FC = () => {
  const handleClick = () => {
    message.success('Button Clicked!');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Hello, React with TypeScript and Ant Design!</h1>
      <Button type="primary" onClick={handleClick}>
        Click Me
      </Button>
      <br />
      <DatePicker style={{ marginTop: '10px' }} />
    </div>
  );
};
export default App
