import React from 'react';
import PropTypes from 'prop-types'; // 型チェックのためのPropTypes

/**
 * Avatarコンポーネント
 * アバター画像と対応するコメントを表示するコンポーネント
 *
 * @param {string} currentAvatar - 表示するアバター画像のパス
 * @param {string} currentComment - 表示するコメント
 */
const Avatar = ({ currentAvatar, currentComment }) => {
  return (
    <div className="avatar-container">
      {/* アバター画像 */}
      <img src={currentAvatar} alt="Current Avatar" className="avatar-image" />
      {/* コメント */}
      <p className="avatar-comment">{currentComment}</p>
    </div>
  );
};

// PropTypesで型をチェック
Avatar.propTypes = {
  currentAvatar: PropTypes.string.isRequired, // アバター画像のパス（必須）
  currentComment: PropTypes.string.isRequired, // アバターコメント（必須）
};

export default Avatar;
