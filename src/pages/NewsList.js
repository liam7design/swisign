import React from 'react';
import SubpageLayout from '../layouts/SubpageLayout';
import BoardList from '../components/board/BoardList';
import NewsData from '../data/NewsData.json';

const NewsList = () => {
  return (
    <SubpageLayout>
      <BoardList
        data={NewsData} 
        detailLink="/NewsDetail" 
        type="default"
        showSource
      />
    </SubpageLayout>
  )
}

export default NewsList;