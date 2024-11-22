import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom'; // React Routerのインポート
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TaskManager from './TaskManager';
import Settings from './Settings';

function App() {
  const [coins, setCoins] = useState({ gold: 0, silver: 0, bronze: 0 });
  const [dailyTasks, setDailyTasks] = useState([]);
  const [falseReportCount, setFalseReportCount] = useState(0);
  const [isMorningMeetingDone, setIsMorningMeetingDone] = useState(false);

  // ローカルストレージからデータを復元
  useEffect(() => {
    const savedFalseReportCount = localStorage.getItem('falseReportCount');
    const savedCoins = localStorage.getItem('coins');
    const savedDailyTasks = localStorage.getItem('dailyTasks');
    const today = new Date().toDateString();
    const savedDate = localStorage.getItem('morningMeetingDate');
    const savedIsDone = localStorage.getItem('isMorningMeetingDone') === 'true';

    if (savedFalseReportCount) {
      setFalseReportCount(parseInt(savedFalseReportCount, 10));
    }
    if (savedCoins) {
      setCoins(JSON.parse(savedCoins));
    }
    if (savedDailyTasks) {
      setDailyTasks(JSON.parse(savedDailyTasks));
    }

    if (savedDate === today && savedIsDone) {
      setIsMorningMeetingDone(true);
    } else {
      localStorage.setItem('morningMeetingDate', today);
      localStorage.setItem('isMorningMeetingDone', 'false');
      setIsMorningMeetingDone(false);
    }
  }, []);

  // 状態が更新されるたびにローカルストレージに保存
  useEffect(() => {
    localStorage.setItem('coins', JSON.stringify(coins));
    localStorage.setItem('dailyTasks', JSON.stringify(dailyTasks));
    localStorage.setItem('falseReportCount', falseReportCount);
  }, [coins, dailyTasks, falseReportCount]);

  // 朝礼ボタンが押されたときの処理
  const handleMorningMeeting = () => {
    const today = new Date().toDateString();
    localStorage.setItem('isMorningMeetingDone', 'true');
    localStorage.setItem('morningMeetingDate', today);
    setIsMorningMeetingDone(true);
  };

  const onMorningMeeting = () => {
    alert("朝礼に間に合いました。間に合うだけでは意味がありません。すぐに朝の刑務作業を開始してください。");
    localStorage.setItem("isMorningMeetingDone", "true");
    localStorage.setItem("morningMeetingDate", new Date().toDateString());
  };
  

  return (
    <Router>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1 }}>
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
                  onMorningMeeting={onMorningMeeting} // ここで渡す
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
        </div>

        <nav className="navigation-buttons">
          <Link to="/" className="circle-button">刑務</Link>
          <Link to="/settings" className="circle-button">詳細</Link>
        </nav>
      </div>
    </Router>
  );
}

export default App;
