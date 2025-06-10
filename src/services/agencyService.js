// /services/agencyService.js
import axios from 'axios';
import { parseStringPromise } from 'xml2js';

// 6e4d6378686d6172313139754759525a
const API_KEY = process.env.REACT_APP_DATA_SEOUL_API_KEY;

// 실제 API 엔드포인트와 인증키(서비스키)는 환경변수 등으로 관리하세요.
const API_URL = `https://openapi.seoul.go.kr:8088/${API_KEY}/xml/RealtimeCityAir/1/1000`;

export async function fetchAgencyList() {
  try {
    const response = await axios.get(API_URL, {
      // 필요시 params, headers 등 추가
    });

    // XML → JSON 변환 (xml2js는 비동기 Promise 기반)
    const jsonData = await parseStringPromise(response.data, {
      explicitArray: false, // 배열이 아닌 경우 단일 객체로 변환
      trim: true,           // 문자열 트림
      mergeAttrs: true      // 속성을 부모에 병합
    });

    // 실제 데이터 구조에 따라 경로 조정 필요
    // 예: jsonData.ServiceResult.row
    return jsonData;
  } catch (error) {
    throw error;
  }
}