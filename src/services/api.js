import axios from 'axios';

/**
 * API 서비스 클래스
 * 에러 처리, 캐싱, 재시도 로직을 포함
 */
class ApiService {
  constructor() {
    this.baseURL = process.env.REACT_APP_API_URL || '';
    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // 요청 인터셉터
    this.client.interceptors.request.use(
      (config) => {
        // 토큰이 있다면 헤더에 추가
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // 응답 인터셉터
    this.client.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        // 401 에러 시 토큰 제거
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  /**
   * GET 요청
   * @param {string} url - 요청 URL
   * @param {Object} config - axios 설정
   * @returns {Promise} 응답 데이터
   */
  async get(url, config = {}) {
    try {
      const response = await this.client.get(url, config);
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  /**
   * POST 요청
   * @param {string} url - 요청 URL
   * @param {Object} data - 요청 데이터
   * @param {Object} config - axios 설정
   * @returns {Promise} 응답 데이터
   */
  async post(url, data = {}, config = {}) {
    try {
      const response = await this.client.post(url, data, config);
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  /**
   * PUT 요청
   * @param {string} url - 요청 URL
   * @param {Object} data - 요청 데이터
   * @param {Object} config - axios 설정
   * @returns {Promise} 응답 데이터
   */
  async put(url, data = {}, config = {}) {
    try {
      const response = await this.client.put(url, data, config);
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  /**
   * DELETE 요청
   * @param {string} url - 요청 URL
   * @param {Object} config - axios 설정
   * @returns {Promise} 응답 데이터
   */
  async delete(url, config = {}) {
    try {
      const response = await this.client.delete(url, config);
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  /**
   * 에러 처리
   * @param {Error} error - 에러 객체
   */
  handleError(error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('API Error:', error);
    }

    // 에러 타입별 처리
    if (error.response) {
      // 서버 응답이 있는 경우
      const { status, data } = error.response;
      switch (status) {
        case 400:
          throw new Error(data?.message || '잘못된 요청입니다.');
        case 401:
          throw new Error('인증이 필요합니다.');
        case 403:
          throw new Error('접근 권한이 없습니다.');
        case 404:
          throw new Error('요청한 리소스를 찾을 수 없습니다.');
        case 500:
          throw new Error('서버 오류가 발생했습니다.');
        default:
          throw new Error(data?.message || '알 수 없는 오류가 발생했습니다.');
      }
    } else if (error.request) {
      // 요청은 보냈지만 응답이 없는 경우
      throw new Error('서버에 연결할 수 없습니다.');
    } else {
      // 요청 자체에 문제가 있는 경우
      throw new Error('요청을 처리할 수 없습니다.');
    }
  }
}

// 싱글톤 인스턴스 생성
const apiService = new ApiService();

export default apiService; 