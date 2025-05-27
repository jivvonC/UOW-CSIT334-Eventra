import styled from "styled-components";

export const WholePage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 5%;
  padding-bottom: 5%;
  padding-left: 5%;
  padding-right: 11.5%;
`;

export const StyledWrapper = styled.div`
  .form {
  width: 70vw;
  height: 60vh;
  padding-top: 5%;
  padding-left: 5%;
  padding-right:5%;
  background-color: #FFFFFF
  color: #000000;
  bordercolor:#d2d1d1;
  border-style: groove;
  border-radius: 25px;
  box-shadow: 7px 7px 7px #A4A4A4;
  border-width: 0.2px;
  display:flex;
  flex-direction: row;
  justify-content: space-between;
  background-image: linear-gradient(to right, white 70%, #ADEA16 30%);
  }

  .left {
    text-align: left;
    padding-top: 3%;
  }

  .form-title {
    font-size: 2rem;
    line-height: 1.75rem;
    font-weight: 700;
    text-align: left;
    color: #000;
  }

  .input-container {
    position: relative;
  }

  .input-container input, .form button {
    outline: none;
    border: 1px solid #e5e7eb;
    margin: 8px 0;
  }

  .input-container input {
    background-color: #fff;
    padding: 1rem;
    padding-right: 3rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    width: 300px;
    border-radius: 0.5rem;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  }

  .forgot {
   font-size: 0.75rem;
   text-decoration: none;
   color: black;
  }

  .login {
   display: flex;
   justify-content: center;
  }
  .loginbtn {
    display: block;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    padding-left: 1.25rem;
    padding-right: 1.25rem;
    background-color: #ADEA16;
    color:#000000;
    font-size: 0.775rem;
    line-height: 1.25rem;
    font-weight: 500;
    width: 7vw;
    border: 0;
    outline: 0;
    border-radius: 1.5rem;
    text-transform: uppercase;
    justify-content: center;
  }

  .right {
    text-align: right;
    padding-top: 3%;
    flex-basis: 250px;
  }

  .signup {
    display: flex;
    justify-content: center;
    padding-top: 80%;
  }

  .signupmsg {
    font-size: 1.5rem;
    text-align: right;
    line-height: 1.75rem;
    font-weight: 700;
    color: #000;
    text-align: center;
  }

   .signupbtn {
    display: inline;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    padding-left: 1.25rem;
    padding-right: 1.25rem;
    background-color: #000000;
    color:#FFFFFF;
    font-size: 0.775rem;
    line-height: 1.25rem;
    font-weight: 500;
    border: 0;
    outline: 0;
    width: 7vw;
    border-radius: 1.5rem;
    text-transform: uppercase;
  }

  }`;

export const StyledWrapper2 = styled.div`
  .form {
  width: 70vw;
  height: 60vh;
  padding-top: 1%;
  padding-left: 5%;
  padding-right:5%;
  padding-bottom: 4%;
  background-color: #FFFFFF
  color: #000000;
  bordercolor:#d2d1d1;
  border-style: groove;
  border-radius: 25px;
  box-shadow: 7px 7px 7px #A4A4A4;
  border-width: 0.2px;
  display:flex;
  flex-direction: row;
  justify-content: space-between;
  background-image: linear-gradient(to right,#ADEA16 30%, white 20%);
  }

  .right {
    text-align: left;
    padding-right: 32%;
    line-height: 0.2;
    overflow-y: auto;         /* ✅ 스크롤 추가 */
    height: 100%;
  }

  .form-title {
    font-size: 2rem;
    line-height: 1.75rem;
    font-weight: 700;
    text-align: left;
    color: #000;
  }

  .input-container {
    position: relative;
  }

  .input-container input, .form button {
    outline: none;
    border: 1px solid #e5e7eb;
    margin: 8px 0;
  }

  .input-container input {
    position: relative;
    background-color: #fff;
    padding: 1rem;
    padding-right: 3rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    width: 300px;
    height: 10px;
    border-radius: 0.5rem;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  }

  .forgot {
   font-size: 0.75rem;
  }

  .login {
   display: flex;
   justify-content: center;
  }
  .loginbtn {
    display: block;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    padding-left: 1.25rem;
    padding-right: 1.25rem;
    background-color: #ADEA16;
    color:#000000;
    font-size: 0.775rem;
    line-height: 1.25rem;
    font-weight: 500;
    width: 30%;
    border: 0;
    outline: 0;
    border-radius: 1.5rem;
    text-transform: uppercase;
    justify-content: center;
  }

  .left {
    text-align: right;
    flex-basis: 250px;
  }

  .signup {
    display: flex;
    justify-content: center;
    padding-top: 139.5%;
  }

  .signupmsg {
    font-size: 1.5rem;
    text-align: right;
    line-height: 1.75rem;
    font-weight: 700;
    color: #000;
    text-align: center;
  }

   .signupbtn {
    display: inline;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    padding-left: 1.25rem;
    padding-right: 1.25rem;
    background-color: #000000;
    color:#FFFFFF;
    font-size: 0.775rem;
    line-height: 1.25rem;
    font-weight: 500;
    width: 40%;
    border: 0;
    outline: 0;
    border-radius: 1.5rem;
    text-transform: uppercase;
  }

  .alertImg {
  position: absolute;
  top: 45%;
  right:-10%;
  }
 }`;

export const SignUpCard = styled.div`
  .card {
  width: 70vw;
  height: 60vh;
  padding-top: 5%;
  padding-left: 5%;
  padding-right:5%;
  background-color: #FFFFFF
  color: #000000;
  bordercolor:#d2d1d1;
  border-style: groove;
  border-radius: 25px;
  box-shadow: 7px 7px 7px #A4A4A4;
  border-width: 0.2px;
  display:flex;
  flex-direction: row;
  justify-content: space-between;
  background-image: linear-gradient(to left, white 50%, #ADEA16 50%);
  font-family: Helvetica;
  }
    .left {
    text-align: left;
    flex-basis: 400px;
  }
      .right {
    text-align: left;
    flex-basis: 400px;
    padding-right: 7.5vw;
    padding-top: 11vh;
    
  }
    .description {
    line-height: 2.0;
    font-size: 17px;
    }

     .blackbtn {
    display: inline;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    padding-left: 1.25rem;
    padding-right: 1.25rem;
    background-color: #000000;
    color:#FFFFFF;
    font-size: 0.775rem;
    line-height: 1.25rem;
    font-weight: 500;
    width: 7vw;
    border-radius: 1.5rem;
    border: 0;
    outline: 0;
    text-transform: uppercase;
    position: relative;
    top: 6vh;
    left: 24vw;
  }
    .greenbtn {
    display: block;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    padding-left: 1.25rem;
    padding-right: 1.25rem;
    background-color: #ADEA16;
    line-height: 1.25rem;
    color:#000000;
    font-size: 0.775rem;
    font-weight: 500;
    width: 7vw;
    border-radius: 1.5rem;
    border: 0;
    outline: 0;
    text-transform: uppercase;
    justify-content: center;
    position: relative;
    top: 2vh;
    left: 23.8vw;
  }


  }`;

export const ProviderSignUp = styled.div`
  .form {
  width: 70vw;
  height: 60vh;
  padding-top: 1%;
  padding-left: 5%;
  padding-right:5%;
  padding-bottom: 4%;
  background-color: #FFFFFF
  color: #000000;
  bordercolor:#d2d1d1;
  border-style: groove;
  border-radius: 25px;
  box-shadow: 7px 7px 7px #A4A4A4;
  border-width: 0.2px;
  display:flex;
  flex-direction: row;
  justify-content: space-between;
  }

  .first {
    text-align: left;
    position: relative;
    top: 13vh;
    right: 11vw;
    line-height: 0.2;
  }

  .form-title {
    font-size: 2rem;
    line-height: 1.75rem;
    font-weight: 700;
    text-align: left;
    color: #000;
  }

  .input-container {
    position: relative;
  }

  .input-container input, .form button, .state, .postcode input, .servicecategory{
    outline: none;
    border: 1px solid #e5e7eb;
    margin: 8px 0;
  }

  .input-container input {
    position: relative;
    background-color: #fff;
    padding: 1rem;
    padding-right: 3rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    width: 13vw;
    height: 10px;
    border-radius: 0.5rem;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  }
  
