// /pages/AgencyList.js
import React, { useEffect, useState } from 'react';
import { fetchAgencyList } from '../services/agencyService';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, CircularProgress } from '@mui/material';

export default function AgencyList() {
  const [agencyList, setAgencyList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchAgencyList();

        // 실제 데이터 구조에 맞게 row 추출
        // 예시: data.ServiceResult.row
        const rows = data.ServiceResult?.row || [];
        setAgencyList(Array.isArray(rows) ? rows : [rows]); // 단일 객체일 때 배열로 변환
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">에러: {error.message}</Typography>;
  if (!agencyList.length) return <Typography>데이터가 없습니다.</Typography>;

  return (
    <TableContainer component={Paper}>
      <Typography variant="h5" sx={{ m: 2 }}>서울시 부동산 중개업소 목록</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>자치구명</TableCell>
            <TableCell>법정동명</TableCell>
            <TableCell>중개업자명</TableCell>
            <TableCell>사업자상호</TableCell>
            <TableCell>전화번호</TableCell>
            <TableCell>상태구분</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {agencyList.map((item, idx) => (
            <TableRow key={idx}>
              <TableCell>{item.GU_NM}</TableCell>
              <TableCell>{item.LAW_DONG_NM}</TableCell>
              <TableCell>{item.AGENT_NM}</TableCell>
              <TableCell>{item.OFC_NM}</TableCell>
              <TableCell>{item.TELNO}</TableCell>
              <TableCell>{item.STATUS}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
