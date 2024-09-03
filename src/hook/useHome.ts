import { useEffect, useState } from "react";
interface PhoneNumList {
  name: string;
  phoneNum: string;
  group: string;
  desc?: string;
}
export default function useHome() {
  const [name, setName] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [group, setGroup] = useState("");
  const [desc, setDesc] = useState("");
  const [nameError, setNameError] = useState<string | null>(null);
  const [phoneNumError, setPhoneNumError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [index, setIndex] = useState<number>();

  const [groups, setGroups] = useState<string[]>(() => {
    const savedGroups = localStorage.getItem("groups");
    return savedGroups ? JSON.parse(savedGroups) : [];
  });
  const [searchTerm, setSearchTerm] = useState(""); // 검색어를 위한 상태

  const [entries, setEntries] = useState<PhoneNumList[]>(() => {
    const savedList = localStorage.getItem("list");
    return savedList ? JSON.parse(savedList) : [];
  });

  const onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value;
    setName(newName);
    if (newName.trim() === "") {
      setNameError(null); // 빈 문자열인 경우 오류 메시지 제거
    } else if (!validateName(newName)) {
      setNameError("이름은 두 글자 이상의 한글만 포함되어야 합니다.");
    } else {
      setNameError(null);
    }
  };

  const onChangePhoneNum = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPhoneNum = event.target.value;
    setPhoneNum(newPhoneNum);
    if (newPhoneNum.trim() === "") {
      setPhoneNumError(null); // 빈 문자열인 경우 오류 메시지 제거
    } else if (!validatePhoneNum(newPhoneNum)) {
      setPhoneNumError("전화번호는 010-0000-0000 형식이어야 합니다.");
    } else {
      setPhoneNumError(null);
    }
  };
  const handleSelectGroupChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setGroup(event.target.value);
  };
  const onChangeDesc = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDesc(event.target.value);
  };
  const validateName = (name: string): boolean => {
    // 예: 이름은 알파벳과 공백만 포함되어야 함
    const nameRegex = /^[가-힣]{2,}$/;
    return nameRegex.test(name);
  };

  const validatePhoneNum = (phoneNum: string): boolean => {
    // 예: 전화번호는 10~11자리 숫자만 허용
    const phoneRegex = /^010-\d{4}-\d{4}$/;
    return phoneRegex.test(phoneNum);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const openDetailModal = () => {
    setIsDetailModalOpen(true);
  };

  const closeDetailModal = () => {
    setIsDetailModalOpen(false);
  };
  const addGroup = (groupName: string) => {
    setGroups((prevGroups) => [...prevGroups, groupName]);
  };

  // 리스트에 추가하는 함수
  const addToPhoneNumList = (item: PhoneNumList) => {
    // 로컬 스토리지에서 기존 리스트를 가져옴
    const existingList = localStorage.getItem("list");

    // 기존 리스트가 있으면 파싱하고, 없으면 빈 배열 사용
    const parsedList: PhoneNumList[] = existingList
      ? JSON.parse(existingList)
      : [];

    // 새로운 요소를 기존 리스트에 추가
    const updatedList = [...parsedList, item];

    // 업데이트된 리스트를 로컬 스토리지에 저장
    localStorage.setItem("list", JSON.stringify(updatedList));
  };
  const handleSaveClick = () => {
    // 현재 입력된 데이터를 객체로 생성
    const newItem: PhoneNumList = {
      name,
      phoneNum,
      group,
      desc,
    };

    // 리스트에 추가
    addToPhoneNumList(newItem);

    // 입력 필드 초기화
    setName("");
    setPhoneNum("");
    setGroup("");
    setDesc("");
  };

  const inputFields = [
    {
      label: "이름",
      placeholder: "이름",
      value: name,
      onChange: onChangeName,
      type: "text",
      error: nameError,
    },
    {
      label: "전화번호",
      placeholder: "전화번호",
      value: phoneNum,
      onChange: onChangePhoneNum,
      type: "text",
      error: phoneNumError,
    },
    {
      label: "그룹",
      value: group,
      onSelectChange: handleSelectGroupChange,
      type: "select",
      options: groups,
    },
    {
      label: "간단한 설명",
      placeholder: "간단한 설명",
      value: desc,
      onChange: onChangeDesc,
      type: "text",
    },
  ];
  useEffect(() => {
    const storedList = localStorage.getItem("list");
    if (storedList) {
      setEntries(JSON.parse(storedList));
    }
  }, [localStorage.getItem("list")]);

  const handleDelete = (indexToDelete: number) => {
    const updatedEntries = entries.filter(
      (_, index) => index !== indexToDelete,
    );
    setEntries(updatedEntries);
    localStorage.setItem("list", JSON.stringify(updatedEntries));
  };
  const filteredEntries = entries.filter(
    (item) =>
      item.name.includes(searchTerm) ||
      item.phoneNum.includes(searchTerm) ||
      item.group.includes(searchTerm),
  );
  return {
    isModalOpen,
    closeModal,
    addGroup,
    isDetailModalOpen,
    closeDetailModal,
    index,
    inputFields,
    openModal,
    validateName,
    validatePhoneNum,
    name,
    phoneNum,
    handleSaveClick,
    searchTerm,
    setSearchTerm,
    filteredEntries,
    setIndex,
    handleDelete,
    openDetailModal,
  };
}
