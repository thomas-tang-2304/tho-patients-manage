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
import tailwind from 'tailwind.config.js'
import { styled } from '@mui/material/styles';

export default function BasicTable({
  rows,
  headers,
  itemsPerPage,
  callApiPending,
  component
}: any) {
  let array: Array<number> = [];

  for (let i = 0; i < itemsPerPage; i++) {
    array.push(i);
  }

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: tailwind.purge.theme.colors["primary-background-color"],
      color: tailwind.purge.theme.colors["primary-color"],
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

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <StyledTableRow>
            {headers.map((header: string[], i: number) =>
              i == 0 ? (
                <StyledTableCell className={`font-bold text-lg `} key={i}>
                  {header}
                </StyledTableCell>
              ) : (
                <StyledTableCell
                  className={`font-bold text-lg `}
                  key={i}
                  align="right"
                >
                  {header}
                </StyledTableCell>
              ),
            )}
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {rows.length == 0 ? (
            !callApiPending ? (
              <StyledTableCell className="p-4 text-center" colSpan={headers.length}>
                No Record
              </StyledTableCell>
            ) : (
              array.map((arr, i) => (
                <TableRow

                  key={i}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <StyledTableCell component="th" scope="row" >
                    {component == 'order' || component == 'review'
                      ? <p className={`font-bold`}>...</p>
                      : <img className="w-32" src="../images/holder.jpg" />
                    }
                  </StyledTableCell>
                  <StyledTableCell align="right">...</StyledTableCell>
                  <StyledTableCell align="right">...</StyledTableCell>
                  <StyledTableCell align="right">...</StyledTableCell>
                  <StyledTableCell align="right">...</StyledTableCell>
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

                    <StyledTableCell component="th" scope="row" key={i}>
                      {component == 'order' || component == 'review' ? (
                        <p className={`font-bold`}>{r.content}</p>
                      ) : (
                        <img className="w-32" src={r.content} />
                      )}
                    </StyledTableCell>
                  ) : (
                    <StyledTableCell align="right"> {r}</StyledTableCell>
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
