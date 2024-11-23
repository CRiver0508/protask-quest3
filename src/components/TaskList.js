import React from 'react';
import PropTypes from 'prop-types';
import './TaskList.css';

/**
 * タスクリストコンポーネント
 * タスク一覧とタスクの選択、コメント入力を管理します。
 *
 * @param {Array} tasks - タスクの配列（各タスクオブジェクトに name, selected, comment, placeholder が含まれる）
 * @param {Function} onTaskSelectionChange - タスクの選択状態が変化したときのコールバック関数
 * @param {Function} onCommentChange - タスクのコメントが変化したときのコールバック関数
 */
const TaskList = ({ tasks, onTaskSelectionChange, onCommentChange }) => {
  return (
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
        <div
          key={index}
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '10px',
          }}
        >
          <label
            style={{
              display: 'flex',
              alignItems: 'center',
              flex: 1,
            }}
          >
            {/* タスク選択チェックボックス */}
            <input
              type="checkbox"
              checked={task.selected}
              onChange={() => onTaskSelectionChange(index)}
              style={{ margin: '0 10px' }}
            />
            {task.name}

            {/* タスクコメント入力 */}
            <input
              type="text"
              placeholder={task.placeholder}
              value={task.comment}
              onChange={(e) => onCommentChange(index, e.target.value)}
              style={{
                marginLeft: '10px',
                flex: 1,
              }}
            />
          </label>
        </div>
      ))}
    </div>
  );
};

// PropTypesで型をチェック
TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired, // タスク名
      selected: PropTypes.bool.isRequired, // 選択状態
      comment: PropTypes.string, // コメント内容
      placeholder: PropTypes.string, // プレースホルダー（コメント入力欄のヒント）
    })
  ).isRequired,
  onTaskSelectionChange: PropTypes.func.isRequired, // タスク選択状態変更時のコールバック
  onCommentChange: PropTypes.func.isRequired, // コメント変更時のコールバック
};

export default TaskList;
