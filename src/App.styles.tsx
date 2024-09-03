import styled from "styled-components";

export const Wrapper = styled.div`
  font-size: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  h1 {
    padding: 5rem 0;
  }
`;
export const Container = styled.div`
  font-size: 2rem;
  display: flex;
  width: 80%;
  gap: 5rem;
  justify-content: center;
`;
export const InputBox = styled.div`
  border: 1px solid grey;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30rem;
`;
export const InputWrapper = styled.div`
  display: flex;
  font-size: 1.5rem;
  align-items: center;
  padding: 1rem;
  width: 30rem;
  p {
    width: 10rem;
  }
  input {
    width: 20rem;
    padding: 0.5rem;
  }
  select {
    width: 12rem;
  }
`;
export const WithErrorLabelBox = styled.div`
  display: flex;
  flex-direction: column;
`;
export const ErrorText = styled.div`
  color: red;
  font-size: 1rem;
`;
export const OpenModalBtn = styled.button`
  width: 12rem;
  margin-left: 1rem;
`;
export const SaveBtn = styled.button`
  width: 90%;
  background-color: #0c61fe;
  padding: 1rem;
  margin: 1rem 0;
  color: white;
  border-radius: 10px;
  border: none;
`;
export const PhoneNumListBox = styled.div`
  border: 1px solid grey;
  width: 60%;
  padding: 2rem;
  border-radius: 10px;
`;

export const InputFieldWrapper = styled.div`
  padding: 1rem;
`;
export const PhoneNumList = styled.div`
  padding-top: 3rem;
`;
export const PhoneNumListItem = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  p {
    display: inline;
  }
`;
