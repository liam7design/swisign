import React from 'react';
import SubpageLayout from '../layouts/SubpageLayout';
import NaverMap from '../components/map/NaverMap';

const MarketPrice = () => {
  return (
    <SubpageLayout containerSx={{ p: 0, pt: 0, pb: 0 }}>
      <NaverMap />
    </SubpageLayout>
  )
}

export default MarketPrice;