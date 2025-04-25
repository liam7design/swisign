import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Chip, Divider, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { styled } from '@mui/material/styles';
import LocalSaleData from '../../data/LocalSaleData.json';
import ExpandableBox from '../ui/ExpendableBox';
import Banner from '../ui/Banner';
import { SizeIcon, RoomIcon, ParkingIcon, FloorIcon, DateIcon } from '../../assets/icons/SvgIcons';
import ProfileCard from '../ui/ProfileCard';

// 반응형 4:3 이미지 박스
const ImageBox = styled(Box)(({ theme }) => ({
  position: 'relative',
  aspectRatio: '4 / 3',
  overflow: 'hidden',
  marginBottom: 24,
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  }
}));

const CustomDivider = styled(Divider)(({ theme }) => ({
  margin: '24px 0',
  borderColor: '#f2f2f2'
}));

const Subtitle = styled(Typography)({
  fontSize: '1.125rem',
});

const dummyProfileData = [
  {
    title: '매매 12억 6,000만원',
    avatar: '/images/img_avatar_01.jpg',
    name: '황금 공인중개사',
    sale: 12,
    jeonse: 30,
    monthly: 203,
  },
  {
    title: '전세 6억 2,000만원',
    avatar: '/images/img_avatar_02.jpg',
    name: '행운 공인중개사',
    매매: 5,
    전세: 18,
    월세: 120,
  },
  {
    title: '월세 2,000/85',
    avatar: '/images/img_avatar_03.jpg',
    name: '프리미엄 공인중개사',
    매매: 2,
    전세: 8,
    월세: 45,
  },
];

