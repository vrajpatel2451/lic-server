import cookie from "react-cookies";
import { successAuth } from "../logic/features/auth/authReducer";

const checkAuthorization= (dispatch) =>{
    // const storedToken = localStorage.getItem("token");
    const storedToken = cookie.load("token");
  
    if (storedToken) {
        dispatch(successAuth({accessToken:storedToken,user:{}}));
      return true;
    }
  
    return false;
  }


export function checkWidgetAuthorization({ state, dispatch }) {
    const token = state.token;
    console.log(token);
    if (token) return true;
    return checkAuthorization(dispatch);
}