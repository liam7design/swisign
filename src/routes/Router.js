import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ScrollToTop from '../components/ui/ScrollToTop';

import Intro from '../pages/Intro';
import Main from '../pages/Main';	
import MapList from '../pages/MapList';
import MapView from '../pages/MapView';
import AddressList from '../pages/AddressList';
import AddressReg from '../pages/AddressReg';
import SafetyCheckList from '../pages/SafetyCheckList';
import MarketPrice from '../pages/MarketPrice';
import MapSearch from '../pages/MapSearch';
import ChangeInfoList from '../pages/ChangeInfoList';
import NoticeList from '../pages/NoticeList';
import NoticeDetail from '../pages/NoticeDetail';
import YoutubeList from '../pages/YoutubeList';
import YoutubeDetail from '../pages/YoutubeDetail';
import NewsList from '../pages/NewsList';
import NewsDetail from '../pages/NewsDetail';
import SaleRequest from '../pages/SaleRequest';
import SaleList from '../pages/SaleList';
import SaleDetail from '../pages/SaleDetail';
import ScheduleList from '../pages/ScheduleList';
import ScheduleDetail from '../pages/ScheduleDetail';
import CertificateCheck from '../pages/CertificateCheck';
import Contract from '../pages/Contract';
import ContractInput  from '../pages/ContractInput';
import LocalSaleList from '../pages/LocalSaleList';
import LocalSaleDetail from '../pages/LocalSaleDetail';
import RentalManagement from '../pages/RentalManagement';
import Login from '../pages/Login';
import Settings from '../pages/Settings';
import LoginManagement from '../pages/LoginManagement';
import PasswordManagement from '../pages/PasswordManagement';
import PrivacyManagement from '../pages/PrivacyManagement';
import RealEstateAgency from '../pages/RealEstateAgency';
import Join from '../pages/Join';
import NaverNews from '../pages/NaverNews';
import AgencyList from '../pages/AgencyList';

const Router = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/intro" element={<Intro />} />
        <Route path="/map-list" element={<MapList />} />
        <Route path="/map-view" element={<MapView />} />
        <Route path="/address-list" element={<AddressList />} />
        <Route path="/address-reg" element={<AddressReg />} />
        <Route path="/safety-check-list" element={<SafetyCheckList />} />
        <Route path="/market-price" element={<MarketPrice />} />
        <Route path="/map-search" element={<MapSearch />} />
        <Route path="/change-info-list" element={<ChangeInfoList />} />
        <Route path="/notice-list" element={<NoticeList />} />
        <Route path="/notice-detail/:id" element={<NoticeDetail />} />
        <Route path="/youtube-list" element={<YoutubeList />} />
        <Route path="/youtube-detail/:id" element={<YoutubeDetail />} />
        <Route path="/news-list" element={<NewsList />} />
        <Route path="/news-detail/:id" element={<NewsDetail />} />
        <Route path="/sale-request" element={<SaleRequest />} />
        <Route path="/sale-list" element={<SaleList />} />
        <Route path="/sale-detail/:id" element={<SaleDetail />} />
        <Route path="/schedule-list" element={<ScheduleList />} />
        <Route path="/schedule-detail/:id/*" element={<ScheduleDetail />} />
        <Route path="/certificate-check" element={<CertificateCheck />} />
        <Route path="/contract" element={<Contract />} />
        <Route path="/contract/input" element={<ContractInput />} />
        <Route path="/local-sale-list" element={<LocalSaleList />} />
        <Route path="/local-sale-detail/:id" element={<LocalSaleDetail />} />
        <Route path="/rental-management" element={<RentalManagement />} />
        <Route path="/login" element={<Login />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/login-management" element={<LoginManagement />} />
        <Route path="/password-management" element={<PasswordManagement />} />
        <Route path="/privacy-management" element={<PrivacyManagement />} />
        <Route path="/real-estate-agency" element={<RealEstateAgency />} />
        <Route path="/join" element={<Join />} />
        <Route path="/naver-news" element={<NaverNews />} />
        <Route path="/agency-list" element={<AgencyList />} />
      </Routes> 
    </>
  );
};

export default Router;