// 각 페이지의 경로에 따른 타이틀을 반환하는 함수
const getTitle = (pathname) => {
  switch (true) {
    case pathname === '/':
      return 'SWISIGN';
    case pathname === '/map-list':
      return '지도목록';
    case pathname.startsWith('/map-view'):
      return '지도상세';
    case pathname === '/address-list':
      return '등록된 주소 보기';
    case pathname === '/address-reg':
      return '주소등록';
    case pathname === '/safety-check-list':
      return '전세안전체크';
    case pathname === '/market-price':
      return '주변 시세보기';
    case pathname === '/map-search':
      return '지도 검색';
    case pathname === '/change-info-list':
      return '주요 변동정보';
    case pathname === '/notice-list':
      return '공지사항';
    case pathname.startsWith('/notice-detail'):
      return '공지사항 상세';
    case pathname === '/youtube-list':
      return '유튜브';
    case pathname.startsWith('/youtube-detail'):
      return '유튜브 상세';
    case pathname === '/news-list':
      return '뉴스';
    case pathname.startsWith('/news-detail'):
      return '뉴스 상세';
    case pathname === '/sale-request':
      return '매물등록 요청';
    case pathname === '/sale-list':
      return '매물요청 현황';
    case pathname.startsWith('/sale-detail'):
      return '매물요청 현황 상세';
    case pathname === '/schedule-list':
      return '일정 ';
    case pathname === '/certificate-check':
      return '공인중개사 공제증서 확인';
    case pathname === '/local-sale-list':
      return '지역매물';
    case pathname.startsWith('/local-sale-detail'):
      return '';
    case pathname === '/settings':
      return '환경설정';
    case pathname === '/login-management':
      return '로그인 관리';
    case pathname === '/password-management':
      return '비밀번호 변경';
    case pathname === '/privacy-management':
      return '개인정보 변경';
    case pathname === '/real-estate-agency':
      return '중개인 조회';
    default:
      return 'SWISIGN';
  }
};

export default getTitle;