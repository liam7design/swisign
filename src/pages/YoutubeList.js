import React, { useState, useEffect } from 'react';
import { Box, CircularProgress } from '@mui/material';
import SubpageLayout from '../layouts/SubpageLayout';
import BoardList from '../components/board/BoardList';
import { fetchYoutubeVideos } from '../services/youtubeService';

const YoutubeList = () => {
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
    <SubpageLayout>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Box>
    </SubpageLayout>
  );
  
  if (error) return (
    <SubpageLayout>
      <Box sx={{ mt: 10, mb: 10, textAlign: 'center', color: 'error.main' }}>
        {error}
      </Box>
    </SubpageLayout>
  );

  return (
    <SubpageLayout>
      <BoardList
        data={videos}
        detailLink="/youtube-detail"
        type="youtube"
      />
    </SubpageLayout>
  );
};

export default YoutubeList;