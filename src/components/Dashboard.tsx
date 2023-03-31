
import SideMenu from '@/components/SideMenu';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';


import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import {faker} from '@faker-js/faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      fill: true,
      label: 'total customers',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

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
            }))

            setStatistic({
              total_customer,
              total_order,
              total_product,
              total_sales,
            });
          }).catch((err: Error) => {
            console.log(err);

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
          <div className={`ml-2 text-3xl w-fit pb-5 mb-5`}>
            <h1 className={`font-bold mb-3 text-black`}>Sale statistic</h1>
          </div>
          <div className={`w-full text-black mt-5`}>
            <div className={`grid grid-cols-3 gap-3`}>
              <img className={`rounded-full w-[200px] drop-shadow-md`} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr1zjJHsfYfeByJ-O2y7HOymIGwhu4lxWTVQ&usqp=CAU" alt="" />
              <div className={`pt-10`}>
                <p><span className='text-xl font-bold flex'>Patient</span> Mr. Thỏ</p>
                <button type="button" className=" text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mt-10 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">View</button>
              </div>
              <div className={`pt-10`}>
                <p><span className='text-gray-600'>sex:</span> Male</p>
                <p><span className='text-gray-600'>age:</span> Chưa xác định</p>
                <p><span className='text-gray-600'>Blood:</span> B+</p>
              </div>
            </div>
          </div>
          {console.log(dataHook[0])}
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
        <Line options={options} data={data} />
        </div>
      </div>
    </div>
  );
}
