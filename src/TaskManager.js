import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // React Routerから現在のURLを取得
import './TaskManager.css';
import './App.css';
import avatar1 from './images/avatar1.png';
import avatar2 from './images/avatar2.png';
import avatar3 from './images/avatar3.png';
import avatar4 from './images/avatar4.png';
import avatar5 from './images/avatar5.png';
import avatar6 from './images/avatar6.png';
import avatar7 from './images/avatar7.png';
import avatar8 from './images/avatar8.png';
import avatar9 from './images/avatar9.png';
import avatar10 from './images/avatar10.png';
import avatar11 from './images/avatar11.png';
import avatar12 from './images/avatar12.png';
import avatar13 from './images/avatar13.png';
import avatar14 from './images/avatar14.png';
import avatar15 from './images/avatar15.png';
import avatar16 from './images/avatar16.png';
import avatar17 from './images/avatar17.png';
import avatar18 from './images/avatar18.png';
import avatar19 from './images/avatar19.png';
import avatar20 from './images/avatar20.png';
import avatar21 from './images/avatar21.png';
import avatar22 from './images/avatar22.png';
import avatar23 from './images/avatar23.png';
import avatar24 from './images/avatar24.png';
import avatar25 from './images/avatar25.png';
import avatar26 from './images/avatar26.png';
import backgroundImage from './images/background1.jpg';
import backgroundImage2 from './images/background1.jpg';


// アプリ使用開始日を設定
const startDate = new Date('2024-11-01'); // アプリを使い始めた日（任意で変更可）

// 日付をフォーマットする関数
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 月を2桁に
  const day = String(date.getDate()).padStart(2, '0'); // 日を2桁に

  // 曜日を英語で取得
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayOfWeek = daysOfWeek[date.getDay()];

  return {
      date: `${year}/${month}/${day}`, // 日付部分
      dayOfWeek: dayOfWeek             // 曜日部分
  };
};



const avatars = [
  avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7, avatar8, avatar9, avatar10,
  avatar11, avatar12, avatar13, avatar14, avatar15, avatar16, avatar17, avatar18, avatar19, avatar20,
  avatar21, avatar22, avatar23, avatar24, avatar25, avatar26
];

const comments = [
  "おや、新人か。まぁ仲良くやろう。どうせここからは出られない。俺もお前も。。。",
  "私にも才能と金と美貌と愛嬌があればもっと上手くやれたのに！私に落ち度は一つもない、悪いのは私以外の全てだ！",
  "「人生は配られたカードで勝負しなければならない」という事実に私は気づいていたのか？それとも気づかないふりをしていたのだろうか。",
  "自分の人生の主人公は自分自身だっていうけど、主人公だからって何があるわけでもないよね。",
  "負けたくないなら、戦わなければいい。永遠に殻に閉じこもる人生も悪くないのかもね。",
  "不幸じゃないからといって幸福なわけでもない。",
  "努力と結果は比例しない。 “無駄な” 努力の存在を見極めろ。",
  "努力の先に何が見えている？明確な目標を持たぬ努力は実を結ぶのか？",
  "利用できるものは全て利用し尽くせ。出し惜しみしている時間などない。",
  "人生は下り始めてからの方が長いものだ。どうありたいのか明確にイメージすべきだ。",
  "楽しむための近道はない。楽しむための努力というものも存在する。",
  "嘘ばかりついていると、自分でも何が本当だったのか忘れてしまう。",
  "「こんなはずではなかった」の連続が人生だ。",
  "成功した人間を見下すことで自分を慰めてきたんじゃないか？金や環境が整っていれば自分でもできたと。",
  "もっともらしい「やらない理由」で理論武装する人が多いよね。",
  "みんなただ自分が楽をしたいが為に大切なものを失っている。",
  "夢は叶わないから夢なんだよ。そう思ってる方が楽だもんな。",
  "私たちは生まれた瞬間から死に始める。今この瞬間も。",
  "生物を動かす２つのテコは恐怖と利益である。",
  "成功を収めた時、用心しなくてはいけないのは傲慢である。",
  "シンプルであることは、複雑であることよりも難しい。",
  "迷う必要がないところで迷うな。",
  "自分がみじめに見えないように振舞ってきた。何を恐れていたのだろうか。",
  "生まれ変われたら次こそはまっとうな人間になりたい。",
  "どんな人間になりたいか明確にイメージせよ。その道のりも明確にイメージせよ。イメージできないものは実現できない。",
  "おめでとう。これからは外の世界で理想の自分を追求しよう。大丈夫、君ならできる。"
];



