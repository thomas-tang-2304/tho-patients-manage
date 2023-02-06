import SideMenu from '@/components/SideMenu';
import Styles from '@/styles/Home.module.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import Router from 'next/router';

const cookies = new Cookies();
export default function Dashboard() {
  const totalClass: string = `flex  rounded text-2xl bg- w-2/3 border-2 pt-2 px-3 text-orange-500 pb-4 pt-5`;
  const [statistic, setStatistic] = useState({
    total_customer: 0,
    total_order: 0,
    total_product: 0,
    total_sales: 0,
  });

  useEffect(() => {
    const getStatistic = async () => {
      await axios
        .get(
          'https://dev-api.digiex.asia/calobye-be-dev/api/dashboard/statistics',
          {
            headers: {
              accept: '*/*',
              'Auth-Token': 'e4bf404990784530943ef6ca1fe450a4',
            },
          },
        )
        .then((res) => {
          const { total_customer, total_order, total_product, total_sales } =
            res?.data?.data;
          setStatistic({
            total_customer,
            total_order,
            total_product,
            total_sales,
          });
        }).catch((err) => {
          console.error(err);
        })
        ;
    };

    getStatistic();
  }, []);

  return (
    <div className={`h-[100vh]`}>
      <div className={`flex gap-6 w-[100%`}>
        <SideMenu currentPath={'/'} />
        <div className={`p-4 w-3/4 `}>
          <div className={`ml-2 text-3xl w-fit pb-5 mb-5`}>
            <h1 className={`font-bold mb-3`}>Sale statistic</h1>
          </div>
          <div className="grid grid-flow-col grid-rows-2 gap-4 py-3 ml-2">
            <span className={totalClass}>
              Total order: {statistic?.total_order}
            </span>
            <span className={totalClass}>
              Total customer: {statistic?.total_customer}
            </span>
            <span className={totalClass}>
              Total products: {statistic?.total_product}
            </span>
            <span className={totalClass}>
              Total sales:{' '}
              {statistic?.total_sales
                ?.toLocaleString('vi', { style: 'currency', currency: 'VND' })
                .replace('₫', 'vnd')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
