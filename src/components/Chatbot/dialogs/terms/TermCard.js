import React from 'react';
import { Card, CardContent, Typography, Checkbox, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { FormControlLabel } from '@mui/material';

const TermCard = ({ term, type = 'checkbox', isSelected, onToggle, onDelete }) => {
  return (
    <Card variant="outlined" sx={{ mb: 1.5 }}>
      <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', '&:last-child': { pb: 2 } }}>
        {/* 'checkbox' 타입일 경우에만 선택 문구를 표시합니다. */}
        {type === 'checkbox' ? (
          <FormControlLabel
            sx={{ flexGrow: 1, mr: 0 }}
            control={<Checkbox checked={isSelected} onChange={() => onToggle(term)} />}
            label={
              <Box>
                {/* 특약사항 본문 */}
                <Typography variant="body2">{term.text}</Typography>
                {/* 'choice' 수를 활용한 문구 추가 */}
                <Typography variant="caption" color="text.secondary">
                  {term.choice}명의 회원이 선택했어요
                </Typography>
              </Box>
            }
          />
        ) : (
          // 'delete' 타입 등 다른 타입일 경우, 특약사항 본문만 표시
          <Typography variant="body2" sx={{ flexGrow: 1 }}>{term.text}</Typography>
        )}

        {/* 'delete' 타입일 경우 삭제 버튼 표시 */}
        {type === 'delete' && (
          <IconButton edge="end" aria-label="delete" onClick={() => onDelete(term.id)}>
            <DeleteIcon />
          </IconButton>
        )}
      </CardContent>
    </Card>
  );
};

export default TermCard;
