import React, { useState, useEffect, useContext, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Box, ButtonGroup, Button, styled } from '@mui/material';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import GradingOutlinedIcon from '@mui/icons-material/GradingOutlined';
import LibraryAddCheckOutlinedIcon from '@mui/icons-material/LibraryAddCheckOutlined';
import MapsHomeWorkOutlinedIcon from '@mui/icons-material/MapsHomeWorkOutlined';
import DefaultLayout from '../layouts/DefaultLayout';
import RecentPosts from '../components/board/RecentPosts';
import Banner from '../components/ui/Banner';
import RealEstateInfo from '../components/content/RealEstateInfo';
import ProgressCard from "../components/content/ProgressCard";
import LocalSaleRecommend from '../components/localsale/LocalSaleRecommend';
import NoticeData from '../data/NoticeData.json';
import NewsData from '../data/NewsData.json';
import SaleData from '../data/SaleData.json';
import ScheduleData from '../data/ScheduleData.json';
import LocalSaleData from '../data/LocalSaleData.json';
import { AuthContext } from '../context/AuthContext';
import { fetchYoutubeVideos } from '../services/youtubeService';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useAsync } from '../hooks/useAsync';

// Button 스타일 정의, active 클래스에 따른 스타일 지정
const UserChoiceButton = styled(Button)(({ theme }) => ({
  color: (theme.vars || theme).palette.text.secondary,
  borderColor: '#d0d0d0',
  backgroundColor: '#f8f8f8',
  '&.active': {
    color: 'white',
    borderColor: (theme.vars || theme).palette.text.primary,
    backgroundColor: (theme.vars || theme).palette.text.primary,
  }
}));

const MainButton = styled(Button)({
  width: '100%',
  flexDirection: 'column', 
  alignItems: 'center', 
  justifyContent: 'center', 
  padding: '0.5rem 0',
  fontWeight: '500',
  '& > svg': {
    margin: '.25rem 0', 
    fontSize: '1.875rem'
  }
});

const Main = () => {
  const { user } = useContext(AuthContext);
  const [activeButton, setActiveButton] = useLocalStorage('activeButton', 'userType1');
  
  // YouTube 데이터 비동기 처리
  const { data: youtubeData, loading: youtubeLoading, error: youtubeError, execute: loadYoutubeVideos } = useAsync(fetchYoutubeVideos);

  // 로그인한 유저가 있으면 user.type, 없으면 localStorage 또는 기본값
  const getInitialActiveButton = useCallback(() => {
    if (user && user.type) return user.type;
    return activeButton || 'userType1';
  }, [user, activeButton]);

  // 유저 변경시 activeButton을 동기화
  useEffect(() => {
    if (user && user.type) {
      setActiveButton(user.type);
    }
  }, [user, setActiveButton]);

  // 버튼 클릭 이벤트 핸들러
  const handleButtonClick = useCallback((role) => {
    setActiveButton(role);
  }, [setActiveButton]);

  // YouTube 데이터 로드
  useEffect(() => {
    loadYoutubeVideos();
  }, [loadYoutubeVideos]);

  // 메모이제이션된 컴포넌트들
  const userChoiceButtons = useMemo(() => (
    <ButtonGroup variant="outlined" fullWidth>
      <UserChoiceButton
        onClick={() => handleButtonClick('userType1')}
        className={activeButton === 'userType1' ? 'active' : ''}
      >임차인</UserChoiceButton>
      <UserChoiceButton
        onClick={() => handleButtonClick('userType2')}
        className={activeButton === 'userType2' ? 'active' : ''}
      >임대인</UserChoiceButton>
      <UserChoiceButton
        onClick={() => handleButtonClick('userType3')}
        className={activeButton === 'userType3' ? 'active' : ''}
      >부동산중개인</UserChoiceButton>
    </ButtonGroup>
  ), [activeButton, handleButtonClick]);

  const mainButtons = useMemo(() => (
    <Box sx={{ display: 'flex', gap: 1 }}>
      <MainButton variant="outlined"><GradingOutlinedIcon />전세계약작성</MainButton>
      <MainButton variant="outlined" component={Link} to='/market-price'><MapOutlinedIcon />주변시세</MainButton>
      {activeButton === 'userType1' && (
        <MainButton variant="outlined" component={Link} to='/safety-check-list'><LibraryAddCheckOutlinedIcon />전세안전체크</MainButton>
      )}
      {activeButton === 'userType2' && (
        <MainButton variant="outlined" component={Link} to='/sale-request'><MapsHomeWorkOutlinedIcon />매물등록요청</MainButton>
      )}
    </Box>
  ), [activeButton]);

  const userSpecificContent = useMemo(() => {
    switch (activeButton) {
      case 'userType1':
        return (
          <Box mb={5}>
            <ProgressCard
              date="2024년 11월 24일"
              message="등기부등본 변경"
              targetProgress={85}
            />
          </Box>
        );
      case 'userType2':
        return (
          <Box mb={5}>
            <RealEstateInfo />
          </Box>
        );
      case 'userType3':
        return (
          <>
            <Box mb={5}>
              <RecentPosts
                title="매물요청 현황"
                link="/sale-list"
                detailLink="/sale-detail"
                data={SaleData}
                type="sale"
              />
            </Box>
            <Box mt={5} mb={5}>
              <RecentPosts
                title="일정"
                link="/schedule-list"
                detailLink="/schedule-detail"
                data={ScheduleData}
                type="schedule"
              />
            </Box>
          </>
        );
      default:
        return null;
    }
  }, [activeButton]);

  return (
    <DefaultLayout>
      <Box mb={5}>
        {userChoiceButtons}
      </Box>

      {userSpecificContent}

      <Box mb={2.5}>
        {mainButtons}
      </Box>

      <Box mb={5}>
        <Banner />
      </Box>

      <Box mb={5}>
        <LocalSaleRecommend 
          title="지역매물 추천"
          link="/local-sale-list"
          detailLink="/local-sale-detail"
          data={LocalSaleData}
        />
      </Box>
            
      <Box mb={5}>
        <RecentPosts
          title="공지사항"
          link="/notice-list"
          detailLink="/notice-detail"
          data={NoticeData}
          type="default"
        />
      </Box>
      <Box mb={5}>
        <RecentPosts
          title="유튜브"
          link="/youtube-list"
          detailLink="/youtube-detail"
          data={youtubeData || []}
          type="youtube"
          loading={youtubeLoading}
          error={youtubeError}
        />
      </Box>
      <Box mb={5}>
        <RecentPosts
          title="뉴스"
          link="/news-list"
          detailLink="/news-detail"
          data={NewsData}
          type="default"
        />
      </Box>
    </DefaultLayout>
  );
};

export default React.memo(Main);