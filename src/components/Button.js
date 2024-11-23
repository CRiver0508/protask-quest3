import React from 'react';
import PropTypes from 'prop-types';
import './Button.css'; // CSSファイルのインポート

/**
 * 汎用ボタンコンポーネント
 * @param {string} label - ボタンに表示するラベル
 * @param {function} onClick - ボタンをクリックした際に実行する関数
 * @param {boolean} disabled - ボタンを無効化するかどうか
 * @param {string} className - カスタムCSSクラス
 */
const Button = ({ label, onClick, disabled, className }) => {
  return (
    <button
      className={`custom-button ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string.isRequired, // ボタンに表示するラベル（必須）
  onClick: PropTypes.func.isRequired, // ボタンをクリックした際の動作（必須）
  disabled: PropTypes.bool, // ボタンの無効化状態（オプション）
  className: PropTypes.string, // カスタムCSSクラス名（オプション）
};

Button.defaultProps = {
  disabled: false, // デフォルトでは有効
  className: '', // デフォルトではカスタムクラスなし
};

export default Button;
