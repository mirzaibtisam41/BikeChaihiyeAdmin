import {
  cilUser
} from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import {
  CAlert, CButton, CCard,
  CCardBody, CCardHeader,
  CCol, CListGroup,
  CListGroupItem,
  CModal,
  CModalBody,
  CModalFooter, CModalHeader, CModalTitle, CRow, CSpinner
} from '@coreui/react';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import Pagination from '@mui/material/Pagination';
import moment from "moment";
import { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import io from "socket.io-client";
import XlsExport from 'xlsexport';
import { GlobalContext } from "../../context";

const Dashboard = () => {
  const { auth } = useContext(GlobalContext);
  const [users, setUsers] = useState(null);
  const [visible, setVisible] = useState(false);
  const [detail, setDetail] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [userPerPage, setUserPerPage] = useState(8);
  const [message, setMessage] = useState(null);

  const indexOfLastPost = currentPage * userPerPage;
  const indexOfFirstPost = indexOfLastPost - userPerPage;
  const currentPosts = users?.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = pageNumber => setCurrentPage(pageNumber);
  let socket;

  //digital oceans server endpoint where we deployed the nodejs app
  //http://147.182.142.76:5000/
  let ENDPOINT = "http://192.168.0.113:5000/";
  // let ENDPOINT="https://myavvocatoappadmin.com/";

  let url = "https://www.myavvocatoappadmin.com/"

  useEffect(() => {
    getAllUser();
  }, [])

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("join", auth?.user?._id);
  }, [])

  const getAllUser = () => {
    fetch(`https://bikechahiye.onrender.com/api/user/getAll`,
      { method: 'GET' },
    )
      .then(res => res.json())
      .then(data => {
        if (!data.message) {
          setUsers(data);
        }
      })
  }

  const SaveAsExcelFormatXlsx = () => {
    users?.forEach(item => {
      delete item._id;
      delete item.password;
      delete item.role;
      delete item.__v;
      delete item.isBan;
    });
    const xls = new XlsExport(users, 'Example WB');
    xls.exportToXLS('export.xls');
  };

  return (
    <>
      {auth === null && <Redirect to="/login" />}
      {users === null && <div style={{ textAlign: 'center' }}><CSpinner /></div>}
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {
                  users &&
                  <span>{`Registered Users (${users?.length})`}</span>
                }
                <CloudDownloadIcon title="Export to Excel" color="success"
                  onClick={SaveAsExcelFormatXlsx}
                />
              </div>
            </CCardHeader>
            <CCardBody>
              <CListGroup>
                {
                  users?.length === 0 && <h6 style={{ textAlign: 'center', color: 'red' }}>No Registered User</h6>
                }
                {
                  currentPosts?.map((item, index) => {
                    return <>
                      <CListGroupItem key={index} onClick={() => {
                        setDetail(item);
                        setVisible(true);
                      }} style={{ cursor: 'pointer' }}>
                        <CIcon icon={cilUser} style={{ marginRight: '10px' }} /> {item.name}
                      </CListGroupItem>
                    </>
                  })
                }
              </CListGroup>
            </CCardBody>
          </CCard>
        </CCol>
        {
          users?.length !== 0 &&
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Pagination count={Math.ceil(users?.length / userPerPage)} onChange={(e, v) => paginate(v)} color="error" />
          </div>
        }
      </CRow>
      {/* modal */}
      <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>User Detail</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {
            message &&
            <CAlert color="success">
              {message}
            </CAlert>
          }
          <div style={{ textAlign: 'center' }}>
            <CIcon size={'3xl'} icon={cilUser} style={{ marginRight: '1rem', marginBottom: '1rem' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span><b>Name :</b> {detail?.name}</span>
            <span><b>Email :</b> {detail?.email}</span>
            <span><b>Address :</b> {detail?.address}</span>
            <span><b>Phone :</b> {detail?.phone}</span>
            <span><b>Register Date :</b> {moment(detail?.createdAt).format('ll')}</span>
          </div>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton color="primary" onClick={() => {
            fetch(`https://bikechahiye.onrender.com/api/user/delete`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ id: detail?._id })
            })
              .then(res => res.json())
              .then(data => {
                getAllUser();
              })
          }}>Delete User</CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default Dashboard;