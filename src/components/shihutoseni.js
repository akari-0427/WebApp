import React, { cloneElement, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import db from '../firebase';
import { collection, doc, getDocs,getDoc } from 'firebase/firestore';

function Seni() {
  const now = new Date();
  const currentYear = now.getFullYear();
  const nextMonth = now.getMonth() + 2; // 次の月の数字
  if(nextMonth==12){
    currentYear++;
  }
  const collectionName = `${currentYear}-${nextMonth}`;

  const [collectionExists, setCollectionExists] = useState(false);
  
  // Firestoreデータベースのインスタンスを取得

  useEffect(() => {
    const checkIfCollectionExists = async () => {
      try {
        // Firestoreからコレクションのドキュメントを取得
        const postdata = collection(db, collectionName);
        const querySnapshot = await getDocs(postdata);
        if (!querySnapshot.empty) {
          // コレクションが存在する場合
          setCollectionExists(true);
        } else {
          // コレクションが存在しない場合
          setCollectionExists(false);
        }
      } catch (error) {
        console.error('コレクションの存在確認エラー:', error);
        setCollectionExists(false);
      }
    };

    checkIfCollectionExists();
  }, [collectionName, db]);

  return (
    <div className="App">
      {collectionExists ? (
        <Link to="/edit">編集画面へ</Link>
      ) : (
        <Link to="/create">制作画面へ</Link>
      )}
    </div>
  );
}

export default Seni;
