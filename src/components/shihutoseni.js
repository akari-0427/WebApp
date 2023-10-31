import React, { cloneElement, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import db from '../firebase';
import { collection, doc, getDocs,getDoc,deleteDoc } from 'firebase/firestore';

function Seni() {
  const now = new Date();
  const currentYear = now.getFullYear();
  const nextMonth = now.getMonth() + 2; // 次の月の数字
  const nouDay = now.getDay();
  if(nextMonth==1){
    currentYear++;
  }
  const collectionName = `${currentYear}-${nextMonth}`;
  console.log(collectionName)
  const [collectionExists, setCollectionExists] = useState(false);
  console.log(collectionExists)
  
  // Firestoreデータベースのインスタンスを取得
  
  useEffect(() => {
    const checkIfCollectionExists = async () => {
      try {
        // Firestoreからコレクションのドキュメントを取得
        const collectionRef = collection(db, collectionName);
        const querySnapshot = await getDocs(collectionRef, { source: "server" });//キャッシュの問題でデータがないのにある判定されていたのでキャッシュ無効に
        console.log(querySnapshot);
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
        <Link to="/edit" className="lin">編集画面へ</Link>
      ) : (
        <div>
          <Link to="/create" className="lin">
            制作画面へ
          </Link>
          {now.getDate() > 20 && <p>まだシフトが作成されていません</p>}
        </div>
      )}
    </div>
  );
}

export default Seni;
