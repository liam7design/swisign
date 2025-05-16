import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Stack, Typography, Chip, TextField } from '@mui/material';
import { FloatingBox, FloatingButton } from '../ui/FloatingButton';
import { useMemoContext } from '../../context/MemoContext';

const ScheduleWrite = ({ data }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const writeItem = data.find(item => item.id === parseInt(id));
  const { addMemo, editMemo, memos } = useMemoContext();
  const [searchParams] = useSearchParams();
  const editMode = searchParams.get('edit') === '1';
  const memoIdx = Number(searchParams.get('memoIdx'));

  const [content, setContent] = useState('');

  // 수정 모드일 때 기존 내용 불러오기
  useEffect(() => {
    if (editMode && memos[id] && memos[id][memoIdx]) {
      setContent(memos[id][memoIdx].content);
    }
  }, [editMode, id, memoIdx, memos]);

  const handleSubmit = () => {
    if (!content) return;
    if (editMode) {
      // 기존 날짜/시간은 그대로 둠
      const oldMemo = memos[id][memoIdx];
      editMemo(id, memoIdx, { ...oldMemo, content });
    } else {
      // 새 메모: 현재 날짜/시간
      const now = new Date();
      addMemo(id, { 
        content,
        date: now.toLocaleDateString('en-CA'), // YYYY-MM-DD
        time: now.toLocaleTimeString('en-GB', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: false 
        })
      });
    }
    navigate(`/ScheduleDetail/${id}`);
  };

  // 최대 3개 제한 (신규 작성만)
  if (!editMode && (memos[id] || []).length >= 3) {
    navigate(`/ScheduleDetail/${id}`);
    return null;
  }

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between',  gap: 1, mb: 4 }}>
        <Typography sx={{ fontSize: '1rem', fontWeight: 'medium' }}>{writeItem.date}&nbsp;&nbsp;{writeItem.time}</Typography>
        <Chip size="small" color="primary"  label={writeItem.content} sx={{ borderRadius: '0.25rem' }} />
      </Stack>
      <TextField
        value={content}
        onChange={e => setContent(e.target.value)}
        fullWidth
        multiline
        minRows={14}
        maxRows={14}
      />
      <FloatingBox>
        <FloatingButton label="취소" onClick={handleBack} />
        <FloatingButton variant="contained" label={editMode ? '수정' : '등록'} onClick={handleSubmit} />
      </FloatingBox>
    </>
  );
};

export default ScheduleWrite;