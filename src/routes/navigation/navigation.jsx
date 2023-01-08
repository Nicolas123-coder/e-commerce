import { Outlet, Link } from "react-router-dom"
import { Fragment, useContext } from "react"
import { ReactComponent as CrownLogo } from '../../assets/crown.svg'
import './navigation.scss'
import { UserContext } from "../../components/contexts/user"
import { CartContext } from "../../components/contexts/cart"
import { signOutUser } from "../../utils/firebase/firebase"
import CartIcon from "../../components/cart-icon/cart-icon"
import CartDropdown from "../../components/cart-dropdown/cart-dropdown"

const Navigation = () => {
  const { currentUser } = useContext(UserContext)
  const { isCartOpen } = useContext(CartContext)

    return (
      <Fragment>
        <div className="navigation">
          <Link className="logo-container" to='/'>  {/* tag Link vai mandar pro path especificado */}
            <CrownLogo className="logo" />
          </Link>
          <div className="links-container">
              <Link className="link" to='/shop'>
                  SHOP
              </Link>
              {
                currentUser ? (
                  <span className='link' onClick={signOutUser}>SIGN OUT</span>
                ) : (
                  <Link className="link" to='/auth'>
                    SIGN IN
                  </Link>
                )
              }
              <CartIcon/>
          </div>
          {isCartOpen && <CartDropdown/>}
        </div>
        <Outlet /> 
      </Fragment>
    )
}

export default Navigation