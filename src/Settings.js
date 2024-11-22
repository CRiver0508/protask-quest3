import React, { useEffect, useState } from 'react';
import './TaskManager.css'; // CSSファイルのインポート
import backgroundImage2 from './images/background2.jpg'; // 背景画像のインポート

function Settings({ coins, dailyTasks }) {
  const [falseReportCount, setFalseReportCount] = useState(0);

  useEffect(() => {
    const savedFalseReportCount = localStorage.getItem('falseReportCount');
    if (savedFalseReportCount !== null) {
      setFalseReportCount(Number(savedFalseReportCount));
    }
  }, []);

  const totalDays = dailyTasks.length;

  // 達成率計算
  const completedTasks = dailyTasks.reduce((sum, count) => sum + count, 0);
  const totalCompletionRate =
    totalDays > 0 ? Math.floor((completedTasks / (totalDays * 5)) * 100) : 0;

  // 一週間・一ヶ月の達成率を計算
  const last7Days = dailyTasks.slice(-7);
  const last30Days = dailyTasks.slice(-30);

  const weeklyCompletionRate =
    last7Days.length > 0
      ? Math.floor(
          (last7Days.reduce((sum, count) => sum + count, 0) /
            (last7Days.length * 5)) *
            100
        )
      : 0;

  const monthlyCompletionRate =
    last30Days.length > 0
      ? Math.floor(
          (last30Days.reduce((sum, count) => sum + count, 0) /
            (last30Days.length * 5)) *
            100
        )
      : 0;

  return (
    <>
      {/* 背景画像 */}
      <div
        className="settings-background"
        style={{
          backgroundImage: `url(${backgroundImage2})`, // 背景画像を設定
        }}
      ></div>

      {/* テキストコンテンツ */}
      <div className="settings-content">
        <h2>成果の詳細</h2>

        {/* 刑務作業達成率 */}
        <div style={{ marginBottom: '20px' }}>
          <h3>刑務作業達成率</h3>
          <p>全体の達成率: {totalCompletionRate} %</p>
          <p>一ヶ月の達成率: {monthlyCompletionRate} %</p>
          <p>一週間の達成率: {weeklyCompletionRate} %</p>
        </div>

        {/* 獲得した硬貨 */}
        <div style={{ marginBottom: '20px' }}>
          <h3>獲得した硬貨</h3>
          <p>錆びた金の硬貨: {coins.gold} 枚</p>
          <p>錆びた銀の硬貨: {coins.silver} 枚</p>
          <p>錆びた銅の硬貨: {coins.bronze} 枚</p>
        </div>

        {/* 虚偽の報告回数 */}
        <div className="false-report-section">
          <h3>虚偽の報告をした回数:
            <span className="false-report-number">{falseReportCount}</span> 回
          </h3>
       </div>

        <h2>刑務作業の詳細説明</h2>
        <h3>-限界+1を意識して目標を立て実行せよ-<br />
          -虚偽の報告は許さない-
        </h3>
        <div style={{ marginBottom: '20px' }}>
          <p>筋トレ:<br />
            30分以上の筋力トレーニング。休憩時間は含まない。無数にある隙間時間の中でできるトレーニングを積み重ねれば30分は余裕のはずだ。言い訳はいらない。
          </p>
          <p>有酸素運動:<br />
            30分以上の有酸素運動。椅子や階段があれば昇降運動が可能だ。座りながらでもできるトレーニングもある。これを読書や学習をしながらやればいい。できない理由が一つもない。
          </p>
          <p>自習:<br />
            最低2時間。やれるなら20時間やってもいい。集中していない時間は含めるな。眠いなら立ってやればいい。ノートの取り方を工夫しろ。わからなければコーネル式ノートを参考にせよ。
          </p>
          <p>暗記復習:<br />
            就寝前と起床後10分の暗記内容の復習。この復習方法は脳科学的に効率的な学習に役立つと言われている。就寝前と起床後は余計なことはせずこれをやれ。他のことはするな。
          </p>
          <p>朝活:<br />
            夜に作業が捗ると思っているとしたらそれは幻想だ。朝の４時～５時に起きろ。作業効率が落ちるから睡眠時間は削るな。これで夜の無駄な余暇の時間が減り、それを作業時間に還元できる。
          </p>
          <p>全て完璧にこなせ<br />
          怠るな<br />
          もうすでに一生分サボってきただろ？</p>
        </div>
      </div>
    </>
  );
}

export default Settings;
