import React, { useState, useEffect } from 'react';
import db from '../firebase';
import { collection, doc, getDocs,getDoc,setDoc ,deleteDoc} from 'firebase/firestore';

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
      <p className='time'>{currentDateTime.toLocaleString()}</p>
    </div>
  );
}


export default DateTimeDisplay;
