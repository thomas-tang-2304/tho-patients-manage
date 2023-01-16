/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable prettier/prettier */

import SideMenu from '@/components/SideMenu';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default function Dashboard({ dataHook }: { dataHook: any }) {
  const [token, setToken] = useState(cookies.get('account_token'));
  const source = axios.CancelToken.source();
  const totalClass: string = `text-2xl bg- w-2/3 border-2 pt-2 px-3 text-orange-500 pb-4 pt-5`;
  const [statistic, setStatistic] = useState({
    total_customer: 0,
    total_order: 0,
    total_product: 0,
    total_sales: 0,
  });

  useEffect(() => {
    if (dataHook[0].dashboard == undefined) {
      const getStatistic = async () => {
        await axios
          .get(
            'https://dev-api.digiex.asia/calobye-be-dev/api/dashboard/statistics',
            {
              headers: {
                accept: '*/*',
                'Auth-Token': token,
              },
              cancelToken: source.token,
            },
          )
          .then((res) => {
            const { total_customer, total_order, total_product, total_sales } =
              res?.data?.data;
            dataHook[1]((prev: any) => ({
              ...prev,
              dashboard: {
                total_customer,
                total_order,
                total_product,
                total_sales,
              },
            }));
            setStatistic({
              total_customer,
              total_order,
              total_product,
              total_sales,
            });
          });
      };
      getStatistic();
    } else {
      setStatistic({
        total_customer: dataHook[0].dashboard.total_customer,
        total_order: dataHook[0].dashboard.total_order,
        total_product: dataHook[0].dashboard.total_product,
        total_sales: dataHook[0].dashboard.total_sales,
      });
    }

    return () => {
      source.cancel('Cancelling in cleanup');
    };
  }, []);

  return (
    <div className={`h-[100vh]`}>
      <div className={`flex gap-6 w-[100%`}>
        <SideMenu currentPath={'/'} />
        <div className={`p-4 w-3/4 `}>
          {console.log(dataHook[0])}
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
