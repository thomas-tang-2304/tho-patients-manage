import { useRouter, Router } from 'next/router';
import React, { useState, useEffect } from 'react';
import { SiFacebook, SiYoutube } from 'react-icons/si';
import axios from 'axios';
import Cookies from 'universal-cookie';

export default function Settings() {
  const router = useRouter();
  const cookies = new Cookies();
  const activeLinkClassName = 'font-semibold pb-2 text-blue-900 border-b-4 border-blue-900';
  const linkClassName = 'font-semibold pb-2';
  const linkList = ['General', 'Banner'];
  const [activeLink, setActiveLink] = useState(0);
  const [token, setToken] = useState(cookies.get('account_token'));

  const [rate, setRate] = useState();
  const [facebook, setFacebook] = useState();
  const [youtobe, setYoutobe] = useState();
  const [video, setVideo]: any = useState();

  useEffect(() => {
    fetch('https://dev-api.digiex.asia/calobye-be-dev/api/setting', {
      headers: {
        'accept': '*/*',
        'Auth-Token': token
      }
    })
    .then((data: any) => data.json())
    .then((res: any) => {
      setRate(res.data.rate);
      setFacebook(res.data.facebook_url);  
      setYoutobe(res.data.youtube_url);
      setVideo(res?.data.youtube_video.join('\n'));
    }).catch((err) => {
      console.log(err);
    })
  }, []);
    
  console.log(video)
  return (
    <div className={`p-4 w-3/4 `}>
      <div className={`mx-2 flex flex-col gap-2 w-auto`}>
        <h1 className={`font-bold text-3xl`}>Settings</h1>

        <ul className="flex gap-4">
          {linkList.map((link, index) => (
            <li
              onClick={() => {
                setActiveLink(index);
              }}
              className={`hover:text-blue-900 cursor-pointer ${
                index != activeLink ? linkClassName : activeLinkClassName
              }`}
            >
              {link}
            </li>
          ))}
        </ul>
        <div className="pb-1 border-b-2">
          <strong>Point accumulation</strong>
        </div>
        <form action="" className="flex flex-col justify-between gap-3">
          <div className="form-1">
            <label htmlFor="">
              <strong>Form amount</strong>
            </label>
            <div className="form-amount-input">
              <input type="number" className="p-2 mr-2 border-2" placeholder={rate}/>
              <span className="mr-2"> =</span>
              <span className="1-point">1 point</span>
            </div>
          </div>

          <div className="form-2">
            <div className="pb-1 mb-3 border-b-2">
              <label htmlFor="">Social network</label>
            </div>
            <div className="flex items-center mb-3 social-input-link ">
              <label className="py-2 mr-4 text-2xl" htmlFor="">
                <SiFacebook />
              </label>
              <input
                className="w-64 p-2 border-2"
                type="text"
                placeholder={facebook}
              />
            </div>
            <div className="flex items-center mb-3 social-input-link ">
              <label className="py-2 mr-4 text-2xl" htmlFor="">
                <SiYoutube />
              </label>
              <input
                className="w-64 p-2 border-2"
                type="text"
                placeholder={youtobe}
              />
            </div>
          </div>
          <div className="form-3">
            <div className="pb-1 mb-3 border-b-2">
              <label htmlFor="">
                <strong>Youtube Videos</strong>
              </label>
            </div>
            <textarea
              className="p-2 border-2"
              name=""
              id=""
              cols={70}
              rows={10}
              value={video}
            />
          </div>
          <small>{'(input each video link in one link)'}</small>
        </form>
      </div>
    </div>
  );
}
