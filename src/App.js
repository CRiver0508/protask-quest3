import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TaskManager from './pages/TaskManager';
import Settings from './pages/Settings';
import './App.css'; // 全体のスタイリング
import './common.css'; // 共通のスタイル


// 状態管理の初期値
const initialCoins = { gold: 0, silver: 0, bronze: 0 };

function App() {
  // アプリ全体で共有する状態
  const [coins, setCoins] = useState(initialCoins);
  const [dailyTasks, setDailyTasks] = useState([]);
  const [falseReportCount, setFalseReportCount] = useState(0);

  // ローカルストレージからデータを復元
  useEffect(() => {
    const savedCoins = localStorage.getItem('coins');
    const savedDailyTasks = localStorage.getItem('dailyTasks');
    const savedFalseReportCount = localStorage.getItem('falseReportCount');

    if (savedCoins) setCoins(JSON.parse(savedCoins));
    if (savedDailyTasks) setDailyTasks(JSON.parse(savedDailyTasks));
    if (savedFalseReportCount) setFalseReportCount(parseInt(savedFalseReportCount, 10));
  }, []);

  // 状態が更新されるたびにローカルストレージに保存
  useEffect(() => {
    localStorage.setItem('coins', JSON.stringify(coins));
    localStorage.setItem('dailyTasks', JSON.stringify(dailyTasks));
    localStorage.setItem('falseReportCount', falseReportCount);
  }, [coins, dailyTasks, falseReportCount]);

  return (
    <Router>
      <div className="app-container">
        {/* ルーティング */}
        <Routes>
          <Route
            path="/"
            element={
              <TaskManager
                coins={coins}
                setCoins={setCoins}
                dailyTasks={dailyTasks}
                setDailyTasks={setDailyTasks}
                falseReportCount={falseReportCount}
                setFalseReportCount={setFalseReportCount}
              />
            }
          />
          <Route
            path="/settings"
            element={
              <Settings
                coins={coins}
                dailyTasks={dailyTasks}
                falseReportCount={falseReportCount}
              />
            }
          />
        </Routes>

        {/* ナビゲーションボタン */}
        <nav className="navigation-buttons">
          <Link to="/" className="circle-button">
            刑務
          </Link>
          <Link to="/settings" className="circle-button">
            詳細
          </Link>
        </nav>
      </div>
    </Router>
  );
}

export default App;
