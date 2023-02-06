import * as React from 'react';
import {
  TableCell,
  tableCellClasses,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  LinearProgress,
  styled
} from '@mui/material';
import tailwind from 'tailwind.config.js';
import { useState, useEffect, useLayoutEffect } from 'react';
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

  const colorPicker = (status: string) => {
    if (
      status == 'ACTIVE' ||
      status == 'APPROVED' ||
      status == 'PAID' ||
      status == 'DELIVERED'
    )
      return 'green';
    if (status == 'INACTIVE' || status == 'NOT APPROVED' || status == 'PENDING')
      return 'red';
    if (status == 'CONFIRMED') return '#FFB100';
    if (status == 'DELIVERING') return 'violet';
    else {
      return 'gray';
    }
  };
  useEffect(() => setNewItems(rows), [rows]);

  const handleSortLabel = (prev: any, text: string) =>
    prev.label == text
      ? { state: prev.state == 1 ? -1 : 1, label: prev.label }
      : { state: 1, label: text };

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

  const handleLabelClick = (text: string) => {
    setSortLabel((prev: any) => handleSortLabel(prev, text));
  };
  useEffect(() => {
    setNewItems(rows);
  }, [rows]);
  useLayoutEffect(() => {
    setNewItems((prev: any) => {
      const index = headers.findIndex(
        (ele: Element | string) => ele == sortLabel.label,
      );
      return prev ? arrSort(prev, index, sortLabel.state) : prev;
    });
  }, [headers, sortLabel]);

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
                    key={i}
                  >
                    <div
                      onClick={() => handleLabelClick(header)}
                      className="flex items-center gap-2"
                    >
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
                  className={`font-bold text-lg cursor-pointer`}
                  key={i}
                  align="right"
                >
                  <div
                    onClick={() => handleLabelClick(header)}
                    className="flex items-center float-right gap-2"
                  >
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
          {items?.length == 0 ? (
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
                  {headers.map((ele: any, index: number) =>
                    index == 0 ? (
                      <StyledTableCell key={index} component="th" scope="row">
                        {component != 'product' ? (
                          <LinearProgress color="inherit" />
                        ) : (
                          <img className="w-24" src="../images/holder.jpg" />
                        )}
                      </StyledTableCell>
                    ) : (
                      <StyledTableCell key={index} align="right">
                        <LinearProgress color="inherit" />
                      </StyledTableCell>
                    ),
                  )}
                </TableRow>
              ))
            )
          ) : (
            items?.map((row: any, key: number) => (
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
                        <img className="w-24" src={r.content} />
                      )}
                    </TableCell>
                  ) : (
                    <TableCell align="right" style={{ color: colorPicker(r) }}>
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
