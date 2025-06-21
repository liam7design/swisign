import React, { useState, useCallback, useMemo } from 'react';
import { Box, List, ListItem, ListItemText, CircularProgress, Typography } from '@mui/material';
import { useInView } from 'react-intersection-observer';

/**
 * 성능 최적화된 리스트 컴포넌트
 * 가상화, 지연 로딩, 메모이제이션을 포함
 */
const OptimizedList = ({ 
  data = [], 
  renderItem, 
  loading = false, 
  error = null,
  emptyMessage = "데이터가 없습니다.",
  loadingMessage = "로딩 중...",
  errorMessage = "오류가 발생했습니다.",
  onLoadMore,
  hasMore = false,
  threshold = 0.1
}) => {
  const [visibleItems, setVisibleItems] = useState(10);
  
  // 무한 스크롤을 위한 Intersection Observer
  const { ref: loadMoreRef, inView } = useInView({
    threshold,
    triggerOnce: false
  });

  // 더 많은 아이템 로드
  const loadMore = useCallback(() => {
    if (hasMore && !loading) {
      setVisibleItems(prev => Math.min(prev + 10, data.length));
      onLoadMore?.();
    }
  }, [hasMore, loading, data.length, onLoadMore]);

  // 무한 스크롤 처리
  React.useEffect(() => {
    if (inView) {
      loadMore();
    }
  }, [inView, loadMore]);

  // 메모이제이션된 아이템들
  const renderedItems = useMemo(() => {
    return data.slice(0, visibleItems).map((item, index) => (
      <React.Fragment key={item.id || index}>
        {renderItem(item, index)}
      </React.Fragment>
    ));
  }, [data, visibleItems, renderItem]);

  // 로딩 상태
  if (loading && data.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <Box sx={{ textAlign: 'center', p: 4 }}>
        <Typography color="error" variant="body1">
          {errorMessage}
        </Typography>
      </Box>
    );
  }

  // 빈 상태
  if (data.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', p: 4 }}>
        <Typography color="text.secondary" variant="body1">
          {emptyMessage}
        </Typography>
      </Box>
    );
  }

  return (
    <List>
      {renderedItems}
      
      {/* 더보기 로딩 인디케이터 */}
      {hasMore && (
        <ListItem ref={loadMoreRef} sx={{ justifyContent: 'center' }}>
          {loading ? (
            <CircularProgress size={24} />
          ) : (
            <Typography variant="body2" color="text.secondary">
              더 많은 항목을 불러오는 중...
            </Typography>
          )}
        </ListItem>
      )}
    </List>
  );
};

export default React.memo(OptimizedList); 