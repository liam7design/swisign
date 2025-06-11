import React from 'react';
import AppErrorPage from '../components/error';

const Error = () => {
  return (
    <>
      {/* 404 Not Found 에러 */}
      <AppErrorPage type="404" />
      {/* 500 Internal Server 에러 */}
      <AppErrorPage type="500" />
      {/* 권한 없음 에러 */}
      <AppErrorPage type="auth" />
      {/* 서비스 점검 */}
      <AppErrorPage type="maintenance" />
      {/* 오픈 준비중 */}
      <AppErrorPage type="preparation" />
    </>
  )
}

export default Error;