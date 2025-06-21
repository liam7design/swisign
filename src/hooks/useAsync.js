import { useState, useCallback } from 'react';

/**
 * 비동기 작업 상태 관리를 위한 커스텀 훅
 * @param {Function} asyncFunction - 실행할 비동기 함수
 * @param {boolean} immediate - 컴포넌트 마운트 시 즉시 실행할지 여부
 * @returns {Object} { data, loading, error, execute }
 */
export const useAsync = (asyncFunction, immediate = false) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (...params) => {
    try {
      setLoading(true);
      setError(null);
      const result = await asyncFunction(...params);
      setData(result);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [asyncFunction]);

  const reset = useCallback(() => {
    setData(null);
    setLoading(false);
    setError(null);
  }, []);

  return { data, loading, error, execute, reset };
}; 