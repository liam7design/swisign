import React, { useState, useEffect, useContext } from 'react';
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
import YoutubeData from '../data/YoutubeData.json';
import NewsData from '../data/NewsData.json';
import SaleData from '../data/SaleData.json';
import ScheduleData from '../data/ScheduleData.json';
import LocalSaleData from '../data/LocalSaleData.json';
import { AuthContext } from '../context/AuthContext';

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

  // 로그인한 유저가 있으면 user.type, 없으면 localStorage 또는 기본값
  const getInitialActiveButton = () => {
    if (user && user.type) return user.type;
    return localStorage.getItem('activeButton') || 'userType1';
  };

  const [activeButton, setActiveButton] = useState(getInitialActiveButton());

  // 유저 변경시 activeButton을 동기화
  useEffect(() => {
    if (user && user.type) {
      setActiveButton(user.type);
      localStorage.setItem('activeButton', user.type);
    }
  }, [user]);

  // 버튼 클릭 이벤트 핸들러
  const handleButtonClick = (role) => {
    setActiveButton(role);
    localStorage.setItem('activeButton', role); // 선택한 버튼을 로컬 스토리지에 저장
  };

  useEffect(() => {
    const savedActiveButton = localStorage.getItem('activeButton');
    if (!user && savedActiveButton) {
      setActiveButton(savedActiveButton); // 로그아웃 등으로 user가 없을 때 localStorage 값 사용
    }
  }, [user]);

  return (
    <DefaultLayout>

      <Box mb={5}>
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
      </Box>

      {activeButton === 'userType1' && (
        <>
          <Box mb={5}>
            <ProgressCard
              date="2024년 11월 24일"
              message="등기부등본 변경"
              targetProgress={85}
            />
          </Box>
        </>
      )}
      {activeButton === 'userType2' && (
        <>
          <Box mb={5}>
            <RealEstateInfo />
          </Box>
        </>
      )}
      {activeButton === 'userType3' && (
        <>
          <Box mb={5}>
            <RecentPosts
              title="매물요청 현황"
              link="/SaleList"
              detailLink="/SaleDetail"
              data={SaleData}
              type="sale"
            />
          </Box>
        </>
      )}

      <Box mb={2.5}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <MainButton variant="outlined"><GradingOutlinedIcon />전세계약작성</MainButton>
          <MainButton variant="outlined" component={Link} to='/MarketPrice'><MapOutlinedIcon />주변시세</MainButton>
          {activeButton === 'userType1' && (
            <MainButton variant="outlined" component={Link} to='/SafetyCheckList'><LibraryAddCheckOutlinedIcon />전세안전체크</MainButton>
          )}
          {activeButton === 'userType2' && (
            <MainButton variant="outlined" component={Link} to='/SaleRequest'><MapsHomeWorkOutlinedIcon />매물등록요청</MainButton>
          )}
        </Box>
      </Box>

      {activeButton === 'userType3' && (
        <>
          <Box mb={5}>
            <RecentPosts
              title="일정"
              link="/ScheduleList"
              detailLink="/ScheduleDetail"
              data={ScheduleData}
              type="schedule"
            />
          </Box>
        </>
      )}

      <Box mb={5}>
        <Banner />
      </Box>

      <Box mb={5}>
        <LocalSaleRecommend 
          title="지역매물 추천"
          link="/LocalSaleList"
          detailLink="/LocalSaleDetail"
          data={LocalSaleData}
        />
      </Box>
            
      <Box mb={5}>
        <RecentPosts
          title="공지사항"
          link="/NoticeList"
          detailLink="/NoticeDetail"
          data={NoticeData}
          type="default"
        />
      </Box>
      <Box mb={5}>
        <RecentPosts
          title="유튜브"
          link="/YoutubeList"
          detailLink="/YoutubeDetail"
          data={YoutubeData}
          type="youtube"
        />
      </Box>
      <Box mb={5}>
        <RecentPosts
          title="뉴스"
          link="/NewsList"
          detailLink="/NewsDetail"
          data={NewsData}
          type="default"
          showSource
        />
      </Box>

    </DefaultLayout>
  )
}

export default Main;