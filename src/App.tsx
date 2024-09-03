import * as S from "./App.styles";
import SelectBox from "./SelectBox";
import GroupModal from "./GroupModal/index";
import DetailModal from "./DetailModal/index";
import useHome from "./hook/useHome";

interface PhoneNumList {
  name: string;
  phoneNum: string;
  group: string;
  desc?: string;
}
function App() {
  const {
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
  } = useHome();
  return (
    <S.Wrapper>
      <GroupModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onAddGroup={addGroup}
      />
      {isDetailModalOpen && (
        <DetailModal
          isOpen={isDetailModalOpen}
          onClose={closeDetailModal}
          index={index!}
        />
      )}

      <h1>연락처 리스트</h1>
      <S.Container>
        <S.InputBox>
          {inputFields.map((field: any, index: number) => (
            <div key={index}>
              {field.type === "select" ? (
                <S.InputWrapper>
                  <p>{field.label}</p>
                  <SelectBox
                    value={field.value}
                    onSelectChange={field.onSelectChange!}
                    options={field.options!}
                  />
                  <S.OpenModalBtn onClick={openModal}>그룹 추가</S.OpenModalBtn>
                </S.InputWrapper>
              ) : (
                <S.InputWrapper>
                  <p>{field.label}</p>
                  <S.WithErrorLabelBox>
                    <input
                      type={field.type || "text"}
                      placeholder={field.placeholder}
                      value={field.value}
                      onChange={field.onChange}
                    />
                    {field.error && <S.ErrorText>{field.error}</S.ErrorText>}
                  </S.WithErrorLabelBox>
                </S.InputWrapper>
              )}
            </div>
          ))}
          <S.SaveBtn
            onClick={() => {
              if (validateName(name) && validatePhoneNum(phoneNum))
                handleSaveClick();
              else alert("형식을 지켜주세요");
            }}
          >
            저장
          </S.SaveBtn>
        </S.InputBox>
        <S.PhoneNumListBox>
          <S.InputFieldWrapper>
            <input
              placeholder={"검색어를 입력하세요"}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // 검색어 상태 업데이트
            />
          </S.InputFieldWrapper>
          <S.PhoneNumList>
            {filteredEntries.map((item: PhoneNumList, index: number) => (
              <S.PhoneNumListItem key={index}>
                <p>{item.name}</p>
                <p>{item.phoneNum}</p>
                <p>{item.group}</p>
                <button onClick={() => handleDelete(index)}>X</button>
                <button
                  onClick={() => {
                    setIndex(index);
                    openDetailModal();
                  }}
                >
                  세부사항
                </button>
              </S.PhoneNumListItem>
            ))}
          </S.PhoneNumList>
        </S.PhoneNumListBox>
      </S.Container>
    </S.Wrapper>
  );
}

export default App;
