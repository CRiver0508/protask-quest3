import React from 'react';
import PropTypes from 'prop-types';
import './StatusBox.css'; // CSSファイルのインポート

/**
 * ステータス表示コンポーネント
 * @param {number} level - 現在のレベル
 * @param {number} hp - 現在のHP
 * @param {number} mp - 現在のMP
 * @param {number} strength - 現在の力
 * @param {number} intelligence - 現在の知力
 * @param {number} endurance - 現在の耐久
 * @param {number} missedDays - 怠業日数
 * @param {boolean} isLevelUp - レベルアップエフェクトを表示するか
 * @param {boolean} isLevelDown - レベルダウンエフェクトを表示するか
 */
const StatusBox = ({
  level,
  hp,
  mp,
  strength,
  intelligence,
  endurance,
  missedDays,
  isLevelUp,
  isLevelDown,
}) => {
  return (
    <div
      className={`status-box ${isLevelUp ? 'level-up-effect' : ''} ${
        isLevelDown ? 'level-down-effect' : ''
      }`}
    >
      <h3>ステータス</h3>
      <p>レベル: {level}</p>
      <p>HP: {hp}</p>
      <p>MP: {mp}</p>
      <p>力: {strength}</p>
      <p>知力: {intelligence}</p>
      <p>耐久: {endurance}</p>
    </div>
  );
};

StatusBox.propTypes = {
  level: PropTypes.number.isRequired, // レベル（必須）
  hp: PropTypes.number.isRequired, // HP（必須）
  mp: PropTypes.number.isRequired, // MP（必須）
  strength: PropTypes.number.isRequired, // 力（必須）
  intelligence: PropTypes.number.isRequired, // 知力（必須）
  endurance: PropTypes.number.isRequired, // 耐久（必須）
  missedDays: PropTypes.number.isRequired, // 怠業日数（必須）
  isLevelUp: PropTypes.bool, // レベルアップエフェクトのフラグ（オプション）
  isLevelDown: PropTypes.bool, // レベルダウンエフェクトのフラグ（オプション）
};

StatusBox.defaultProps = {
  isLevelUp: false, // デフォルトではレベルアップエフェクトなし
  isLevelDown: false, // デフォルトではレベルダウンエフェクトなし
};

export default StatusBox;