const LocalSaleDetail = () => {
  const { id } = useParams();
  const CARD_COUNT = dummyProfileData.length;
  const [bookmarks, setBookmarks] = useState(Array(CARD_COUNT).fill(false));
  const [likes, setLikes] = useState(Array(CARD_COUNT).fill(false));
  
  const detailItem = LocalSaleData.items.find(item => item.id === parseInt(id));

  // 제곱미터를 평으로 변환하는 함수 (1평 = 3.305785 ㎡)
  const convertToPyeong = (squareMeter) => {
    if (!squareMeter) return '';
    const pyeong = (parseFloat(squareMeter) / 3.305785).toFixed(0);
    return pyeong;
  };

  if (!detailItem) {
    return <Typography>매물을 찾을 수 없습니다.</Typography>;
  }

  const handleBookmarkToggle = (idx) => {
    setBookmarks(prev => {
      const arr = [...prev];
      arr[idx] = !arr[idx];
      return arr;
    });
  };

  const handleLikeToggle = (idx) => {
    setLikes(prev => {
      const arr = [...prev];
      arr[idx] = !arr[idx];
      return arr;
    });
  };

  return (
    <>
      <ImageBox sx={{ ml: { xs: -2, sm: -3 }, mr: { xs: -2, sm: -3 } }}><img src={detailItem.image} alt={detailItem.detailItemType} /></ImageBox>
      <Box>
        <Typography variant="subtitle2">#대방자이 #신축 #쓰리룸</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, mb: 1 }}>
          <Chip label="등록번호 32349077" size="small" variant="outlined" sx={{ color: 'text.primary', fontWeight: 500, borderRadius: 1 }} />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>21일전</Typography>
        </Box>
        <Typography variant="subtitle1">{detailItem.address}</Typography>
        <Typography variant="h5" sx={{ color:"primary", fontWeight: 700 }}>{detailItem.saleType} {detailItem.price}</Typography>
      </Box>
      <CustomDivider />
      <Box>
        <List sx={{ p: 0 }}>
          <ListItem sx={{ mt: 0.5, p: 0 }}>
            <ListItemIcon sx={{ minWidth: 0, mr: 1.5 }}><SizeIcon stroke="black" /></ListItemIcon>
            <ListItemText primary={ <Typography variant="body1">전용 {detailItem.size} ({`${convertToPyeong(detailItem.size)}평`})</Typography> } />
          </ListItem>
          <ListItem sx={{ mt: 0.5, p: 0 }}>
            <ListItemIcon sx={{ minWidth: 0, mr: 1.5 }}><RoomIcon stroke="black" /></ListItemIcon>
            <ListItemText primary={ <Typography variant="body1">쓰리룸(욕실2개)</Typography> } />
          </ListItem>
          <ListItem sx={{ mt: 0.5, p: 0 }}>
            <ListItemIcon sx={{ minWidth: 0, mr: 1.5 }}><ParkingIcon stroke="black" /></ListItemIcon>
            <ListItemText primary={ <Typography variant="body1">주차 가능</Typography> } />
          </ListItem>
          <ListItem sx={{ mt: 0.5, p: 0 }}>
            <ListItemIcon sx={{ minWidth: 0, mr: 1.5 }}><FloorIcon stroke="black" /></ListItemIcon>
            <ListItemText primary={ <Typography variant="body1">{detailItem.floor}</Typography> } />
          </ListItem>
          <ListItem sx={{ mt: 0.5, p: 0 }}>
            <ListItemIcon sx={{ minWidth: 0, mr: 1.5 }}><DateIcon stroke="black" /></ListItemIcon>
            <ListItemText primary={ <Typography variant="body1">입주일: 2025년 6월 3일</Typography> } />
          </ListItem>
        </List>
      </Box>
      <CustomDivider />
      <Box>
        <Subtitle variant="h6">월 평균 관리비 80,000원</Subtitle>
        <Box sx={{ mt: 1 }}>
          <Typography variant="body2">* 최근 3개월 관리비 평균 금액 기준으로 산정</Typography>
        </Box>
      </Box>
      <CustomDivider />
      <Box>
        <Subtitle variant="h6">대출 가능여부 : 가능</Subtitle>
        <Box sx={{ mt: 1 }}>
          <Banner />
        </Box>
      </Box>
      <CustomDivider />
      <Box>
        <Subtitle variant="h6">상세설명</Subtitle>
        <Box sx={{ mt: 1 }}>
          <ExpandableBox height="142">
            1. 역삼역 초역세권 신축급2룸 다세대주택 (월세 5월말~6월초 입주 협의) <br/>
            * &lt;본 호실은 소유자가 유료주차장의 유지비용을 분담하였기에  주차배정을 받을 수 있는 호실입니다.&gt; <br/>
            2. 초역세권 교통편리. 편의시설 많은  고급주택가 초입 위치. 조용하고 치안좋음(GS ,GFC 직주근접) <br/>
            3. 총20세대. 역삼동에서 새대당 주차편리한 빌라(주차비 월12만원 : 주차 1자리 확보가능) <br/>
            4. 천장형 에어컨(거실1대), 전열교환기(거실), 드럼세탁기, 빌트인 냉장고, 붙박이장, 비데, 중문 풀옵션 <br/>
            5. 실사용평수는 약13평정도이며  등기사항증명서 상의 전요연적에는 서비스확장면적이 제외되어있음 <br/>
            6. 소유자 직접관리체제로 전환하여 청소, 건물공용부분 하자들은 최대한 즉각 처리해줌. <br/>
            7. 주차는 건물지하주차장. 1층 필로티주차장외에 유료주차장과 거주자우선주차장을 대여하여 운영중이며, 인근 월주차비 23만원에 비해 저렴한 12만원에 주차자리가 획보되어 주차 스트레스가 없음. <br/>
            8. 입주민 생활규칙이 있고, 입주민 단톡방이 개설되어 있어 소통이 원할하고, 민원사항이 빨리 해결됨. <br/>
            9. 본 건물은 KT 단체인터넷, TV, 와이파이를 단체로 사용중이며 공동관리비에 포함되어 있음. <br/>
            10. 타통신사 인터넷사용자는 설치는 가능하나 KT셋톱은 세대내 보관해야히며, 관리비도 그대로 납부헤야함. <br/>
            11. 본 중개사가  소유자대표이자 본 건물을 관리하는 대표관리인입니다. <br/>
            12. 본 견물은 에어비앤비 , 파티룸, 종교관련으로 입주하려는 분은 정중히 사양하고 있습니다. <br/>
            13. 입주당시 세탁기. 에어컨  분해청소를 비롯해 전체 청소가 너무 잘된상태로 입주사용중인 호실임. 반려동물은 분양때부터 불가한 집입니다. <br/>
            14. 당일 방문이 직장시간문제로 잘 안될 수 있으며, 사전에  방문예약을 잡아드립니다. <br/>
          </ExpandableBox>
        </Box>
      </Box>
      <CustomDivider />
      <Box>
        <Subtitle variant="h6">{dummyProfileData.length}곳에서 등록되어 있어요.</Subtitle>
        <Box sx={{ mt: 1 }}>
          <ExpandableBox height="188" padding="0" backgroundColor="#ffffff">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {dummyProfileData.map((profile, idx) => (
                <ProfileCard
                  key={idx}
                  title={profile.title}
                  avatar={profile.avatar}
                  name={profile.name}
                  sale={profile.sale}
                  jeonse={profile.jeonse}
                  monthly={profile.monthly}
                  bookmark={bookmarks[idx]}
                  onBookmarkToggle={() => handleBookmarkToggle(idx)}
                  likes={likes[idx]}
                  onLikeToggle={() => handleLikeToggle(idx)}
                />
              ))}
            </Box>
          </ExpandableBox>
        </Box>
      </Box>
    </>
  );
};

export default LocalSaleDetail;