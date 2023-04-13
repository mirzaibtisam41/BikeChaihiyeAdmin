import {
  CContainer,
  CHeader,
  CHeaderBrand, CHeaderNav, CNavItem, CNavLink
} from '@coreui/react'
import { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Logo from 'src/assets/images/pkBikes.png'
import { GlobalContext } from '../context'
import { AppHeaderDropdown } from './header/index'
const AppHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const { count } = useContext(GlobalContext);
  let history = useHistory();
  function handleClick() {
    history.push("/chat");
  }
  function handledashboard() {
    history.push("/dashboard");
  }
  function handlenotify() {
    history.push("/notifications");
  }
  // var counter=localStorage.getItem("count")
  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          <img style={{ width: '100px' }} src={Logo} />
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            <CNavLink style={{ fontSize: 'large', fontWeight: 'bold' }} activeClassName="active" >
              Dashboard
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav className="ms-3">
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
