import React, { ReactNode} from 'react';
import styles from '@/styles/Add.module.css';
import Switches from '@/utils/UIs/Switches';
import { Table, TableContainer, TableCell, TableRow, Paper, Rating, TableBody, TextField } from '@mui/material';

export default function ReviewDetail({rating, fullName, titleName, reviewDate, comment, isApproved}: any) {

  function createData(
    name: string,
    content: ReactNode,
  ) {
    return {name, content}
  }
  
  const rows = [
    createData('Approved', <Switches approve={isApproved}/>),
    createData('Rating', <Rating className='align-middle' name="read-only" defaultValue={rating} readOnly />),
    createData('Fullname', fullName),
    createData('Title name', titleName),
    createData('Review date', reviewDate),
    createData('Comment', <textarea id='shortDescripti' value={comment} className="p-1 text-white" rows={3} cols={50}/>),
  ];

  return (
    <div className={`${styles.main} text-black `}>
      <div className={`${styles.title}`}>Review detail</div>
      <TableContainer className='mt-2' component={Paper}>
        <Table sx={{ Width: 400 }} aria-label="caption table">
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell sx={{fontWeight: 900}} component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.content}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
