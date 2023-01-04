import { Outlet, Link } from "react-router-dom"
import { Fragment, useContext } from "react"
import { ReactComponent as CrownLogo } from '../../assets/crown.svg'
import './navigation.scss'
import { UserContext } from "../../components/contexts/user"
import { signOutUser } from "../../utils/firebase/firebase"

const Navigation = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext)
  console.log('opa',currentUser)

  const signOutHandler = async () => {
    await signOutUser()

    setCurrentUser(null)
  }

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
                    <span className='link' onClick={signOutHandler}>SIGN OUT</span>
                  ) : (
                    <Link className="link" to='/auth'>
                      SIGN IN
                    </Link>
                  )
                }
            </div>
        </div>
        <Outlet /> 
      </Fragment>
    )
}

export default Navigation