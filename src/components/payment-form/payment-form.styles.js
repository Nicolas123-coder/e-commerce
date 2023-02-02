import styled from "styled-components";
import Button from "../button/button";

export const PaymentFormContainer = styled.div`
  height: 300px;
  display: flex;
  flex-direction: center;
  align-items: center;
  justify-content: center;
`

export const FormContainer = styled.form`
  height: 120px;
  min-width: 500px;
  background-color: #f2f2f2;
  padding: 5px 20px 15px 20px;
  border: 1px solid lightgrey;
  border-radius: 3px;
`

export const PaymentButton = styled(Button)`
  margin-left: auto;
  margin-top: 30px;
`