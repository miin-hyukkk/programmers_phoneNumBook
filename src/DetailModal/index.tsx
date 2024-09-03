import React, { useState, useEffect } from "react";
import * as S from "./index.styles";

interface PhoneNumList {
  name: string;
  phoneNum: string;
  group: string;
  desc?: string;
}

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  index: number;
}

const DetailModal: React.FC<DetailModalProps> = ({
  isOpen,
  onClose,
  index,
}) => {
  const [info, setInfo] = useState<PhoneNumList[]>([]); // PhoneNumList[] 타입으로 선언

  useEffect(() => {
    // 로컬 스토리지에서 그룹 목록 불러오기
    const storedList = localStorage.getItem("list");
    if (storedList) {
      try {
        const parsedList = JSON.parse(storedList) as PhoneNumList[]; // JSON 파싱
        setInfo(parsedList);
      } catch (error) {
        console.error("Failed to parse stored list:", error);
      }
    }
  }, []);

  if (!isOpen || index >= info.length) return null; // index 유효성 체크

  const currentItem = info[index];

  return (
    <S.ModalOverlay>
      <S.ModalCloseButton onClick={onClose}>닫기</S.ModalCloseButton>

      <S.ModalContent>
        <p>이름 : {currentItem.name}</p>
        <p>번호 : {currentItem.phoneNum}</p>
        <p>그룹 : {currentItem.group}</p>
        <p>설명 : {currentItem.desc}</p>
      </S.ModalContent>
    </S.ModalOverlay>
  );
};

export default DetailModal;
