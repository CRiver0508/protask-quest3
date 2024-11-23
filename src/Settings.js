import React from 'react';
import PropTypes from 'prop-types'; // 型チェック用
import './Settings.css'; // 必要に応じてスタイルシートを調整
import backgroundImage2 from '../utils/images'; // 背景画像をutilsからインポート

const Settings = ({ coins, dailyTasks, falseReportCount }) => {
  // タスク達成率計算
  const totalDays = dailyTasks.length;
  const completedTasks = dailyTasks.reduce((sum, count) => sum + count, 0);
  const totalCompletionRate =
    totalDays > 0 ? Math.floor((completedTasks / (totalDays * 5)) * 100) : 0;

  const last7Days = dailyTasks.slice(-7);
  const last30Days = dailyTasks.slice(-30);

  const weeklyCompletionRate =
    last7Days.length > 0
      ? Math.floor(
          (last7Days.reduce((sum, count) => sum + count, 0) / (last7Days.length * 5)) * 100
        )
      : 0;

  const monthlyCompletionRate =
    last30Days.length > 0
      ? Math.floor(
          (last30Days.reduce((sum, count) => sum + count, 0) / (last30Days.length * 5)) * 100
        )
      : 0;

  return (
    <div
      className="settings-container"
      style={{
        backgroundImage: `url(${backgroundImage2})`, // 背景画像を適用
        backgroundSize: 'cover',
        minHeight: '100vh',
      }}
    >
      <div className="settings-content">
        <h2>成果の詳細</h2>
        <div>
          <h3>刑務作業達成率</h3>
          <p>全体の達成率: {totalCompletionRate} %</p>
          <p>一週間の達成率: {weeklyCompletionRate} %</p>
          <p>一ヶ月の達成率: {monthlyCompletionRate} %</p>
        </div>

        <div>
          <h3>獲得した硬貨</h3>
          <p>金の硬貨: {coins.gold} 枚</p>
          <p>銀の硬貨: {coins.silver} 枚</p>
          <p>銅の硬貨: {coins.bronze} 枚</p>
        </div>

        <div>
          <h3>虚偽の報告回数</h3>
          <p>{falseReportCount} 回</p>
        </div>

        <h3>刑務作業の詳細説明</h3>
        <p>
          各タスクの説明をここに記載します（例: 筋トレは30分以上、暗記復習は10分間など）。
          必要に応じて調整してください。
        </p>
      </div>
    </div>
  );
};

// 型チェック
Settings.propTypes = {
  coins: PropTypes.shape({
    gold: PropTypes.number.isRequired,
    silver: PropTypes.number.isRequired,
    bronze: PropTypes.number.isRequired,
  }).isRequired,
  dailyTasks: PropTypes.arrayOf(PropTypes.number).isRequired,
  falseReportCount: PropTypes.number.isRequired,
};

export default Settings;
