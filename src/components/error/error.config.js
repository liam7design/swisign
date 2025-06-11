import React from 'react';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import BuildCircleOutlinedIcon from '@mui/icons-material/BuildCircleOutlined';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';

export const errorConfig = {
  '404': {
    icon: <ErrorOutlineOutlinedIcon />,
    iconColor: 'primary',
    title: '페이지를 찾을 수 없습니다.',
    message: '페이지가 존재하지 않거나, 사용할 수 없는 페이지 입니다. 입력하신 주소가 정확한지 다시 확인해 주세요.',
    // 버튼 prop을 생략하면 ErrorPage의 기본 동작(메인, 이전페이지)을 따릅니다.
  },
  '500': {
    icon: <ReportProblemOutlinedIcon />,
    iconColor: 'error',
    title: '서버에 문제가 발생했습니다.',
    message: '서비스 이용에 불편을 드려 죄송합니다. 잠시 후 다시 시도해주시거나, 문제가 지속될 경우 관리자에게 문의해주세요.',
    onClick1: () => window.location.reload(),
    btn1: '새로고침',
    onClick2: () => window.location.href = '/',
    btn2: '메인으로',
  },
  auth: {
    icon: <AdminPanelSettingsOutlinedIcon />,
    iconColor: 'warning',
    title: '접근 권한이 없습니다.',
    message: '이 페이지에 접근할 수 있는 권한이 없습니다. 계정을 확인하시거나 관리자에게 문의하세요.',
  },
  maintenance: {
    icon: <BuildCircleOutlinedIcon />,
    iconColor: 'info',
    title: '서비스 점검 중입니다.',
    message: '보다 나은 서비스 제공을 위해 점검을 진행하고 있습니다. 잠시만 기다려주세요.',
    onClick1: () => window.location.href = '/',
    btn1: '메인으로',
    onClick2: false, // 이전 페이지 버튼 숨기기
  },
  preparation: {
    icon: <EventAvailableOutlinedIcon />,
    iconColor: 'success',
    title: '오픈 진행 중입니다.',
    message: '서비스 이용에 불편을 드려서 죄송합니다. 빠른 시간 내 오픈하여 사용에 불편함이 없도록 하겠습니다.',
    // 버튼 prop을 생략하면 ErrorPage의 기본 동작(메인, 이전페이지)을 따릅니다.
  },
  // 필요에 따라 새로운 에러 케이스를 여기에 추가하면 됩니다.
};
