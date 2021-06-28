import React from 'react';
import { Layout } from 'antd';
import { RecoilRoot } from 'recoil';

import 'antd/dist/antd.css';

import MeterUsage from './MeterUsage';

const App = () => (
  <RecoilRoot>
    <Layout style={{ height: '100%', padding: '10em 10em' }}>
      <MeterUsage />
    </Layout>
  </RecoilRoot>
);

export default App;
