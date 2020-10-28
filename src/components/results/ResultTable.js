import React, { Component, forwardRef } from "react";
import MaterialTable from "material-table";

import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => (
    <DeleteOutline {...props} ref={ref} color="error" />
  )),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

class ResultTable extends Component {
  tableRender() {
    return (
      <MaterialTable
        icons={tableIcons}
        columns={[
          {
            align: "center",
            sorting: false,
            title: "Thumbnail",
            field: "imageUrl",
            render: (rowData) => (
              <img
                style={{ maxWidth: "100%", height: "auto" }}
                src={rowData.imageUrl}
                alt=""
              />
            ),
          },
          {
            align: "center",
            cellStyle: {
              width: "30%",
            },
            sorting: false,
            title: "Title",
            field: "title",
            render: (rowData) => (
              <a
                className="card-title-text"
                href={rowData.listingUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {rowData.title}
              </a>
            ),
          },
          {
            align: "center",
            title: "Date Sold",
            field: "dateSold",
            render: (rowData) => rowData.dateSold.slice(0, 10),
          },
          {
            align: "center",
            title: "Country",
            field: "country",
          },
          {
            align: "center",
            sorting: false,
            title: "Condition",
            field: "condition",
          },
          {
            align: "center",
            cellStyle: {
              fontWeight: "bold",
              fontSize: "large",
            },
            type: "currency",
            title: "Sold For (USD)",
            field: "salePrice",
          },
        ]}
        data={this.props.listings}
        actions={[
          {
            icon: tableIcons.Delete,
            tooltip: "Remove Listing",
            onClick: this.props.handleRemove,
          },
        ]}
        options={{
          search: false,
          showTitle: false,
          actionsColumnIndex: -1,
          rowStyle: {
            width: "100%",
          },
          headerStyle: {
            fontWeight: "bold",
            fontSize: "medium",
          },
        }}
      />
    );
  }

  render() {
    if (this.props.resultTable === true) {
      return <div className="responsive-table">{this.tableRender()}</div>;
    } else {
      return (
        <div className="responsive-table-outliers">{this.tableRender()}</div>
      );
    }
  }
}

export default ResultTable;
