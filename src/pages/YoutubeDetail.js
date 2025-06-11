import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import FullpageLayout from '../layouts/FullpageLayout';
import BoardDetail from '../components/board/BoardDetail';
import { fetchYoutubeVideos } from '../services/youtubeService';

const YoutubeDetail = () => {
  const { id } = useParams(); // eslint-disable-line no-unused-vars
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadVideos = async () => {
      try {
        const data = await fetchYoutubeVideos();
        setVideos(data);
        setLoading(false);
      } catch (err) {
        setError('비디오를 불러오는 중 오류가 발생했습니다.');
        setLoading(false);
      }
    };

    loadVideos();
  }, []);

  if (loading) return (
    <FullpageLayout>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Box>
    </FullpageLayout>
  );

  if (error) return (
    <FullpageLayout>
      <Box sx={{ mt: 10, mb: 10, textAlign: 'center', color: 'error.main' }}>
        {error}
      </Box>
    </FullpageLayout>
  );

  return (
    <FullpageLayout>
      <BoardDetail
        data={videos}
        showYoutube
      />
    </FullpageLayout>
  );
};

export default YoutubeDetail;