import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import CommonTable from "../components/table/CommonTable";

import { Link, useNavigate } from "react-router-dom";
import { Breadcrumbs, Button } from "@mui/material";
import { Delete } from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import PrintIcon from "@mui/icons-material/Print";
import { useRef } from "react";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import PrintPage from "./PrintPage";
// import Apps from './breedcrumbs'

const Invoice = () => {
  const [bachlist, setBatchlist] = useState([]);
  useEffect(() => {
    axios
      .post("http://localhost:8000/invoice/view")
      .then((res) => setBatchlist(res.data.result.message.message));
  }, []);
  const view = (id) => {
    localStorage.setItem("tua", true);
    console.log(id);
  };
  const edit = (id) => {
    console.log(id);
  };
  const deletedata = (invoiceid) => {
    console.log(invoiceid);
    axios.post("http://localhost:8000/invoice/delete", { invoiceid });
  };

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const column = [
    {
      field: "invoiceid",
      headerName: "invoiceid",
      width: 130,
      headerClassName: "super-app-theme--header",
    },

    {
      field: "StudentName",
      headerName: "StudentName",
      width: 130,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "CourseName",
      headerName: "CourseName",
      width: 130,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "BatchName",
      headerName: "BatchName",
      width: 130,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "AdmissionFee",
      headerName: "AdmissionFee",
      width: 130,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "Discount",
      headerName: "Discount",
      width: 130,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "Term",
      headerName: "Term",
      width: 130,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "TotalAmount",
      headerName: "TotalAmount",
      width: 130,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "paymentMethod",
      headerName: "PaymentMethod",
      width: 130,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "InvoiceDate",
      headerName: "InvoiceDate",
      width: 130,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "Actions",
      headerName: "Actions",
      sortable: false,
      width: 200,
      renderCell: (params) => {
        console.log(params);
        return (
          <>
            <Link to={`/Printpage/${params.row.invoiceid}`}>
              <div
                style={{ width: "35px", color: "greenyellow" }}
                onClick={handlePrint}
              >
                <ReactToPrint trigger={()=> <PrintIcon />} content={<PrintPage ref={(ele)=>componentRef=ele} />}>
        
        </ReactToPrint>
                
              </div>
            </Link>
            <Link to={`/InvoiceTable/Invoiceform/view/${params.row.invoiceid}`}>
              {" "}
              <div
                style={{ width: "35px", color: "gray" }}
                onClick={() => view(params.row.invoiceid)}
              >
                <VisibilityIcon />
              </div>
            </Link>
            <Link to={`/InvoiceTable/Invoiceform/edit/${params.row.invoiceid}`}>
              <div
                style={{ width: "35px", color: "orange" }}
                onClick={() => edit(params.row.invoiceid)}
              >
                <EditIcon />
              </div>
            </Link>
            <div
              style={{ width: "35px", color: "red" }}
              onClick={() => deletedata(params.row.invoiceid)}
            >
              <Delete />
            </div>
          </>
        );
      },
    },
  ];
  const rows = [
    {
      id: 1,
      Invoiceid: "A10",
      Studentid: "Testing",
      Name: "500000",
      InvoiceDate: "Selinium,Java",
      Course: "6months",
      Batch: "3",
      PendingAmount: "10000",
      PendingTerm: "1",
      Term: "3",
      Amount: "20000",
      Discount: "0%",
      TotalAmount: "50000",
      PaymentMethod: "cash",
    },
    {
      id: 2,
      Invoiceid: "A11",
      Studentid: "Front-End Developement",
      Name: "700000",
      InvoiceDate: "HTML,CSS,JS,React",
      Course: "6months",
      Batch: "3",
      PendingAmount: "10000",
      PendingTerm: "1",
      Term: "3",
      Amount: "20000",
      Discount: "0%",
      TotalAmount: "50000",
      PaymentMethod: "cash",
    },
  ];

  const heading = "Invoice";
  const link = "/InvoiceTable/Invoiceform";
  const button = "Create Invoice";
  return (
    <div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <CommonTable
                column={column}
                id="invoiceid"
                rows={bachlist}
                heading={heading}
                link={link}
                button={button}
              />
            </div>
          </div>
        </div>
      </div>
      <div
        style={{ display: "none" }} // This make ComponentToPrint show   only while printing
      >
        
      </div>
    </div>
  );
};

export default Invoice;
