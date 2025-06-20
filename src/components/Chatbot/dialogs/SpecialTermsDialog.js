import React, { useState, useEffect, useCallback } from 'react';
import { Box, Typography, Tabs, Tab, TextField, Button, CircularProgress, Badge } from '@mui/material';
import FullpageDialog from '../../ui/FullpageDialog';
import TabPanel from './terms/TabPanel';
import TermCard from './terms/TermCard';
import allTermsData from './terms/TermsData.json'; 
import AddRoundedIcon from '@mui/icons-material/AddRounded';

const fetchTermsData = (type, page = 0, pageSize = 5, query = '') => {
  return new Promise(resolve => {
    setTimeout(() => {
      let dataToProcess = [...allTermsData]; // 원본 데이터 복사

      if (type === 'popular') {
        // 'popular' 탭인 경우 choice가 많은 순서대로 정렬
        dataToProcess.sort((a, b) => b.choice - a.choice);
      } else if (type === 'ai' && query) {
        // 'ai' 탭인 경우 쿼리에 따라 필터링 (예시: text에 쿼리가 포함된 경우)
        // 실제 AI 추천 로직은 여기에 구현되어야 합니다.
        dataToProcess = dataToProcess.filter(term =>
          term.text.includes(query)
        );
      }
      // 'basic' 탭은 기본 정렬 (ID 기준) 또는 정렬 없음

      const start = page * pageSize;
      const end = start + pageSize;
      const pagedData = dataToProcess.slice(start, end);

      resolve({
        data: pagedData,
        hasMore: end < dataToProcess.length,
      });
    }, 300); // 로딩 시간을 약간 줄여 반응성 향상
  });
};

