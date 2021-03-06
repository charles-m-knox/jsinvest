import React from 'react';
import './App.css';
import Container from 'react-bootstrap/Container';
import JumboView from './main/jumboview';
import InvestmentsView from './main/investments';

const App = function () {
  return (
    <Container fluid>
      {/* <JumboView
        header='Invest Smarter!'
        body='Use this simple tool to quickly allocate your financial accounts according to portfolios that you set up.'
      ></JumboView> */}
      <InvestmentsView></InvestmentsView>
    </Container>
  );
}

export default App;