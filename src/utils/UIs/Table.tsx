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


export default function BasicTable({ rows, headers, itemsPerPage, callApiPending }: any) {

    let array: Array<number> = [];

    for (let i = 0; i < itemsPerPage; i++) {
        array.push(i)
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {
                            headers.map((header: string[], i: number) =>
                                i == 0
                                    ?
                                    <TableCell className={`font-extrabold text-xl`} key={i}>{header}</TableCell>
                                    :
                                    <TableCell className={`font-extrabold text-xl`} key={i} align="right" >{header}</TableCell>
                            )
                        }

                    </TableRow>
                </TableHead>
                <TableBody>
                    {

                        rows.length == 0 ?
                            !callApiPending ?

                                (<TableCell className="p-4 text-center" colSpan={headers.length}>No Record</TableCell>)

                                :
                                array.map((arr, i) => (<TableRow
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
                                </TableRow>))
                            :
                            rows.map((row: RawOrder) => (
                                <TableRow
                                    key={row.code}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.code}
                                    </TableCell>
                                    <TableCell align="right">{row.full_name}</TableCell>
                                    <TableCell align="right">{row.total}</TableCell>
                                    <TableCell align="right">{row.create_date}</TableCell>
                                    <TableCell align="right">{row.status}</TableCell>
                                </TableRow>
                            ))


                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}