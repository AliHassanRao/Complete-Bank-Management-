import React from "react";
import { Routes, Route } from "react-router-dom";
import Read from "./components/Read";
import Create from "./components/Create";
import Services from "./components/Services";
import Update from "./components/Update";
import Bank from "./components/bank/Bank";
import CashWith from "./components/services/CashWith";
import BalanceInquiry from "./components/services/BalanceInquiry";
import Deposit from "./components/services/Deposit";
import FundTransfer from "./components/services/FundTransfer";
import Statement from "./components/services/Statment";
import Pin from "./components/services/Pin";
import Contact from "./components/Contact";
import Policy from "./components/Policy";
import About from "./components/About";
import HomePage from "./components/HomePage";
import BankServices from "./components/BankServices";
import BankBalanceInquiry from "./components/bankservices/BankBalanceInquiry";
import BankCashWith from "./components/bankservices/BankCashWith";
import BankDeposit from "./components/bankservices/BankDeposit";
import BankFundTransfer from "./components/bankservices/BankFundTransfer";
import BankPin from "./components/bankservices/BankPin";
import BankStatement from "./components/bankservices/BankStatment";
import Pagenotfound from "./components/Pagenotfound";


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />

        <Route path="/create" element={<Create />} />
        <Route path="/allpost" element={<Read />} />
        <Route path="/update/:id" element={<Update />} />
        <Route path="/services" element={<Services />} />


        {/* Admin Routes */}
        
          <Route path="/bankcashwithdrawal" element={<BankCashWith />} />
          <Route path="/bankservices" element={<BankServices />} />
          <Route path="/bankcashdeposit" element={<BankDeposit />} />
          <Route path="/bankfundtransfer" element={<BankFundTransfer />} />
          <Route path="/bankbalanceinquiry" element={<BankBalanceInquiry />} />
          <Route path="/bankstatement" element={<BankStatement />} />
          <Route path="/bankpin" element={<BankPin />} />
       

     
          <Route path="/cashdeposit" element={<Deposit />} />
          <Route path="/cashwithdrawal" element={<CashWith />} />
          <Route path="/fundtransfer" element={<FundTransfer />} />
          <Route path="/balanceinquiry" element={<BalanceInquiry />} />
          <Route path="/statement" element={<Statement />} />
          <Route path="/changepin" element={<Pin />} />
      

        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    </div>
  );
}

export default App;
