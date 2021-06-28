import { Table } from 'antd';
import { useRecoilValue, useRecoilState } from 'recoil';
import React, { useEffect, useState } from 'react';

import getUsageRecords from './hook/api';
import { meterUsage, paginationData } from './recoil/atoms';

export default () => {
  const { fetchMeterUsage } = getUsageRecords();
  const data = useRecoilValue(meterUsage);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useRecoilState(paginationData);

  useEffect(() => {
    fetchMeterUsage();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  const columns = [
    {
      title: 'Time',
      dataIndex: 'time',
    },
    {
      title: 'Meter Usage',
      dataIndex: 'meterusage',
    },
  ];

  const handleTableChange = (pg) => {
    setPagination(pg);
    setLoading(true);
    fetchMeterUsage({ page: pg.current, pageSize: pg.pageSize });
    setLoading(false);
  };

  return (
    <Table
      columns={columns}
      dataSource={data.usage}
      rowKey={(item) => item._id}
      pagination={pagination}
      onChange={handleTableChange}
      loading={loading}
    />
  );
};
