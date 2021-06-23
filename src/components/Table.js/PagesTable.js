import React from "react";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import EditRoundedIcon from "@material-ui/icons/EditRounded";

function Row(props) {
  const { row, handleDelete, handleUpdate } = props;

  return (
    <React.Fragment>
      <TableRow>
        <TableCell>{row._id}</TableCell>
        <TableCell>{row.metaData.title}</TableCell>
        <TableCell>{row.metaData.canonical}</TableCell>
        <TableCell align="right">
          <IconButton onClick={() => handleDelete(row._id)}>
            <DeleteRoundedIcon color="error" />
          </IconButton>
        </TableCell>
        <TableCell align="right">
          <IconButton onClick={() => handleUpdate(row._id)}>
            <EditRoundedIcon color="primary" />
          </IconButton>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleUpdate: PropTypes.func.isRequired,
};

export default function PagesTable({
  rows,
  handleDelete,
  handleUpdate,
  valueskeys,
}) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="pages-added-table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Id</TableCell>
            <TableCell align="left">Page Title</TableCell>
            <TableCell align="left">Canonical</TableCell>
            <TableCell align="right">Delete</TableCell>
            <TableCell align="right">Update</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows &&
            rows.map((row) => (
              <Row
                key={row._id}
                row={row}
                handleDelete={handleDelete}
                handleUpdate={handleUpdate}
                valueskeys={valueskeys}
              />
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

PagesTable.propTypes = {
  tableData: PropTypes.array.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleUpdate: PropTypes.func.isRequired,
};