const TaskManager = ({
  coins,
  setCoins,
  dailyTasks,
  setDailyTasks,
  falseReportCount,
  setFalseReportCount,
  onMorningMeeting, // ここで受け取る
}) => {
  // 残りのコードはそのまま

  
  const [isLevelDown, setIsLevelDown] = useState(false); // レベルダウン状態のフラグ
  const [tasks, setTasks] = useState([
    { name: '筋トレ', selected: false, comment: '', placeholder: '限界+1の内容を記入せよ' },
    { name: '有酸素運動', selected: false, comment: '', placeholder: '詳細は画面下にある詳細画面を参照' },
    { name: '自習', selected: false, comment: '', placeholder: '全ての時間を投資せよ' },
    { name: '暗記復習', selected: false, comment: '', placeholder: 'これは脳科学的に効率がいい' },
    { name: '朝活', selected: false, comment: '', placeholder: '夜の作業が朝に勝ることはない' }
  ]);


  

// コイン評価ロジック
const evaluateReward = (dailyTasks) => {
  const allCompletedDays = dailyTasks.filter((count) => count === 5).length;
  const partiallyCompletedDays = dailyTasks.filter((count) => count > 0 && count < 5).length;

  if (allCompletedDays === 13) {
    // ゴールドコイン: 13日間すべてタスク達成
    setCoins((prev) => ({ ...prev, gold: prev.gold + 1 }));

    // ステータスにボーナス +5%
    setStrength((prev) => Math.floor(prev * 1.05));
    setEndurance((prev) => Math.floor(prev * 1.05));
    setHp((prev) => Math.floor(prev * 1.05));
    setIntelligence((prev) => Math.floor(prev * 1.05));
    setMp((prev) => Math.floor(prev * 1.05));
  } else if (allCompletedDays >= 1 && partiallyCompletedDays > 0) {
    // シルバーコイン: 全タスク達成1日以上、部分的達成が残りの日
    setCoins((prev) => ({ ...prev, silver: prev.silver + 1 }));

    // ステータスにボーナス +3%
    setStrength((prev) => Math.floor(prev * 1.03));
    setEndurance((prev) => Math.floor(prev * 1.03));
    setHp((prev) => Math.floor(prev * 1.03));
    setIntelligence((prev) => Math.floor(prev * 1.03));
    setMp((prev) => Math.floor(prev * 1.03));
  } else if (allCompletedDays === 0 && partiallyCompletedDays === 13) {
    // ブロンズコイン: 全タスク達成なし、部分的達成が13日
    setCoins((prev) => ({ ...prev, bronze: prev.bronze + 1 }));

    // ステータスにボーナス +1%
    setStrength((prev) => Math.floor(prev * 1.01));
    setEndurance((prev) => Math.floor(prev * 1.01));
    setHp((prev) => Math.floor(prev * 1.01));
    setIntelligence((prev) => Math.floor(prev * 1.01));
    setMp((prev) => Math.floor(prev * 1.01));
  }

  // 次のサイクルに向けてリセット
  setDailyTasks([]);
};

const handleCommentChange = (index, value) => {
  const updatedTasks = tasks.map((task, i) =>
    i === index ? { ...task, comment: value } : task
  );
  setTasks(updatedTasks);
};


  const [strength, setStrength] = useState(8);
  const [endurance, setEndurance] = useState(2);
  const [hp, setHp] = useState(13);
  const [intelligence, setIntelligence] = useState(1);
  const [mp, setMp] = useState(0);
  const [level, setLevel] = useState(1);
  const [taskCompleted, setTaskCompleted] = useState(false);
  const [lastCompletedDate, setLastCompletedDate] = useState(null);
  const [isAnyTaskSelected, setIsAnyTaskSelected] = useState(false);
  const [previousState, setPreviousState] = useState(null); // 以前の状態を保存する
  // 現在のアバターとコメントを取得するコードを追加
  const [currentAvatar, setCurrentAvatar] = useState(avatars[0]);
  const [currentComment, setCurrentComment] = useState(comments[0]);
  // タスク進捗と硬貨管理
  const [currentDate, setCurrentDate] = useState(new Date()); // 現在の日付
  const [daysSinceStart, setDaysSinceStart] = useState(0); // 使用開始からの日数
  const [missedDays, setMissedDays] = useState(0);
  const [isLevelUp, setIsLevelUp] = React.useState(false);
  const [isReportSubmitted, setIsReportSubmitted] = useState(false); // 報告ボタンの有効化状態
  const [isAvatarChanging, setIsAvatarChanging] = useState(false); // アニメーション状態
  const [isMorningMeetingActive, setIsMorningMeetingActive] = useState(false);
  const [isMorningMeetingDone, setIsMorningMeetingDone] = useState(false); // 朝礼完了フラグ

  const handleMorningMeeting = () => {
    const today = new Date().toDateString();
    localStorage.setItem('isMorningMeetingDone', 'true');
    localStorage.setItem('morningMeetingDate', today);
    setIsMorningMeetingDone(true);
    console.log('Morning meeting completed for:', today);
  };
  

  
  
  useEffect(() => {
    const today = new Date().toDateString();
    const savedDate = localStorage.getItem('morningMeetingDate');
    const isDone = localStorage.getItem('isMorningMeetingDone') === 'true';
  
    if (savedDate !== today || !isDone) {
      setIsMorningMeetingDone(false);
      localStorage.setItem('morningMeetingDate', today);
      localStorage.setItem('isMorningMeetingDone', 'false');
      console.log('Morning meeting reset for today.');
    } else {
      setIsMorningMeetingDone(true);
      console.log('Morning meeting already completed for today.');
    }
  }, []);
  
  
  
  
 
  useEffect(() => {
    console.log("Triggered by isMorningMeetingDone:", isMorningMeetingDone);
  }, [isMorningMeetingDone]);
  
  useEffect(() => {
    console.log("Triggered by morningMeetingDate:", localStorage.getItem("morningMeetingDate"));
  }, []);
  

// 朝礼完了フラグをローカルストレージから読み込むuseEffect
useEffect(() => {
  console.log('useEffect triggered');
  const today = new Date().toDateString();
  const savedMeetingDoneDate = localStorage.getItem('morningMeetingDate');
  const savedIsMorningMeetingDone = localStorage.getItem('isMorningMeetingDone');

  if (savedMeetingDoneDate !== today || savedIsMorningMeetingDone !== 'true') {
    console.log('Resetting morning meeting state');
    setIsMorningMeetingDone(false);
    localStorage.removeItem('isMorningMeetingDone');
    localStorage.setItem('morningMeetingDate', today);
  } else {
    setIsMorningMeetingDone(true);
  }

  return () => {
    console.log('Cleaning up useEffect.');
  };
}, []);








// 朝礼ボタン
  useEffect(() => {
    const checkMorningMeetingTime = () => {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinutes = now.getMinutes();
  
      // 3:00 ～ 5:00 の間のみ有効化
      if (currentHour >= 3 && currentHour <= 23) {
        setIsMorningMeetingActive(true);
      } else {
        setIsMorningMeetingActive(false);
      }
    };
  
    // 毎分チェック
    checkMorningMeetingTime();
    const interval = setInterval(checkMorningMeetingTime, 60000); // 1分ごとに確認
  
    return () => clearInterval(interval); // コンポーネントがアンマウントされたらクリーンアップ
  }, []);
  
  

useEffect(() => {
  const today = new Date().toDateString();
  if (lastCompletedDate !== today) {
    if (lastCompletedDate !== null) {
      // 昨日タスクが完了していない場合、怠業日数を1増加
      setMissedDays((prev) => prev + 1);
    }
    setTaskCompleted(false);
    setLastCompletedDate(today);
  }
}, [lastCompletedDate]);



// 現在の日付と日数を更新
useEffect(() => {
  const today = new Date();
  setCurrentDate(today);

  // アプリ使用開始日からの日数を計算
  const diffTime = today - startDate;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  setDaysSinceStart(diffDays);
}, []);


useEffect(() => {
  // データをローカルストレージに保存
  localStorage.setItem('tasks', JSON.stringify(tasks));
  localStorage.setItem('status', JSON.stringify({ strength, endurance, hp, intelligence, mp, level }));
}, [tasks, strength, endurance, hp, intelligence, mp, level]);

useEffect(() => {
  // ページロード時にローカルストレージからデータを読み込む
  const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const savedStatus = JSON.parse(localStorage.getItem('status')) || {};
  if (savedTasks.length) setTasks(savedTasks);
  if (Object.keys(savedStatus).length) {
    setStrength(savedStatus.strength || 0);
    setEndurance(savedStatus.endurance || 0);
    setHp(savedStatus.hp || 0);
    setIntelligence(savedStatus.intelligence || 0);
    setMp(savedStatus.mp || 0);
    setLevel(savedStatus.level || 1);
  }
}, []);



// タスク完了後に呼び出す
useEffect(() => {
  if (taskCompleted) {
    // 日ごとのタスク完了数を保存
    const completedTasks = tasks.filter((task) => task.selected).length;
    setDailyTasks((prev) => {
      const updatedTasks = [...prev, completedTasks];
      return updatedTasks.slice(-13); // 最大13日分のみ保持
    });

    // 13日分揃ったらコインを評価
    if (dailyTasks.length === 13) {
      evaluateReward(dailyTasks);
    }
  }
}, [taskCompleted, dailyTasks]);



useEffect(() => {
  const today = new Date().toDateString();
  if (lastCompletedDate !== today) {
    setTaskCompleted(false);
    setLastCompletedDate(today);
  }
}, [lastCompletedDate]);

// アバターとコメントを更新するための useEffect フックを追加
useEffect(() => {
  // レベルが13の倍数のとき、アバターとコメントを更新
  // このブロック内でのみ必要な avatarIndex
  const avatarIndex = Math.floor((level - 1) / 13); // 0からスタートするインデックス
  setCurrentAvatar(avatars[Math.min(avatarIndex, avatars.length - 1)]);
  setCurrentComment(comments[Math.min(avatarIndex, comments.length - 1)]);

  // アバターが変化したタイミングでエフェクトをトリガー
  if (level % 13 === 0) {
    setIsAvatarChanging(true); // エフェクト開始
    setTimeout(() => setIsAvatarChanging(false), 1500); // 1.5秒後に終了
  }
}, [level]);

// ステータス変化のロジックに使用するインデックスを再計算
// この部分では260行目の avatarIndex はスコープ外になるため、再定義が必要
const avatarIndex = Math.floor((level - 1) / 13); // アバターのインデックスを計算

// ステータス変化のロジック
if (level % 13 === 0) {
  const avatarNumber = avatarIndex + 1; // アバターは1から始まる番号
  const isStatDecrease = [2, 3, 10, 11, 12, 13, 14, 21, 22, 23, 24].includes(avatarNumber);
  const isStatIncrease = [4, 5, 6, 7, 8, 9, 15, 16, 17, 18, 19, 20, 25, 26].includes(avatarNumber);

  if (isStatDecrease) {
    // 10%ダウン
    setStrength((prev) => Math.floor(prev * 0.9));
    setEndurance((prev) => Math.floor(prev * 0.9));
    setHp((prev) => Math.floor(prev * 0.9));
    setIntelligence((prev) => Math.floor(prev * 0.9));
    setMp((prev) => Math.floor(prev * 0.9));
  } else if (isStatIncrease) {
    // 10%アップ
    setStrength((prev) => Math.floor(prev * 1.1));
    setEndurance((prev) => Math.floor(prev * 1.1));
    setHp((prev) => Math.floor(prev * 1.1));
    setIntelligence((prev) => Math.floor(prev * 1.1));
    setMp((prev) => Math.floor(prev * 1.1));
  }
}

  const handleTaskSelection = (index) => {
    const updatedTasks = tasks.map((task, i) => 
      i === index ? { ...task, selected: !task.selected } : task
    );
    setTasks(updatedTasks);
    const anyTaskSelected = updatedTasks.some(task => task.selected);
    setIsAnyTaskSelected(anyTaskSelected);
  };

// ステータスの増加とレベルアップ処理
const handleCompleteTasks = () => {
  // 確認ダイアログを表示
  const isConfirmed = window.confirm(
    "嘘偽りはないな？本当にこれでいいのだな？もう一度自分の心に問え。虚偽の報告は許さない。"
  );

  if (isConfirmed) {
    if (taskCompleted) return;

    // 現在のステータスを保存して、やり直しに備える
    setPreviousState({
      strength,
      endurance,
      hp,
      intelligence,
      mp,
      level,
    });

    let totalStrength = 0;
    let totalEndurance = 0;
    let totalHp = 0;
    let totalIntelligence = 0;
    let totalMp = 0;
    let taskCount = 0;

    tasks.forEach((task) => {
      if (task.selected) {
        switch (task.name) {
          case "筋トレ":
            totalStrength += 4;
            totalEndurance += 2;
            break;
          case "有酸素運動":
            totalHp += 6;
            totalStrength += 2;
            break;
          case "自習":
            totalIntelligence += 2;
            totalMp += 2;
            break;
          case "暗記復習":
            totalMp += 4;
            totalIntelligence += 1;
            break;
          case "朝活":
            totalEndurance += 3;
            totalHp += 2;
            break;
          default:
            break;
        }
        taskCount++;
      }
    });

    setStrength((prev) => prev + totalStrength);
    setEndurance((prev) => prev + totalEndurance);
    setHp((prev) => prev + totalHp);
    setIntelligence((prev) => prev + totalIntelligence);
    setMp((prev) => prev + totalMp);

    if (taskCount > 0) {
      setLevel((prev) => {
        const newLevel = prev + 1;
        setIsLevelUp(true); // レベルアップ時のエフェクトをトリガー
        setTimeout(() => setIsLevelUp(false), 1500); // 1.5秒後にエフェクト終了
        return newLevel;
      });
    }
    

    // タスクの選択を解除（チェックを外す）
    const resetTasks = tasks.map((task) => ({
      ...task,
      selected: false,
    }));
    setTasks(resetTasks);

    setTaskCompleted(true);
    setLastCompletedDate(new Date().toDateString());
    setIsAnyTaskSelected(false); // 全てのチェックが外れたため無効化
    setIsReportSubmitted(true); // 報告ボタンを有効化
  }
};

// やり直しボタンを押したときの処理
const resetTaskCompletion = () => {
  const isConfirmed = window.confirm("虚偽の報告をしたということか？");
  if (isConfirmed) { // ユーザーがOKを押した場合
    if (previousState) {
      alert("虚偽の報告としてカウントされました。"); // アラート表示
      setIsLevelDown(true); // アニメーションフラグON
      setTimeout(() => setIsLevelDown(false), 1000); // 1秒後にリセット

      setStrength(previousState.strength);
      setEndurance(previousState.endurance);
      setHp(previousState.hp);
      setIntelligence(previousState.intelligence);
      setMp(previousState.mp);
      setLevel(previousState.level);
      setTaskCompleted(false);
      setPreviousState(null); // やり直し状態をリセット
    }

    // 虚偽の報告回数を更新
    const newCount = falseReportCount + 1; // 現在の値に1を足す
    setFalseReportCount(newCount); // 状態を更新

    localStorage.setItem('falseReportCount', newCount); // ローカルストレージに保存
  } else {
    console.log("キャンセルされました。");
  }
};


const location = useLocation(); // 現在の画面パスを取得

useEffect(() => {
    if (location.pathname === "/") {
        console.log("刑務画面が表示されました");
        triggerEffectForTaskScreen();
    }
}, [location.pathname]); // locationが変化するたびに実行

const triggerEffectForTaskScreen = () => {
    console.log("刑務画面のエフェクトをトリガーしました");

    const element = document.querySelector(".task-screen-container"); // 適切なクラス名を指定
    if (element) {
        element.style.transition = "opacity 1s ease-in-out"; // アニメーションの設定
        element.style.opacity = "1"; // 表示
    } else {
        console.error("エフェクトを適用する要素が見つかりません");
    }
};



return (
  <>
  <div className="app-container">
    {/* 背景画像 */}
    <div
      className="background-container"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    ></div>

    {/* コンテンツ */}
    <div className="content-container">
      {/* 日付表示 */}
      <div className="date-container">
        <div className="date-display-left">
        <p className="date-text">{currentDate.toLocaleDateString()}</p>
        <p className="dayOfWeek-text">{currentDate.toLocaleDateString('en-US', { weekday: 'long' })}</p>
        </div>
        <div className="date-display-right">
          <p>収監日数:<br />
          {daysSinceStart} day(s)</p>
          <p>怠業日数:<br />
          {missedDays} day(s)</p>
        </div>
      </div>

      {/* アバター */}
      <div className="avatar-container">
        <img src={currentAvatar} alt="Current Avatar" className="avatar-image" />
        <p className="avatar-comment">{currentComment}</p>
      </div>

      {/* タスク選択 */}
      <div
  className="task-selection"
  style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  }}
