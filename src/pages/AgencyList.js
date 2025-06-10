import React, { useEffect, useState } from 'react';
import { fetchAgencyList } from '../services/agencyService';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, CircularProgress
} from '@mui/material';

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
        // landBizInfo.row 배열 추출
        const rows = data.landBizInfo?.row || [];
        setAgencyList(Array.isArray(rows) ? rows : [rows]);
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
            <TableCell>중개업소명</TableCell>
            <TableCell>대표명</TableCell>
            <TableCell>소재지</TableCell>
            <TableCell>전화번호</TableCell>
            <TableCell>중개업등록번호</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {agencyList.map((item, idx) => (
            <TableRow key={idx}>
              <TableCell>{item.BZMN_CONM}</TableCell>
              <TableCell>{item.MDT_BSNS_NM}</TableCell>
              <TableCell>{item.ADDR}</TableCell>
              <TableCell>{item.TELNO}</TableCell>
              <TableCell>{item.REST_BRKR_INFO}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
