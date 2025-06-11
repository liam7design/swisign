import axios from 'axios';

// 환경 변수에서 API 키를 가져옵니다.
const API_KEY = process.env.REACT_APP_SEOUL_API_KEY;
// API 요청을 위한 URL을 구성합니다.
const API_URL = `http://openapi.seoul.go.kr:8088/${API_KEY}/json/landBizInfo/1/1000/`;

/**
 * 서울 열린데이터광장에서 부동산 중개업소 목록을 비동기적으로 가져옵니다.
 * @returns {Promise<Array>} 가공된 중개업소 정보 객체의 배열
 */
export const fetchAgencyList = async () => {
  try {
    const response = await axios.get(API_URL);

    // axios는 응답 데이터를 data 속성에 담아주므로, response.data로 접근합니다.
    return response.data.landBizInfo.row.map((item, index) => ({
      // 프론트엔드에서 사용하기 쉬운 이름으로 속성을 매핑합니다.
      id: index + 1, // 고유 ID가 없으므로 인덱스를 임시 ID로 사용합니다.
      officeName: item.BZMN_CONM,
      regNumber: item.REST_BRKR_INFO,
      officeAddress: item.ADDR,
      telNumber: item.TELNO,
      ceoName: item.MDT_BSNS_NM,
      orgName: item.CGG_CD
    }));
  } catch (error) {
    // API 호출 중 에러 발생 시 콘솔에 오류를 출력하고, 에러를 다시 던져 호출한 쪽에서 처리하도록 합니다.
    console.error('서울 열린데이터광장 API 호출 중 오류 발생:', error);
    throw error;
  }
}
