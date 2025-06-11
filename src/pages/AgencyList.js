import React, { useEffect, useState } from 'react';
import { fetchAgencyList } from '../services/agencyService';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, CircularProgress, Box
} from '@mui/material';

const AgencyList = () => {
  const [agencyList, setAgencyList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchAgencyList();
        setAgencyList(data);
      } catch (err) {
        // [수정] 에러 문자열이 아닌, 에러 객체 자체를 저장합니다.
        setError(err);
      } finally {
        // [개선] try/catch 어느 쪽이든 항상 실행되는 finally 블록으로 로딩 상태를 관리합니다.
        setLoading(false);
      }
    };
    loadData();
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 실행합니다.

  // [개선] 로딩 중일 때 중앙에 로딩 스피너를 표시하여 UX를 개선합니다.
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  // [수정] 에러 객체의 message 속성을 참조하여 구체적인 에러 내용을 표시합니다.
  if (error) {
    return (
      <Typography color="error" align="center" sx={{ mt: 4 }}>
        에러: 데이터를 불러오는 데 실패했습니다. ({error.message})
      </Typography>
    );
  }
  
  // 데이터가 없을 경우 메시지를 중앙에 표시합니다.
  if (!agencyList.length) {
    return (
      <Typography align="center" sx={{ mt: 4 }}>
        데이터가 없습니다.
      </Typography>
    );
  }

  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Typography variant="h5" sx={{ m: 2 }}>
        서울시 부동산 중개업소 목록
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>중개업소명</TableCell>
            <TableCell>대표명</TableCell>
            <TableCell>소재지</TableCell>
            <TableCell>전화번호</TableCell>
            <TableCell>중개업등록번호</TableCell>
            <TableCell>관할</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {agencyList.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.officeName}</TableCell>
              <TableCell>{item.ceoName}</TableCell>
              <TableCell>{item.officeAddress}</TableCell>
              <TableCell>{item.telNumber}</TableCell>
              <TableCell>{item.regNumber}</TableCell>
              <TableCell>{item.orgName}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default AgencyList;