.postcode input{
    position: relative;
    top: -17vh;
    left: 11vw;
    background-color: #fff;
    padding: 1rem;
    padding-right: 1rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    width: 4vw;
    height: 10px;
    border-radius: 0.5rem;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

    .state {
    width: 10vw;
    height: 5vh;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    border-radius: 0.5rem;
    padding: 0.5rem;
    padding-right: 3rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
  }

  .forgot {
   font-size: 0.75rem;
  }

  .second {
    text-align: left;
    flex-basis: 300px;
    position: relative;
    top: 13vh;
    left: -9vw;
    line-height: 0.2;
  }

  .third {
    text-align: left;
    flex-basis: 300px;
    position: relative;
    top: 13vh;
    right: 9vw;
    line-height: 0.2;
  }

  .servicecategory {
    width: 17vw;
    height: 5vh;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    border-radius: 0.5rem;
    padding: 0.5rem;
    padding-right: 3rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
  }

  .greenbtn {
    position: relative;
    top: 7vh;
    left: 20vw;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    padding-left: 1.25rem;
    padding-right: 1.25rem;
    background-color: #ADEA16;
    line-height: 1.25rem;
    color:#000000;
    font-size: 0.775rem;
    font-weight: 500;
    width: 7vw;
    height: 5vh;
    border-radius: 1.5rem;
    border: 0;
    outline: 0;
    text-transform: uppercase;
    justify-content: center;
  }

  .alertImg {
  position: absolute;
  top: 45%;
  right:-10%;
  }

  }`;

export const Notification = styled.div`
.title {
text-align: center;
font-weight: 500;
font-size: 1.5rem;
}
.container {
display: flex;
flex-direction: column;
justify-content: center;
flex-basis: 100%;
height: 100%;
width: 50vw;
margin:0 auto;
word-wrap: break-word;
align-item: center;
gap: 2vh;
}

