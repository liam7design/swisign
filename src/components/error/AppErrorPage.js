import React from 'react';
import PropTypes from 'prop-types';
import ErrorPage from './ErrorPage';
import { errorConfig } from './error.config';

/**
 * 에러 유형에 따라 적절한 에러 페이지를 렌더링하는 스마트 컴포넌트
 * @param {object} props
 * @param {string} props.type - 에러 유형 ('404', '500', 'auth' 등). error.config.js의 키와 일치.
 * @param {object} props.rest - ErrorPage의 props를 직접 덮어쓰기 위한 나머지 props
 */
const AppErrorPage = ({ type = '404', ...rest }) => {
  // type에 해당하는 설정을 찾고, 없으면 404 설정을 기본값으로 사용
  const config = errorConfig[type] || errorConfig['404'];

  // 외부에서 전달된 props(rest)로 기존 설정을 덮어쓸 수 있도록 병합
  const finalProps = { ...config, ...rest };

  return <ErrorPage {...finalProps} />;
};

AppErrorPage.propTypes = {
  type: PropTypes.oneOf(Object.keys(errorConfig)),
};

export default AppErrorPage;