const SpecialTermsDialog = ({ open, onClose, onSubmit }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedTerms, setSelectedTerms] = useState([]);

  // 각 탭별 데이터 및 상태
  const [terms, setTerms] = useState({ basic: [], popular: [], ai: [] });
  const [pages, setPages] = useState({ basic: 0, popular: 0, ai: 0 });
  const [hasMore, setHasMore] = useState({ basic: true, popular: true, ai: true });
  const [loading, setLoading] = useState(false);

  // 직접 입력 및 AI 추천 입력 상태
  const [directInput, setDirectInput] = useState('');
  const [aiInput, setAiInput] = useState('');

  // loadMoreTerms 함수를 useCallback으로 감싸 성능 최적화
  const loadMoreTerms = useCallback(async (type, query = '') => {
    if (loading || !hasMore[type]) return;
    setLoading(true);
    const pageToLoad = pages[type];
    
    // fetchTermsData 호출
    const response = await fetchTermsData(type, pageToLoad, 5, query);
    
    setTerms(prev => ({ ...prev, [type]: [...prev[type], ...response.data] }));
    setPages(prev => ({ ...prev, [type]: pageToLoad + 1 }));
    setHasMore(prev => ({ ...prev, [type]: response.hasMore }));
    setLoading(false);
  }, [loading, pages, hasMore, terms]); // 의존성 배열 추가
  
  // 첫 탭 로딩
  useEffect(() => {
    if (open) { // 다이얼로그가 열릴 때만 로딩
      if (activeTab === 0 && terms.basic.length === 0) {
        loadMoreTerms('basic');
      } else if (activeTab === 1 && terms.popular.length === 0) {
        loadMoreTerms('popular');
      }
    }
  }, [activeTab, open, terms.basic.length, terms.popular.length, loadMoreTerms]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    // 탭 변경 시 해당 탭의 데이터가 없으면 로딩 시작
    if (newValue === 0 && terms.basic.length === 0) loadMoreTerms('basic');
    if (newValue === 1 && terms.popular.length === 0) loadMoreTerms('popular');
  };

  const handleToggleTerm = (term) => {
    setSelectedTerms(prev =>
      prev.some(t => t.id === term.id)
        ? prev.filter(t => t.id !== term.id)
        : [...prev, term]
    );
  };
  
  const handleDeleteTerm = (termId) => {
    setSelectedTerms(prev => prev.filter(t => t.id !== termId));
  };

  const handleAddDirectTerm = () => {
    if (!directInput.trim()) return;
    // 직접 입력하는 특약사항은 ID 충돌을 피하기 위해 고유한 ID 생성
    const newTerm = { id: `direct-${Date.now()}`, text: directInput.trim() };
    setSelectedTerms(prev => [...prev, newTerm]);
    setDirectInput('');
  };

  const handleAiRecommend = () => {
    // AI 탭의 데이터와 페이지 상태 초기화 후 다시 로드
    setTerms(prev => ({ ...prev, ai: [] }));
    setPages(prev => ({ ...prev, ai: 0 }));
    setHasMore(prev => ({ ...prev, ai: true }));
    loadMoreTerms('ai', aiInput); // 입력된 쿼리와 함께 호출
  };

  const handleSubmit = () => {
    // 선택된 특약사항들을 최종적으로 부모 컴포넌트로 전달
    onSubmit(selectedTerms);
  };

  const renderTermList = (type) => (
    <>
      {terms[type].length > 0 ? (
        terms[type].map(term => (
          <TermCard
            key={term.id}
            term={term}
            isSelected={selectedTerms.some(t => t.id === term.id)}
            onToggle={handleToggleTerm}
          />
        ))
      ) : (
        // 데이터가 없는 경우만 표시 (로딩 중이 아닐 때)
        !loading && <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 10, mb: 10 }}>{
          type === 'ai' && aiInput ? '추천 결과가 없습니다.' : '목록이 없습니다.'
        }</Typography>
      )}
      {loading && <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}><CircularProgress /></Box>}
      {hasMore[type] && terms[type].length > 0 ? (
        <Button fullWidth variant="text"  onClick={() => loadMoreTerms(type, type === 'ai' ? aiInput : '')} disabled={loading} sx={{ mt: 4 }}><AddRoundedIcon sx={{ fontSize: '1rem' }} />더보기</Button>
      ) : (
        // 더보기 버튼 대신 메시지 표시 (로딩 중이 아닐 때)
        !loading && terms[type].length > 0 && <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 4 }}>더 이상 없습니다.</Typography>
      )}
    </>
  );

  return (
    <FullpageDialog open={open} onClose={onClose} title="특약사항 선택" paperClassName="wide-dialog-paper"
      btn1="선택 완료" onClick1={handleSubmit} btn2="취소" onClick2={onClose}>
      
      <Box sx={{ margin: '-24px -16px' }}>
        <Box sx={{ position: 'fixed', width: '100%', borderBottom: 1, borderColor: 'divider', backgroundColor: '#ffffff', zIndex: 9 }}>
          <Tabs value={activeTab} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
            <Tab label="기본추천" />
            <Tab label="많은회원선택" />
            <Tab label="AI추천" />
            <Tab label="직접입력" />
            <Tab label={
              <Badge color="primary" badgeContent={selectedTerms.length} invisible={selectedTerms.length === 0}>
                선택된 특약사항
              </Badge>
            } />
          </Tabs>
        </Box>

        <TabPanel value={activeTab} index={0}>{renderTermList('basic')}</TabPanel>
        <TabPanel value={activeTab} index={1}>{renderTermList('popular')}</TabPanel>
        <TabPanel value={activeTab} index={2}>
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <TextField fullWidth placeholder="원하는 특약사항의 키워드를 입력하세요" value={aiInput} onChange={e => setAiInput(e.target.value)} size="small" />
            <Button variant="contained" onClick={handleAiRecommend}>추천</Button>
          </Box>
          {renderTermList('ai')}
        </TabPanel>
        <TabPanel value={activeTab} index={3}>
          <TextField fullWidth multiline rows={4} placeholder="특약사항을 직접 입력하세요" value={directInput} onChange={e => setDirectInput(e.target.value)}/>
          <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={handleAddDirectTerm}>추가하기</Button>
        </TabPanel>
        <TabPanel value={activeTab} index={4}>
          {selectedTerms.length > 0 ? (
            selectedTerms.map(term => (
              <TermCard key={term.id} term={term} type="delete" onDelete={handleDeleteTerm} />
            ))
          ) : (
            <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 10, mb: 10 }}>선택된 특약사항이 없습니다.</Typography>
          )}
        </TabPanel>
      </Box>
    </FullpageDialog>
  );
};

export default SpecialTermsDialog;
