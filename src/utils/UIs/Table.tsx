/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable prettier/prettier */

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { RawOrder } from '@/components/Order/OrderInterface';
import { RawProduct } from '@/components/Product/ProductInterface';

export default function BasicTable({
  rows,
  headers,
  itemsPerPage,
  callApiPending,
}: any) {
  let array: Array<number> = [];

  for (let i = 0; i < itemsPerPage; i++) {
    array.push(i);
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {headers.map((header: string[], i: number) =>
              i == 0 ? (
                <TableCell className={`font-extrabold text-xl`} key={i}>
                  {header}
                </TableCell>
              ) : (
                <TableCell
                  className={`font-extrabold text-xl`}
                  key={i}
                  align="right"
                >
                  {header}
                </TableCell>
              ),
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length == 0 ? (
            !callApiPending ? (
              <TableCell className="p-4 text-center" colSpan={headers.length}>
                No Record
              </TableCell>
            ) : (
              array.map((arr, i) => (
                <TableRow
                  key={i}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    ...
                  </TableCell>
                  <TableCell align="right">...</TableCell>
                  <TableCell align="right">...</TableCell>
                  <TableCell align="right">...</TableCell>
                  <TableCell align="right">...</TableCell>
                </TableRow>
              ))
            )
          ) : (
            rows.map((row: any, key: number) => (
              <TableRow
                key={key}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                {row.map((r: any, i: number) =>
                  i == 0 ? (
                    <TableCell component="th" scope="row" key={i}>
                      {r.type == 'text' ? (
                        r.content
                      ) : (
                        <img className="w-32" src={r.content} />
                      )}
                    </TableCell>
                  ) : (
                    <TableCell align="right"> {r}</TableCell>
                  ),
                )}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
