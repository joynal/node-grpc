import { useSetRecoilState, useRecoilState } from 'recoil';
import { meterUsage, paginationData } from '../recoil/atoms';

const baseUrl = import.meta.env.VITE_BASE_URL;

export default () => {
  const setMeterUsage = useSetRecoilState(meterUsage);
  const [pagination, setPagination] = useRecoilState(paginationData);

  const fetchMeterUsage = async (filterData = null) => {
    let url = `${baseUrl}?`;

    if (filterData) {
      url += new URLSearchParams(filterData);
    }

    const response = await fetch(url);
    const data = await response.json();

    setPagination({ ...pagination, total: data.total });
    setMeterUsage(data);
  };

  return { fetchMeterUsage };
};
