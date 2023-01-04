import { Outlet, Link } from "react-router-dom"
import { Fragment } from "react"
import { ReactComponent as CrownLogo } from '../../assets/crown.svg'
import './navigation.scss'

const Navigation = () => {
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
                <Link className="link" to='/auth'>
                    SIGN IN
                </Link>
            </div>
        </div>
        <Outlet /> 
      </Fragment>
    )
}

export default Navigation