>
  <div className="prison-task">
    <span className="task-char task-char-1">刑</span>
    <span className="task-char task-char-2">務</span>
    <span className="task-char task-char-3">作</span>
    <span className="task-char task-char-4">業</span>
  </div>
       
        {tasks.map((task, index) => (
          <div key={index} style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
            <label style={{ display: "flex", alignItems: "center", flex: 1 }}>
              <input
                type="checkbox"
                disabled={task.name === "朝活" && !isMorningMeetingDone} // 朝活かつ朝礼未完了時のみ無効化
                checked={task.selected}
                onChange={() => handleTaskSelection(index)}
                style={{ margin: "0 10px" }}
              />
              {task.name}
              <input
                type="text"
                placeholder={task.placeholder}
                value={task.comment}
                onChange={(e) => handleCommentChange(index, e.target.value)}
              />
            </label>
          </div>
        ))}
      </div>

      {/* 完了・訂正ボタン */}
      <div className="task-buttons-container">
        <button
          className="task-button"
          onClick={handleCompleteTasks}
          disabled={!isAnyTaskSelected}
        >
          本日の作業完了を報告
        </button>
        <button
          className="task-button"
          onClick={resetTaskCompletion}
          disabled={!taskCompleted}
        >
          報告の訂正
        </button>
      </div>

      {/* 朝礼ボタンをここに追加 */}
      <div className="morning-meeting-container">
      <button
  className={`morning-meeting-button ${isMorningMeetingActive ? "" : "disabled"}`}
  disabled={!isMorningMeetingActive}
  onClick={onMorningMeeting} // 親コンポーネントの関数を呼び出すだけ
>
  ⌛
</button>

</div>

       
      <div className={`status-box ${isLevelUp ? 'level-up-effect' : ''} ${isLevelDown ? 'level-down-effect' : ''}`}>    
       <h3>ステータス</h3>
       <p>レベル: {level}</p>
       <p>HP: {hp}</p>
       <p>MP: {mp}</p>
       <p>力: {strength}</p>
       <p>知力: {intelligence}</p>
       <p>耐久: {endurance}</p>
      </div>
    </div>
  </div>
</>
);
};

export default TaskManager;
