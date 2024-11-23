import React, { useState, useEffect } from 'react';
import './TaskManager.css';
import { avatars, comments, backgroundImage1 } from '../utils/images';
import Avatar from '../components/Avatar';
import Button from '../components/Button';
import StatusBox from '../components/StatusBox';
import TaskList from '../components/TaskList';
import '../common.css';

const TaskManager = ({
  coins,
  setCoins,
  falseReportCount,
  setFalseReportCount,
  onMorningMeeting,
}) => {
  const [strength, setStrength] = useState(8);
  const [endurance, setEndurance] = useState(2);
  const [hp, setHp] = useState(13);
  const [intelligence, setIntelligence] = useState(1);
  const [mp, setMp] = useState(0);
  const [level, setLevel] = useState(1);
  const [currentAvatar, setCurrentAvatar] = useState(null);
  const [currentComment, setCurrentComment] = useState('');
  const [taskCompleted, setTaskCompleted] = useState(false);
  const [daysSinceStart, setDaysSinceStart] = useState(0);
  const [missedDays, setMissedDays] = useState(0);
  const [previousState, setPreviousState] = useState(null);
  const [isLevelDown, setIsLevelDown] = useState(false);

  const [tasks, setTasks] = useState([
    { name: '筋トレ', selected: false, comment: '', placeholder: '限界+1の内容or時間を記入せよ' },
    { name: '有酸素運動', selected: false, comment: '', placeholder: '詳細は画面下にある詳細画面を参照' },
    { name: '自習', selected: false, comment: '', placeholder: '全ての時間を投資せよ' },
    { name: '暗記復習', selected: false, comment: '', placeholder: 'これは脳科学的に効率がいい' },
    { name: '朝活', selected: false, comment: '', placeholder: '夜の作業が朝に勝ることはない' },
  ]);

  useEffect(() => {
    const taskManagerContainer = document.querySelector('.task-manager-container');
    if (taskManagerContainer) {
      taskManagerContainer.style.backgroundImage = `url(${backgroundImage1})`;
      taskManagerContainer.style.backgroundSize = 'cover';
      taskManagerContainer.style.backgroundPosition = 'center';
    }
  }, []);

  useEffect(() => {
    const startDate = new Date('2024-11-01');
    const today = new Date();
    const diffDays = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
    setDaysSinceStart(diffDays);

    const savedStatus = JSON.parse(localStorage.getItem('status')) || {};
    setStrength(savedStatus.strength || 8);
    setEndurance(savedStatus.endurance || 2);
    setHp(savedStatus.hp || 13);
    setIntelligence(savedStatus.intelligence || 1);
    setMp(savedStatus.mp || 0);
    setLevel(savedStatus.level || 1);
    setMissedDays(savedStatus.missedDays || 0);
  }, []);

  useEffect(() => {
    const avatarIndex = Math.floor((level - 1) / 13) + 1; // レベルに基づいてアバターを計算
    const avatarKey = `avatar${Math.min(avatarIndex, 26)}`; // 最大26種類のアバター
    const newAvatar = avatars[avatarKey]; // avatars からアバターを取得
  
    if (newAvatar) {
      setCurrentAvatar(newAvatar); // 正常なアバターを設定
    } else {
      console.error(`Avatar not found for key: ${avatarKey}`); // エラーログ
    }
  
    const newComment = comments[Math.min(avatarIndex - 1, comments.length - 1)]; // コメント取得
    setCurrentComment(newComment);
  }, [level]);
  

  const handleCompleteTasks = () => {
    const isConfirmed = window.confirm("嘘偽りはないな？本当にこれでいいのだな？");
    if (isConfirmed) {
      if (taskCompleted) return;

      setPreviousState({ strength, endurance, hp, intelligence, mp, level });

      let totalStrength = 0;
      let totalEndurance = 0;
      let totalHp = 0;
      let totalIntelligence = 0;
      let totalMp = 0;

      tasks.forEach((task) => {
        if (task.selected) {
          switch (task.name) {
            case '筋トレ':
              totalStrength += 4;
              totalEndurance += 2;
              break;
            case '有酸素運動':
              totalHp += 6;
              totalStrength += 2;
              break;
            case '自習':
              totalIntelligence += 2;
              totalMp += 2;
              break;
            case '暗記復習':
              totalMp += 4;
              totalIntelligence += 1;
              break;
            case '朝活':
              totalEndurance += 3;
              totalHp += 2;
              break;
            default:
              break;
          }
        }
      });

      setStrength((prev) => prev + totalStrength);
      setEndurance((prev) => prev + totalEndurance);
      setHp((prev) => prev + totalHp);
      setIntelligence((prev) => prev + totalIntelligence);
      setMp((prev) => prev + totalMp);
      setLevel((prev) => prev + 1);
      setTaskCompleted(true);

      const resetTasks = tasks.map((task) => ({
        ...task,
        selected: false,
      }));
      setTasks(resetTasks);
    }
  };

  const resetTaskCompletion = () => {
    const isConfirmed = window.confirm("虚偽の報告をしたということか？");
    if (isConfirmed && previousState) {
      alert("虚偽の報告としてカウントされました。");
      setIsLevelDown(true);
      setTimeout(() => setIsLevelDown(false), 1000);

      setStrength(previousState.strength);
      setEndurance(previousState.endurance);
      setHp(previousState.hp);
      setIntelligence(previousState.intelligence);
      setMp(previousState.mp);
      setLevel(previousState.level);
      setTaskCompleted(false);
      setPreviousState(null);

      setFalseReportCount((prev) => prev + 1);
    }
  };

  return (
    <div className="task-manager-container">
      <div className="date-container">
        <div className="date-display-right">
          <p className="date-text">{new Date().toLocaleDateString()}</p>
          <p className="dayOfWeek-text">
            {new Date().toLocaleDateString('en-US', { weekday: 'long' })}
          </p>
        </div>
        <div className="date-display-bottom-right">
          <p>収監日数: {daysSinceStart} 日</p>
          <p>怠業日数: {missedDays} 日</p>
        </div>
      </div>

      <div className="avatar-container">
        <Avatar currentAvatar={currentAvatar} currentComment={currentComment} />
      </div>

      <div className="task-list-container">
        <TaskList
          tasks={tasks}
          onTaskSelectionChange={(index) => {
            const updatedTasks = [...tasks];
            updatedTasks[index].selected = !updatedTasks[index].selected;
            setTasks(updatedTasks);
          }}
          onCommentChange={(index, comment) => {
            const updatedTasks = [...tasks];
            updatedTasks[index].comment = comment;
            setTasks(updatedTasks);
          }}
        />
      </div>

      <div className="buttons-container">
        <Button
          className="task-button"
          label="本日の作業完了を報告"
          onClick={handleCompleteTasks}
          disabled={taskCompleted}
        />
        <Button
          className="task-button"
          label="報告の訂正"
          onClick={resetTaskCompletion}
          disabled={!taskCompleted}
        />
      </div>
        <Button
          className="morning-meeting-button"
          label="朝礼"
          onClick={onMorningMeeting}
        />
      

      <div className="status-box-container">
        <StatusBox
          level={level}
          strength={strength}
          endurance={endurance}
          hp={hp}
          intelligence={intelligence}
          mp={mp}
        />
      </div>
    </div>
  );
};

export default TaskManager;
