import React, { useState, useEffect } from 'react';
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
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h2>로딩 중...</h2>
      </div>
    </SubpageLayout>
  );
  
  if (error) return (
    <SubpageLayout>
      <div style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>
        <h2>{error}</h2>
      </div>
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