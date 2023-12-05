import './/app1.css';
import React, { useState, useEffect } from 'react';

const PomodoroTimer = () => {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [workInterval, setWorkInterval] = useState(25);
  const [breakInterval, setBreakInterval] = useState(5);

  const startTask = (index) => {
    const newTasks = [...tasks];
    const timeInSeconds = newTasks[index].sessionsCompleted % 2 === 0 ? workInterval * 60 : breakInterval * 60;
    newTasks[index].isActive = true;
    newTasks[index].timeLeft = timeInSeconds;

    const timer = setInterval(() => {
      if (!newTasks[index].isActive) {
        clearInterval(newTasks[index].timer);
        return;
      }

      newTasks[index].timeLeft -= 1;
      if (newTasks[index].timeLeft <= 0) {
        clearInterval(newTasks[index].timer);
        newTasks[index].isActive = false;
        newTasks[index].sessionsCompleted++;
        if (newTasks[index].sessionsCompleted % 2 !== 0) {
          newTasks[index].isActive = false;
          newTasks[index].timeLeft = breakInterval * 60;
        }
      }
      setTasks([...newTasks]);
    }, 1000);
    newTasks[index].timer = timer;
    setTasks([...newTasks]);
  };

  const startBreak = (index) => {
    const newTasks = [...tasks];
    newTasks[index].isActive = true;
    const timer = setInterval(() => {
      if (!newTasks[index].isActive) {
        clearInterval(timer);
        return;
      }

      newTasks[index].timeLeft -= 1;
      if (newTasks[index].timeLeft <= 0) {
        clearInterval(timer);
        newTasks[index].isActive = false;
      }
      setTasks([...newTasks]);
    }, 1000);
    newTasks[index].timer = timer;
    setTasks([...newTasks]);
  };

  const endBreak = (index) => {
    const newTasks = [...tasks];
    newTasks[index].isActive = false;
    clearInterval(newTasks[index].timer);
    setTasks([...newTasks]);
  };

  const handleAddTask = () => {
    if (taskName.trim() !== '') {
      const newTask = {
        name: taskName.trim(),
        sessionsCompleted: 0,
        isActive: false,
        timeLeft: workInterval * 60,
        timer: null,
      };
      setTasks([...tasks, newTask]);
      setTaskName('');
    }
  };

  const pauseTask = (index) => {
    const newTasks = [...tasks];
    clearInterval(newTasks[index].timer);
    newTasks[index].isActive = false;
    setTasks(newTasks);
  };

  const removeTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const updatedTasks = tasks.map((task) => {
        if (task.isActive) {
          return { ...task, timeLeft: task.timeLeft - 1 };
        }
        return task;
      });

      setTasks(updatedTasks);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [tasks]);

  return (
    <div className="pomodoro-container">
      <h1 className="heading">Welcome to Pomodoro!</h1>
      <div className="task-container">
        <input
          className="entertask"
          type="text"
          placeholder="Enter task name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <br />
        <button className="addtaskbutton" onClick={handleAddTask}>
          ADD TASK
        </button>
      </div>
      <div className="interval-container">
        <div className="interval-section">
          <label className="interval-label">Work Interval (minutes):</label>
          <input
            className="interval-input"
            type="number"
            value={workInterval}
            onChange={(e) => setWorkInterval(parseInt(e.target.value))}
          />
        </div>
        <div className="interval-section">
          <label className="interval-label">Break Interval (minutes):</label>
          <input
            className="interval-input"
            type="number"
            value={breakInterval}
            onChange={(e) => setBreakInterval(parseInt(e.target.value))}
          />
        </div>
      </div>
      <div className="whiteblob">
        <h2 className="tasklisthead">Your Task List</h2>
        <ol>
          {tasks.map((task, index) => (
            <li key={index}>
              {task.name}
              {!task.isActive && task.sessionsCompleted % 2 !== 0 && (
                <div>
                  {task.isActive && (
                    <button onClick={() => endBreak(index)}>End Break</button>
                  )}
                </div>
              )}
              {!task.isActive && task.sessionsCompleted % 2 === 0 && (
                <button className="start-button" onClick={() => startTask(index)}>Start Task</button>
              )}
              {task.isActive && (
                <div className="timer" style={{ display: task.isActive ? 'block' : 'none' }}>
                  <span>
                    Time Left: {Math.floor(task.timeLeft / 60)}:{(task.timeLeft % 60).toString().padStart(2, '0')}
                  </span>
                  <button onClick={() => pauseTask(index)}>Pause</button>
                </div>
              )}
              <button className="remove-button" onClick={() => removeTask(index)}>Remove Task</button>
              {!task.isActive && task.sessionsCompleted % 2 !== 0 && (
                <button className="start-break" onClick={() => startBreak(index)}>Start Break</button>
              )}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default PomodoroTimer;


/*
  return (
    <div className="pomodoro-container">
        <h1 className ="heading">Welcome to Pomodoro!</h1>
      <div className = "task-container"> 
        <input className="entertask"
          type="text"
          placeholder="Enter task name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <br />
        
        <button className="addtaskbutton" onClick={handleAddTask}>ADD TASK</button>
        
      </div>
      <div className="interval-container">
      <div className="interval-section">
        <label className="interval-label">Work Interval (minutes):</label>
      
        <input
          className="interval-input"
          type="number"
          value={workInterval}
          onChange={(e) => setWorkInterval(parseInt(e.target.value))}
        />
      </div>
      
      
 
      <div className="interval-section">
        <label className="interval-label">Break Interval (minutes):</label>
        <input
          className="interval-input"
          type="number"
          value={breakInterval}
          onChange={(e) => setBreakInterval(parseInt(e.target.value))}
        />
        </div>
      </div>
      

      <div className="whiteblob">
    
        <h2 className="tasklisthead">Your Task List</h2>
        <ol>
          {tasks.map((task, index) => (
            <li key={index}>
              {task.name}
              {!task.isActive && task.sessionsCompleted % 2 !== 0 && (
                <div>
                  <button className="start-break" onClick={() => startBreak(index)}>Start Break</button>
                  {task.isActive && (
                    <button onClick={() => endBreak(index)}>End Break</button>
                  )}
                </div>
              )}
              {!task.isActive && task.sessionsCompleted % 2 === 0 && (
                <button className="start-button" onClick={() => startTask(index)}>Start Task</button>
              )}
              {task.isActive && (
                <div className="timer" style={{ display: task.isActive ? 'block' : 'none' }}>
                  <span>
                    Time Left: {Math.floor(task.timeLeft / 60)}:{(task.timeLeft % 60).toString().padStart(2, '0')}
                  </span>
                  <button onClick={() => pauseTask(index)}>Pause</button>
                </div>
              )}
              <button className = "remove-button" onClick={() => removeTask(index)}>Remove Task</button>
            </li>
          ))}
        </ol>
      </div>
      </div>
    

      
  );
};

export default PomodoroTimer;

*/