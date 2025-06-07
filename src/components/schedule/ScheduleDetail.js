import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Box, Stack, Typography, Button, Chip, Card, styled } from '@mui/material';
import { grey } from '@mui/material/colors';
import ErrorIcon from '@mui/icons-material/Error';
import MemoCard from './MemoCard';
import { useMemoContext } from '../../context/MemoContext';

const GuideMsg = styled(Card)(({ theme }) => ({
  display: 'flex',
  gap: '0.5rem',
  padding: '0.75rem',
  wordBreak: 'keep-all',
  color: grey[700],
  borderColor: grey[200],
  backgroundColor: grey[100],
}));

const ScheduleDetail = ({ data }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const detailItem = data.find(item => item.id === parseInt(id));
  const { memos, editMemo, deleteMemo } = useMemoContext(); // eslint-disable-line no-unused-vars
  const memoList = memos[id] || [];
  
  return (
    <>
      <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between',  gap: 1, mb: 4 }}>
        <Typography sx={{ fontSize: '1rem', fontWeight: 'medium' }}>
          {detailItem.date}&nbsp;&nbsp;{detailItem.time}
        </Typography>
        <Chip size="small" color="primary" label={detailItem.content} sx={{ borderRadius: '0.25rem' }} />
      </Stack>
      <Box sx={{ mb: 4 }}>
        {memoList.length < 3 ? (
          <Button
            variant="outlined"
            component={Link}
            to={`/schedule-detail/${detailItem.id}/write`}
            fullWidth
          >
            메모 작성
          </Button>
        ) : (
          <GuideMsg variant="outlined" sx={{ mb: 2 }}>
            <ErrorIcon fontSize="small" />
            <Typography variant="body2">메모 작성는 최대 3개까지 가능합니다.</Typography>
          </GuideMsg>
        )}
      </Box>
      <Stack spacing={2}>
        {memoList.map((memo, idx) => (
          <MemoCard
            key={idx}
            date={memo.date}
            time={memo.time}
            content={memo.content}
            onEdit={() => navigate(`/schedule-detail/${id}/write?edit=1&memoIdx=${idx}`)}
            onDelete={() => deleteMemo(id, idx)}
          />
        ))}
      </Stack>
    </>
  );
};

export default ScheduleDetail;