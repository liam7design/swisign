/**
 * 성능 최적화를 위한 유틸리티 함수들
 */

/**
 * 디바운스 함수
 * @param {Function} func - 실행할 함수
 * @param {number} wait - 대기 시간 (ms)
 * @returns {Function} 디바운스된 함수
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * 쓰로틀 함수
 * @param {Function} func - 실행할 함수
 * @param {number} limit - 제한 시간 (ms)
 * @returns {Function} 쓰로틀된 함수
 */
export const throttle = (func, limit) => {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

/**
 * 깊은 객체 비교
 * @param {Object} obj1 - 첫 번째 객체
 * @param {Object} obj2 - 두 번째 객체
 * @returns {boolean} 동일 여부
 */
export const deepEqual = (obj1, obj2) => {
  if (obj1 === obj2) return true;
  
  if (obj1 == null || obj2 == null) return false;
  
  if (typeof obj1 !== typeof obj2) return false;
  
  if (typeof obj1 !== 'object') return obj1 === obj2;
  
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  
  if (keys1.length !== keys2.length) return false;
  
  for (const key of keys1) {
    if (!keys2.includes(key)) return false;
    if (!deepEqual(obj1[key], obj2[key])) return false;
  }
  
  return true;
};

/**
 * 메모이제이션 래퍼
 * @param {Function} fn - 메모이제이션할 함수
 * @returns {Function} 메모이제이션된 함수
 */
export const memoize = (fn) => {
  const cache = new Map();
  
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
};

/**
 * 성능 측정 래퍼
 * @param {Function} fn - 측정할 함수
 * @param {string} name - 함수 이름
 * @returns {Function} 측정 래퍼가 적용된 함수
 */
export const measurePerformance = (fn, name = 'Function') => {
  return (...args) => {
    const start = performance.now();
    const result = fn.apply(this, args);
    const end = performance.now();
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`${name} 실행 시간: ${(end - start).toFixed(2)}ms`);
    }
    
    return result;
  };
}; 