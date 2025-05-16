import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ScrollToTop from '../components/ui/ScrollToTop';

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

const Router = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/MapList" element={<MapList />} />
        <Route path="/MapView" element={<MapView />} />
        <Route path="/AddressList" element={<AddressList />} />
        <Route path="/AddressReg" element={<AddressReg />} />
        <Route path="/SafetyCheckList" element={<SafetyCheckList />} />
        <Route path="/MarketPrice" element={<MarketPrice />} />
        <Route path="/MapSearch" element={<MapSearch />} />
        <Route path="/ChangeInfoList" element={<ChangeInfoList />} />
        <Route path="/NoticeList" element={<NoticeList />} />
        <Route path="/NoticeDetail/:id" element={<NoticeDetail />} />
        <Route path="/YoutubeList" element={<YoutubeList />} />
        <Route path="/YoutubeDetail/:id" element={<YoutubeDetail />} />
        <Route path="/NewsList" element={<NewsList />} />
        <Route path="/NewsDetail/:id" element={<NewsDetail />} />
        <Route path="/SaleRequest" element={<SaleRequest />} />
        <Route path="/SaleList" element={<SaleList />} />
        <Route path="/SaleDetail/:id" element={<SaleDetail />} />
        <Route path="/ScheduleList" element={<ScheduleList />} />
        <Route path="/ScheduleDetail/:id/*" element={<ScheduleDetail />} />
        <Route path="/CertificateCheck" element={<CertificateCheck />} />
        <Route path="/Contract" element={<Contract />} />
        <Route path="/Contract/Input" element={<ContractInput />} />
        <Route path="/LocalSaleList" element={<LocalSaleList />} />
        <Route path="/LocalSaleDetail/:id" element={<LocalSaleDetail />} />
        <Route path="/RentalManagement" element={<RentalManagement />} />
        <Route path="/Login" element={<Login />} />
      </Routes> 
    </>
  );
};

export default Router;