.item {
background-color: #FFFFFF;
width: 50vw;
height: 10vh;
bordercolor:#d2d1d1;
border-style: groove;
border-radius: 25px;
box-shadow: 5px 5px 5px #A4A4A4;
border-width: 0.2px;
line-height: 1.25rem;
display: flex;
flex-direction: row;
}
.notimg {
 padding-top: 1.8rem;
 padding-left: 1.8rem;
 padding-right: 1rem;
 justify-content: center;
 align-item: center;
 height: 30px;
 width: 30px;
 flex-grow: 1;

}

.notmsg {
 display: block;
 width:40vw;
 padding-top: 1rem;
 padding-bottom: 1rem;
 padding-left: 0.5rem;
 flex-grow: 4;
}

.greenbtn {
    margin-top: 1.4rem;
    margin-right: 1.8rem;
    padding-top: 0.55rem;
    padding-bottom: 0.55rem;
    padding-left: 1.25rem;
    padding-right: 1.25rem;
    background-color: #ADEA16;
    line-height: 1.25rem;
    color:#000000;
    font-size: 0.700rem;
    font-weight: 500;
    width: 5.5vw;
    height: 4.5vh;
    border-radius: 1.5rem;
    border: 0;
    outline: 0;
    text-transform: uppercase;
    justify-content: left;
    flex-grow: 1;
  }

  .seemorebtn{
    margin-left: 21.5vw;
    margin-top: 3vh;
    padding-top: 0.55rem;
    padding-bottom: 0.55rem;
    padding-left: 1.25rem;
    padding-right: 1.25rem;
    background-color: #f0f0f0;
    line-height: 1.25rem;
    color:#000000;
    font-size: 0.700rem;
    font-weight: 500;
    width: 8vw;
    height: 4.5vh;
    border-radius: 1.5rem;
    border: 0;
    outline: 0;
    text-transform: uppercase;
    justify-content: center;
    align-item: center;
  }
  }`;
