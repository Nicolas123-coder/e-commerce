import { Outlet } from "react-router-dom"
import { Fragment, useContext } from "react"
import { ReactComponent as FireLogo } from '../../assets/fire.svg'
import { NavigationContainer, NavLinks, NavLink, LogoContainer } from './navigation.styles.js'
import CartIcon from "../../components/cart-icon/cart-icon"
import CartDropdown from "../../components/cart-dropdown/cart-dropdown"
import { useSelector, useDispatch } from "react-redux"
import { selectCurrentUser } from "../../store/user/user.selector"
import { selectIsCartOpen } from "../../store/cart/cart.selector"
import { signOutStart } from "../../store/user/user.action"

const Navigation = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector(selectCurrentUser)
  const isCartOpen = useSelector(selectIsCartOpen)

  const signOutUser = () => dispatch(signOutStart())

    return (
      <Fragment>
        <NavigationContainer>
          <LogoContainer to='/'>  
            <FireLogo className="logo" />
          </LogoContainer>
          <NavLinks>
              <NavLink to='/shop'>
                  SHOP
              </NavLink>
              {
                currentUser ? (
                  <NavLink as='span' onClick={signOutUser}>SIGN OUT</NavLink>
                ) : (
                  <NavLink to='/auth'>
                    SIGN IN
                  </NavLink>
                )
              }
              <CartIcon/>
          </NavLinks>
          {isCartOpen && <CartDropdown/>}
        </NavigationContainer>
        <Outlet /> 
      </Fragment>
    )
}

export default Navigation