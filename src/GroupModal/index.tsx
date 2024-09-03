import React, { useState, useEffect } from "react";
import * as S from "./index.styles";

interface GroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddGroup: (groupName: string) => void;
}

const GroupModal: React.FC<GroupModalProps> = ({
  isOpen,
  onClose,
  onAddGroup,
}) => {
  const [newGroup, setNewGroup] = useState("");
  const [groupList, setGroupList] = useState<string[]>(() => {
    // 로컬 스토리지에서 그룹 목록 불러오기
    const savedGroups = localStorage.getItem("groups");
    return savedGroups ? JSON.parse(savedGroups) : [];
  });
  useEffect(() => {
    // 로컬 스토리지에서 그룹 목록 불러오기
    const savedGroups = localStorage.getItem("groups");
    if (savedGroups) {
      setGroupList(JSON.parse(savedGroups));
    }
  }, []);

  useEffect(() => {
    // 그룹 목록이 변경될 때 로컬 스토리지에 저장
    localStorage.setItem("groups", JSON.stringify(groupList));
  }, [groupList]);

  const handleAddGroup = () => {
    if (newGroup.trim() && !groupList.includes(newGroup)) {
      setGroupList((prevList) => [...prevList, newGroup.trim()]);
      onAddGroup(newGroup.trim());
      setNewGroup("");
    }
  };

  const handleDeleteGroup = (groupName: string) => {
    setGroupList((prevList) => prevList.filter((group) => group !== groupName));
  };

  if (!isOpen) return null;

  return (
    <S.ModalOverlay>
      <S.ModalCloseButton onClick={onClose}>닫기</S.ModalCloseButton>

      <S.ModalContent>
        <h3>그룹 관리</h3>
        {groupList.length > 0 ? (
          <ul>
            {groupList.map((group, index) => (
              <div key={index}>
                {group}
                <S.DeleteButton onClick={() => handleDeleteGroup(group)}>
                  X
                </S.DeleteButton>
              </div>
            ))}
          </ul>
        ) : (
          <p>등록된 그룹이 없습니다.</p>
        )}
        <input
          type="text"
          placeholder="새 그룹 이름"
          value={newGroup}
          onChange={(e) => setNewGroup(e.target.value)}
        />
        <S.ModalButton onClick={handleAddGroup}>추가</S.ModalButton>
      </S.ModalContent>
    </S.ModalOverlay>
  );
};

export default GroupModal;
