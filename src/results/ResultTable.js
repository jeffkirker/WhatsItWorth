import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from "@material-ui/core/Paper";
import { Divider } from "@material-ui/core";

const ResultTable = (props) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, props.listings.length - page * rowsPerPage);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <div className="table-header">Thumbnail</div>
              </TableCell>
              <TableCell align="left">
                <div className="table-header">Title</div>
              </TableCell>
              <TableCell align="center">
                <div className="table-header">Date Sold</div>
              </TableCell>
              <TableCell align="center">
                <div className="table-header">Country Sold From</div>
              </TableCell>
              <TableCell align="center">
                <div className="table-header">Condition</div>
              </TableCell>
              <TableCell align="right">
                <div className="table-header">Price (USD)</div>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? props.listings.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : props.listings
            ).map((listing) => (
              <TableRow key={listing.itemId}>
                <TableCell align="center">
                  <a
                    className="card-title-text"
                    href={listing.listingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={listing.imageUrl} alt="" />
                  </a>
                </TableCell>
                <TableCell align="left">
                  <a
                    className="card-title-text"
                    href={listing.listingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {listing.title}
                  </a>
                </TableCell>
                <TableCell align="center">{listing.dateSold}</TableCell>
                <TableCell align="center">{listing.country}</TableCell>
                <TableCell align="center">{listing.condition}</TableCell>
                <TableCell align="right">
                  <div className="card-price">
                    ${(Math.round(listing.salePrice * 100) / 100).toFixed(2)}
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={props.listings.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default ResultTable;
