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
import Skeleton from "@material-ui/lab/Skeleton";

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
        {row[valueskeys._id] && <TableCell>{row[valueskeys._id]}</TableCell>}
        {row[valueskeys.title] && (
          <TableCell>{row[valueskeys.title]}</TableCell>
        )}
        {valueskeys.roles && <TableCell>{row[valueskeys.roles]}</TableCell>}
        {row.dataArray && row.dataArray[0].title && (
          <TableCell>{row.dataArray[0].title}</TableCell>
        )}
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
  loading,
}) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="services-added-table">
        <TableHead>
          <TableRow>
            {tableHead.map((col, index) => (
              <TableCell key={index} align={col.align}>
                {col.title}
              </TableCell>
            ))}
            <TableCell align="right">Delete</TableCell>
            <TableCell align="right">Update</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow>
              {tableHead.map((col, index) => (
                <TableCell key={index} align={col.align}>
                  <Skeleton animation="wave" variant="rect" height={20} />
                </TableCell>
              ))}
              <TableCell align="right">
                <Skeleton animation="wave" variant="rect" height={20} />
              </TableCell>
              <TableCell align="right">
                <Skeleton animation="wave" variant="rect" height={20} />
              </TableCell>
            </TableRow>
          ) : (
            rows &&
            rows.map((row) => (
              <Row
                edit={edit}
                key={row._id}
                row={row}
                handleDelete={handleDelete}
                handleUpdate={handleUpdate}
                valueskeys={valueskeys}
              />
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

DataTable.defaultProps = {
  tableHead: tableHead,
  loading: false,
};

DataTable.propTypes = {
  tableHead: PropTypes.array.isRequired,
  tableData: PropTypes.array.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};
