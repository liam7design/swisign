import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import { QuickReplyButtonBox } from './ChatbotStyle';

/**
 * QuickReplyButton 컴포넌트
 *
 * `replies`와 `onReply` prop이 제공되면 버튼 목록을 렌더링하고,
 * 그렇지 않으면 `children`으로 전달된 커스텀 컴포넌트를 렌더링합니다.
 */
const QuickReplyButton = ({ replies, onReply, children }) => {
  // replies prop이 유효한 배열이고 onReply 함수가 존재하는지 확인
  const hasQuickReplies = Array.isArray(replies) && replies.length > 0 && typeof onReply === 'function';

  return (
    <QuickReplyButtonBox>
      {hasQuickReplies ? (
        // 기존 기능: replies 배열을 기반으로 버튼 렌더링
        replies.map((reply, index) => (
          <Button key={index} variant="outlined" size="small" onClick={() => onReply(reply)}>
            {reply.text}
          </Button>
        ))
      ) : (
        // 업그레이드된 기능: children 렌더링
        children
      )}
    </QuickReplyButtonBox>
  );
};

// Prop 유효성 검사
QuickReplyButton.propTypes = {
  /**
   * 빠른 응답 버튼 생성을 위한 데이터 배열
   * 예: [{ text: '네' }, { text: '아니오' }]
   */
  replies: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
    })
  ),
  /**
   * 빠른 응답 버튼 클릭 시 실행될 콜백 함수
   */
  onReply: PropTypes.func,
  /**
   * replies, onReply가 없을 때 대신 렌더링될 React 노드
   */
  children: PropTypes.node,
};

export default QuickReplyButton;