// 각 페이지의 경로에 따른 타이틀을 반환하는 함수
const getTitle = (pathname) => {
  switch (true) {
    case pathname === '/':
      return 'SWISIGN';
    case pathname === '/MapList':
      return '지도목록';
    case pathname.startsWith('/MapView'):
      return '지도상세';
    case pathname === '/AddressList':
      return '등록된 주소 보기';
    case pathname === '/AddressReg':
      return '주소등록';
    case pathname === '/SafetyCheckList':
      return '전세안전체크';
    case pathname === '/MarketPrice':
      return '주변 시세보기';
    case pathname === '/MapSearch':
      return '지도 검색';
    case pathname === '/ChangeInfoList':
      return '주요 변동정보';
    case pathname === '/NoticeList':
      return '공지사항';
    case pathname.startsWith('/NoticeDetail'):
      return '공지사항 상세';
    case pathname === '/YoutubeList':
      return '유튜브';
    case pathname.startsWith('/YoutubeDetail'):
      return '유튜브 상세';
    case pathname === '/NewsList':
      return '뉴스';
    case pathname.startsWith('/NewsDetail'):
      return '뉴스 상세';
    case pathname === '/SaleRequest':
      return '매물등록 요청';
    case pathname === '/SaleList':
      return '매물요청 현황';
    case pathname.startsWith('/SaleDetail'):
      return '매물요청 현황 상세';
    case pathname === '/ScheduleList':
      return '일정 ';
    case pathname === '/CertificateCheck':
      return '공인중개사 공제증서 확인';
    case pathname === '/LocalSaleList':
      return '지역매물';
    case pathname.startsWith('/LocalSaleDetail'):
      return '';
    case pathname === '/Settings':
      return '환경설정';
    case pathname === '/LoginManagement':
      return '로그인 관리';
    case pathname === '/PasswordManagement':
      return '비밀번호 변경';
    case pathname === '/PrivacyManagement':
      return '개인정보 변경';
    case pathname === '/RealEstateAgency':
      return '중개인 조회';
    default:
      return 'SWISIGN';
  }
};

export default getTitle;