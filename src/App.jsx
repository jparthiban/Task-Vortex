import React from 'react'
import TextPressure from './TextPressure'
import TodoApp from './Components/TodoApp'

const App = () => {
  return (
    <div
      style={{ 
        position: 'relative',
        minHeight: '100vh',   
        width: '100vw',
        display: 'flex',
        flexDirection: 'column', 
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#000',
        padding: '20px'
      }}
    >
      {/* Animated heading */}
      <div style={{ width: '50%',height:'20%', textAlign: 'center', marginBottom: '40px' }}>
        <TextPressure
          text="Todo List"
          flex={true}
          alpha={false}
          stroke={false}
          width={true}
          weight={true}
          italic={true}
          textColor="#5becbbff"
          strokeColor="#b300ffff"
          minFontSize={24}
        />
      </div>

      {/* Todo App */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'start', width: '100%' }}>
        <TodoApp/>
      </div>

      
    </div>
  )
}

export default App
