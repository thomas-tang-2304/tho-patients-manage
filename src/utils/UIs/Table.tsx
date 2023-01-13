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
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import tailwind from 'tailwind.config.js';
import { styled } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { MdArrowUpward, MdArrowDownward } from 'react-icons/md';
import { VscCircleOutline } from 'react-icons/vsc';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: tailwind.purge.theme.colors['primary-background-color'],
    color: tailwind.purge.theme.colors['primary-color'],
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function BasicTable({
  rows,
  headers,
  callApiPending,
  component,
}: any) {
  const [array, setArray]: any = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const [items, setNewItems]: any = useState([]);
  const [sortLabel, setSortLabel]: any = useState({ label: '', state: 0 });

  const statusData: any = {
    "ACTIVE": "green-600",
    "INACTIVE": "red-500",
    "APPROVED": "green-600",
    "NOT APPVOVED": "red-500",
    "PENDING": "red-500",
    "CONFIRMED": "yellow-500",
    "PAID": "green-600",
    "DELIVERED": "green-600",
    "DELIVERING": "violet-600",
    "CANCELLED": "slate-300"
  }


  useEffect(() => setNewItems(rows), [rows]);

  const handleSortLabel = (prev: any, e: Event | any) =>
    prev.label == e.target.textContent
      ? { state: prev.state == 1 ? -1 : 1, label: prev.label }
      : { state: 1, label: e.target.textContent };

  const arrSort = (arr: any[], index: number, state: number) =>
    state == 1
      ? [...arr].sort((a: any, b: any) =>
        index == 0
          ? a[index]['content'] < b[index]['content']
            ? -1
            : 1
          : a[index] < b[index]
            ? -1
            : 1,
      )
      : [...arr].sort((a: any, b: any) =>
        index == 0
          ? a[index]['content'] > b[index]['content']
            ? -1
            : 1
          : a[index] > b[index]
            ? -1
            : 1,
      );

  const handleLabelClick = (e: Event | any) => {
    setSortLabel((prev: any) => handleSortLabel(prev, e));
    setNewItems((prev: any) => {
      const index = headers.findIndex(
        (ele: Element) => ele == e.target.textContent,
      );
      return arrSort(prev, index, sortLabel.state);
    });
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <StyledTableRow>
            {headers.map((header: string, i: number) =>
              i == 0 ? (
                <>
                  <StyledTableCell
                    className={`font-bold text-lg cursor-pointer`}
                    onClick={handleLabelClick}
                    key={i}
                  >
                    <div className="flex items-center gap-2">
                      <p>{header}</p>
                      {sortLabel.label == header ? (
                        sortLabel.state == 1 ? (
                          <MdArrowUpward />
                        ) : (
                          <MdArrowDownward />
                        )
                      ) : (
                        <VscCircleOutline />
                      )}
                    </div>
                  </StyledTableCell>
                </>
              ) : header != 'Action' ? (
                <StyledTableCell
                  onClick={handleLabelClick}
                  className={`font-bold text-lg cursor-pointer`}
                  key={i}
                  align="right"
                >
                  <div className="flex items-center float-right gap-2">
                    {sortLabel.label == header ? (
                      sortLabel.state == 1 ? (
                        <MdArrowUpward />
                      ) : (
                        <MdArrowDownward />
                      )
                    ) : (
                      <VscCircleOutline />
                    )}
                    <p>{header}</p>
                  </div>
                </StyledTableCell>
              ) : (
                <StyledTableCell
                  className={`font-bold text-lg`}
                  key={i}
                  align="right"
                >
                  <p>{header}</p>
                </StyledTableCell>
              ),
            )}
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {items.length == 0 ? (
            !callApiPending ? (
              <StyledTableCell
                className="p-4 text-center"
                colSpan={headers.length}
              >
                No Record
              </StyledTableCell>
            ) : (
              array.map((arr: number[], i: number) => (
                <TableRow
                  key={i}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  {headers.map(({index}) =>
                    index == 0 ?
                      <StyledTableCell key={index} component="th" scope="row">
                        {component != 'product' ? (
                          <p className={`font-bold`}>...</p>
                        ) : (
                          <img className="w-32" src="../images/holder.jpg" />
                        )}
                      </StyledTableCell>
                      :
                      <StyledTableCell key={index} align="right">...</StyledTableCell>
                  )}
                
                </TableRow>
              ))
            )
          ) : (
            items.map((row: any, key: number) => (
              <TableRow
                key={key}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                {row.map((r: any, i: number) =>
                  i == 0 ? (
                    <TableCell component="th" scope="row" key={i}>
                      {component != 'product' ? (
                        <p className={`font-bold`}>{r.content}</p>
                      ) : (
                        <img className="w-32" src={r.content} />
                      )}
                    </TableCell>
                  ) : (
                    <TableCell
                      align="right"
                      className={`${headers[i] ? `text-${statusData[r]}` : null}`}
                    >

                      {r}
                    </TableCell>
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
