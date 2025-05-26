import React from 'react';
import FullpageLayout from '../layouts/FullpageLayout';
import RealEstateAgencyList from '../components/content/RealEstateAgencyList';
import { FloatingBox, FloatingButton } from '../components/ui/FloatingButton';

const RealEstateAgency = () => {
  return (
    <FullpageLayout>
      <RealEstateAgencyList type="agencyTypeB" />
      
      <FloatingBox>
        <FloatingButton variant="contained" label="확인" />
      </FloatingBox>
    </FullpageLayout>
  )
}

export default RealEstateAgency;