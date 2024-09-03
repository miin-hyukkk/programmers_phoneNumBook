import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;
`;

export const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 300px;
  text-align: center;
`;

export const ModalButton = styled.button`
  cursor: pointer;
`;
export const ModalCloseButton = styled.button`
  background-color: #fc4a38;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 1px;
  cursor: pointer;
`;
export const DeleteButton = styled.button`
  margin-left: 10px;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: transparent;
`;

export const ModalList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const ModalListItem = styled.li`
  margin: 5px 0;
`;
