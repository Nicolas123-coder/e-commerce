import { useState } from "react"
import FormInput from "../form-input/form-input"
import Button, { BUTTON_TYPE_CLASSES } from "../button/button"
import { SignInContainer, ButtonsContainer } from './sign-in.styles'
import { useDispatch } from "react-redux"
import { googleSignInStart, emailSignInStart } from "../../store/user/user.action"

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const dispatch = useDispatch()
    const [formFields, setFormFields] = useState(defaultFormFields)
    const { email, password } = formFields

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const signInWithGoogle = async () => {
       dispatch(googleSignInStart())
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            dispatch(emailSignInStart(email, password))

            resetFormFields()
        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password' : 
                    alert('incorrect password for email')
                    break
                case 'auth/user-not-found' : 
                    alert('no user associated with this email')
                    break    
                default: 
                    console.log(error)
            }
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target

        setFormFields({...formFields, [name]: value})
    }

    return (
        <SignInContainer>
            <h2>Already have an account ?</h2>
            <span>Sign In with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput 
                    label='Email'
                    inputOptions={{
                        type: 'email',
                        required:  true, 
                        onChange: handleChange, 
                        name: 'email', 
                        value: email
                    }}
                />

                <FormInput 
                    label='Password'
                    inputOptions={{
                        type: 'password',
                        required:  true, 
                        onChange: handleChange, 
                        name: 'password', 
                        value: password
                    }}
                />
                <ButtonsContainer>
                    <Button type='submit'>Sign In</Button>
                    <Button  type='button' buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>
                        Google Sign In
                    </Button>
                </ButtonsContainer>
            </form>
        </SignInContainer>
    )
}

export default SignInForm