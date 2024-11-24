import React from 'react';
import PropTypes from 'prop-types'; // 型チェック用
import './Settings.css'; // 必要に応じてスタイルシートを調整
import { backgroundImage2 } from '../utils/images'; // 背景画像をutilsからインポート
import '../common.css'; // 共通のスタイル

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
          <h3 className="h3-underline">刑務作業達成率</h3>
          <p>・全体の達成率: <span className="persona5-numbers">{totalCompletionRate}</span> %</p>
          <p>・一週間の達成率: <span className="persona5-numbers">{weeklyCompletionRate}</span> %</p>
          <p>・一ヶ月の達成率: <span className="persona5-numbers">{monthlyCompletionRate}</span> %</p>
        </div>

        <div>
          <h3 className="h3-underline">獲得した硬貨</h3>
          <p>・金の硬貨: <span className="persona5-numbers">{coins.gold}</span> 枚</p>
          <p>・銀の硬貨: <span className="persona5-numbers">{coins.silver}</span> 枚</p>
          <p>・銅の硬貨: <span className="persona5-numbers">{coins.bronze}</span> 枚</p>
        </div>

        <div>
          <h3 className="h3-underline">懲罰行為</h3>
          <p>・虚偽の報告回数 <span className="false-report-number">{falseReportCount}</span> 回</p>
          <p>・朝礼の欠席回数 <span className="false-report-number">{falseReportCount}</span> 回</p>
        </div>
        <h2>刑務作業の詳細説明</h2>
        <h3>-限界+1を意識して目標を立て実行せよ-<br />
            -虚偽の報告は許さない-</h3>
            <p>有酸素運動:<br />
             30分以上の有酸素運動。椅子や階段があれば昇降運動が可能。座りながらでもできるトレーニングもある。これを読書や学習をしながらやればいい。できない理由が一つもない。</p>
          <p>自習:<br />
             最低2時間。やれるなら20時間やってもいい。集中していない時間は含めるな。眠いなら立ってやればいい。ノートの取り方を工夫しろ。わからなければコーネル式ノートを参考にせよ。</p>
          <p>暗記復習:<br />
             就寝前と起床後10分の暗記内容の復習。この復習方法は脳科学的に効率的な学習に役立つと言われている。就寝前と起床後は余計なことはせずこれをやれ。他のことはするな。</p>
          <p>朝活:<br />
             夜に作業が捗ると思っているとしたらそれは幻想だ。朝の３時～５時に起きろ。作業効率が落ちるから睡眠時間は削るな。これで夜の無駄な余暇の時間が減り、それを作業時間に還元できる。</p>
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
