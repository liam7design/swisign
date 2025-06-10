import axios from 'axios';

// 환경변수 등으로 API_KEY를 관리하세요.
const API_KEY = process.env.REACT_APP_SEOUL_API_KEY; // 예시 6e4d6378686d6172313139754759525a
const API_URL = `http://openapi.seoul.go.kr:8088/${API_KEY}/json/landBizInfo/1/1000/`;

export const fetchAgencyList = async () => {
  try {
    const response = await axios.get(API_URL);
    // landBizInfo.row에 데이터 배열이 있습니다.
    return response.data;
  } catch (error) {
    throw error;
  }
}
