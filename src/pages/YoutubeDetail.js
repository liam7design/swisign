import React from 'react';
import FullpageLayout from '../layouts/FullpageLayout';
import BoardDetail from '../components/board/BoardDetail';
import YoutubeData from '../data/YoutubeData.json';

const YoutubeDetail = () => {
  return (
    <FullpageLayout>
      <BoardDetail
        data={YoutubeData}
        showYoutube
      />
    </FullpageLayout>
  )
}

export default YoutubeDetail;