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
  const { row, handleDelete, handleUpdate, valueskeys, edit } = props;
  const handleEdit = (id) => {
    handleUpdate(id);
    if (edit) {
      edit(true);
    } else {
      return null;
    }
  };
  return (
    <React.Fragment>
      <TableRow>
        <TableCell>{row[valueskeys._id]}</TableCell>
        <TableCell>{row[valueskeys.title]}</TableCell>
        {valueskeys.roles && <TableCell>{row[valueskeys.roles]}</TableCell>}
        <TableCell align="right">
          <IconButton onClick={() => handleDelete(row._id)}>
            <DeleteRoundedIcon color="error" />
          </IconButton>
        </TableCell>
        <TableCell align="right">
          <IconButton onClick={() => handleEdit(row._id)}>
            <EditRoundedIcon color="primary" />
          </IconButton>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.defaultProps = {
  valueskeys: {
    _id: "_id",
    title: "title",
  },
};

Row.propTypes = {
  row: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  valueskeys: PropTypes.object,
};

const tableHead = [
  { title: "ID", align: "left" },
  { title: "Title", align: "left" },
];

export default function DataTable({
  tableHead,
  rows,
  handleDelete,
  handleUpdate,
  valueskeys,
  edit,
}) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="services-added-table">
        <TableHead>
          <TableRow>
            {tableHead.map((col, index) => (
              <TableCell align={col.align}>{col.title}</TableCell>
            ))}
            <TableCell align="right">Delete</TableCell>
            <TableCell align="right">Update</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows &&
            rows.map((row) => (
              <Row
                edit={edit}
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

DataTable.defaultProps = {
  tableHead: tableHead,
};

DataTable.propTypes = {
  tableHead: PropTypes.array.isRequired,
  tableData: PropTypes.array.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleUpdate: PropTypes.func.isRequired,
};
