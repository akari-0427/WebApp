import React, { useState, useEffect } from 'react';

function DateTimeDisplay() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000); // 1秒ごとに更新

    return () => {
      clearInterval(intervalId); // コンポーネントがアンマウントされたときにクリーンアップ
    };
  }, []);

  return (
    <div>
      <p>{currentDateTime.toLocaleString()}</p>
    </div>
  );
}

export default DateTimeDisplay;
