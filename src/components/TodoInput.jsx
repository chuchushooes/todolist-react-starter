import clsx from 'clsx';
import styled from 'styled-components';

const StyledAddTodoContainer = styled.div`
  min-height: 52px;
  display: flex;
  align-items: center;
  position: relative;
  word-wrap: break-word;
  word-break: break-word;
  padding: 0 12px;
  box-shadow: 0 17px 0 -16px #e5e5e5;
  flex-wrap: wrap;

  &.active {
    box-shadow: 0 17px 0 -16px var(--major);
  }
`;

const StyledLabelIcon = styled.label`
  display: inline-flex;
  font-size: 30px;
  transition: color 0.2s ease-out;
  font-weight: 300;

  &:after {
    content: '+';
  }
`;

const StyledInputContainer = styled.div`
  min-height: 52px;
  display: flex;
  align-items: center;
  flex: 1;
  user-select: none;

  input {
    flex: 1;
    padding: 8px 12px;
    border: 0;
    outline: 0;
    font-size: 1rem;

    &::placeholder {
      color: var(--major);
      font-size: 13px;
    }
  }
  $.active {
    input::placeholder {
      color: var(--gray);
    }
  }
`;

const StyledAddTodoActionContainer = styled.div`
  button {
    font-size: 13px;
    color: var(--major);
    padding-right: 5px;
    display: none;
  }

  &.active {
    button {
      display: block;
    }
  }
`;

// 這是輸入欄位
// inputValue 使用者當前輸入的值，onChange監聽輸入框表單，onKeyDown監聽使用者按下Enter，onAddTodo監聽使用者點及新增按鈕
const TodoInput = ({ inputValue, onChange, onKeyDown, onAddTodo }) => {
  const handleOnchange = (e) => {
    console.log(onChange);
    onChange?.(e.target.value);
    /*
    '?'為語法糖，等同如下，如果有 onChange 才繼續，避免 undefined 產生 error
    if (onChange) {
      onChange(e.target.value); 
    }
    */
  };

  const handleOnclick = () => {
    onAddTodo?.(inputValue);
  };

  return (
    <StyledAddTodoContainer
      className={clsx('', { active: inputValue.length > 0 })}
    >
      <StyledLabelIcon className="icon" htmlFor="add-todo-input" />
      <StyledInputContainer>
        <input
          id="add-todo-input"
          type="text"
          placeholder="新增工作"
          value={inputValue}
          onChange={handleOnchange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onKeyDown?.(inputValue);
            }
          }}
          /*onKeyDown是一個事件監聽，他會監聽鍵盤發出的name值，
          我們的目標是當使用者按下enter發送，所以要讓e.key = 'Enter' 才可執行
          接著就和 handleOnclick 一樣 onKeyDown prop 回傳 inputValue
          */
        />
      </StyledInputContainer>
      <StyledAddTodoActionContainer
        className={clsx('', { active: inputValue.length > 0 })}
      >
        <button className="btn-reset" onClick={handleOnclick}>
          新增
        </button>
      </StyledAddTodoActionContainer>
    </StyledAddTodoContainer>
  );
};

export default TodoInput;
