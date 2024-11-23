import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // 現在のURLパスを取得
import { avatars, backgrounds } from './utils/images';
import Avatar from './components/Avatar';
import Button from './components/Button';
import StatusBox from './components/StatusBox';
import TaskList from './components/TaskList';
import './TaskManager.css';
import './common.css'; // 共通のスタイル


const TaskManager = ({
  coins,
  setCoins,
  dailyTasks,
  setDailyTasks,
  falseReportCount,
  setFalseReportCount,
  onMorningMeeting,
}) => {
  // 状態管理
  const [strength, setStrength] = useState(8);
  const [endurance, setEndurance] = useState(2);
  const [hp, setHp] = useState(13);
  const [intelligence, setIntelligence] = useState(1);
  const [mp, setMp] = useState(0);
  const [level, setLevel] = useState(1);
  const [currentAvatar, setCurrentAvatar] = useState(avatars[0]);
  const [currentComment, setCurrentComment] = useState('');
  const [taskCompleted, setTaskCompleted] = useState(false);
  const [missedDays, setMissedDays] = useState(0);
  const [lastCompletedDate, setLastCompletedDate] = useState(null);

  // アプリ使用開始日
  const startDate = new Date('2024-11-01');
  const [daysSinceStart, setDaysSinceStart] = useState(0);

  // 現在の日付を計算
  useEffect(() => {
    const today = new Date();
    const diffTime = today - startDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    setDaysSinceStart(diffDays);
  }, [startDate]);

  // レベルアップ時のアバター更新
  useEffect(() => {
    const avatarIndex = Math.floor((level - 1) / 13);
    setCurrentAvatar(avatars[Math.min(avatarIndex, avatars.length - 1)]);
    setCurrentComment(
      `レベル${level}に到達しました。次のレベルを目指してください！`
    );
  }, [level]);

  // タスク完了処理
  const handleCompleteTasks = () => {
    if (taskCompleted) return;

    setStrength((prev) => prev + 2);
    setEndurance((prev) => prev + 2);
    setHp((prev) => prev + 3);
    setIntelligence((prev) => prev + 1);
    setMp((prev) => prev + 1);
    setLevel((prev) => prev + 1);

    setTaskCompleted(true);
    setLastCompletedDate(new Date().toDateString());
  };

  // ローカルストレージからデータを復元
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('dailyTasks')) || [];
    const savedStatus = JSON.parse(localStorage.getItem('status')) || {};
    const savedMissedDays = localStorage.getItem('missedDays');

    setDailyTasks(savedTasks);
    setStrength(savedStatus.strength || 8);
    setEndurance(savedStatus.endurance || 2);
    setHp(savedStatus.hp || 13);
    setIntelligence(savedStatus.intelligence || 1);
    setMp(savedStatus.mp || 0);
    setLevel(savedStatus.level || 1);
    setMissedDays(Number(savedMissedDays) || 0);
  }, [setDailyTasks]);

  // ローカルストレージへの保存
  useEffect(() => {
    localStorage.setItem('dailyTasks', JSON.stringify(dailyTasks));
    localStorage.setItem(
      'status',
      JSON.stringify({ strength, endurance, hp, intelligence, mp, level })
    );
    localStorage.setItem('missedDays', missedDays);
  }, [dailyTasks, strength, endurance, hp, intelligence, mp, level, missedDays]);

  // locationパスによるエフェクトトリガー
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === '/') {
      console.log('刑務画面が表示されました');
    }
  }, [location.pathname]);

  return (
    <div className="task-manager-container">
      {/* 背景画像 */}
      <div
        className="background-container"
        style={{ backgroundImage: `url(${backgrounds.background1})` }}
      ></div>

      {/* アバター表示 */}
      <Avatar currentAvatar={currentAvatar} currentComment={currentComment} />

      {/* ステータスボックス */}
      <StatusBox
        level={level}
        strength={strength}
        endurance={endurance}
        hp={hp}
        intelligence={intelligence}
        mp={mp}
        missedDays={missedDays}
      />

      {/* タスクリスト */}
      <TaskList
        tasks={dailyTasks}
        setTasks={setDailyTasks}
        onTaskComplete={handleCompleteTasks}
      />

      {/* ボタン */}
      <div className="button-container">
        <Button
          label="本日の作業完了を報告"
          onClick={handleCompleteTasks}
          disabled={taskCompleted}
        />
        <Button label="朝礼" onClick={onMorningMeeting} />
      </div>
    </div>
  );
};

export default TaskManager;
