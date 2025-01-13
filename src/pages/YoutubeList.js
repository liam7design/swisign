import React from 'react';
import SubpageLayout from '../layouts/SubpageLayout';
import BoardList from '../components/board/BoardList';
import YoutubeData from '../data/YoutubeData.json';

const YoutubeList = () => {
  return (
    <SubpageLayout>
      <BoardList
        data={YoutubeData} 
        detailLink="/YoutubeDetail" 
        type="youtube"
      />
    </SubpageLayout>
  )
}

export default YoutubeList;