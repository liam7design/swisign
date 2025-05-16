import React, { createContext, useContext, useState } from 'react';

const MemoContext = createContext();

export const useMemoContext = () => useContext(MemoContext);

export const MemoProvider = ({ children }) => {
  const [memos, setMemos] = useState({}); // { scheduleId: [memo, ...] }

  const addMemo = (scheduleId, memo) => {
    setMemos(prev => {
      const prevList = prev[scheduleId] || [];
      if (prevList.length >= 3) return prev; // 최대 3개 제한
      return {
        ...prev,
        [scheduleId]: [...prevList, memo]
      };
    });
  };

  const editMemo = (scheduleId, idx, newMemo) => {
    setMemos(prev => ({
      ...prev,
      [scheduleId]: prev[scheduleId].map((m, i) => i === idx ? newMemo : m)
    }));
  };

  const deleteMemo = (scheduleId, idx) => {
    setMemos(prev => ({
      ...prev,
      [scheduleId]: prev[scheduleId].filter((_, i) => i !== idx)
    }));
  };

  return (
    <MemoContext.Provider value={{ memos, addMemo, editMemo, deleteMemo }}>
      {children}
    </MemoContext.Provider>
  );
};