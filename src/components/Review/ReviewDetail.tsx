/* eslint-disable prettier/prettier */
import React from 'react';
import styles from '@/styles/Add.module.css';

import {

  Rating,
} from '@mui/material';
import Switches from '@/utils/UIs/Switches';


export default function ReviewDetail() {
  return (
    <div className={`${styles.main} text-black`}>
      <div className={`${styles.title}`}>Review detail</div>
      <Switches title="Approve " />
      <p>
        <b>Rating</b>
        <Rating
          className="align-middle"
          name="read-only"
          defaultValue={5}
          readOnly
        />
      </p>
      <p>
        <b>Fullname</b> John Doe
      </p>
      <p>
        <b>Title name</b> Sản phẩm dùng tốt, giao hàng nhanh
      </p>
      <p>
        <b>Review date</b> {new Date().toISOString()}
      </p>
      <p>
        <b>Comment</b>
      </p>
      <p>Đây là commet review sản phẩm tốt và tiện ích</p>
      <img
        className="h-40 p-5 w-30"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png?20220519031949"
        alt=""
      />
    </div>
  );
}
