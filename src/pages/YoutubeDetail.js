import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h2>로딩 중...</h2>
      </div>
    </FullpageLayout>
  );

  if (error) return (
    <FullpageLayout>
      <div style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>
        <h2>{error}</h2>
      </div>
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