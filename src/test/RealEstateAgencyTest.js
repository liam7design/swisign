import React, { useState } from 'react';
import FullpageLayout from '../layouts/FullpageLayout';
import RealEstateAgencyListTest from './components/RealEstateAgencyListTest';
import RealEstateAgencySearch from '../components/content/RealEstateAgencySearch';
import { FloatingBox, FloatingButton } from '../components/ui/FloatingBox';

const RealEstateAgencyTest = () => {
  const [searchProvince, setSearchProvince] = useState('');
  const [searchDistrict, setSearchDistrict] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');

  const handleSearch = ({ province, district, keyword }) => {
    setSearchProvince(province);
    setSearchDistrict(district);
    setSearchKeyword(keyword);
  };

  return (
    <FullpageLayout>
      <RealEstateAgencySearch onSearch={handleSearch} />
      <RealEstateAgencyListTest
        type="agencyTypeB"
        province={searchProvince}
        district={searchDistrict}
        keyword={searchKeyword}
      />
      <FloatingBox>
        <FloatingButton variant="contained" label="확인" />
      </FloatingBox>
    </FullpageLayout>
  )
}

export default RealEstateAgencyTest;