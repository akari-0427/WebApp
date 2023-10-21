import React, { useEffect, useState } from 'react';
import db from '../firebase';
import { doc, documentId, getDoc } from 'firebase/firestore';
import {GetEmployees}from "./API.js"

function MyComponent() {
  const [documentData, setDocumentData] = useState(null);
  let d = new Date();
  const nowMonth = d.getMonth()+1;
  const nowMinutes = d.getMinutes();
  const documentId = nowMonth.toString();
  console.log(nowMonth);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const collectionName = '佐藤 一郎'; // コレクション名を指定
        const documentRef = doc(db, collectionName, documentId);
        const documentSnapshot = await getDoc(documentRef);

        if (documentSnapshot.exists()) {
          // ドキュメントが存在する場合
          const documentData = documentSnapshot.data();
          console.log('ドキュメントデータ:', documentData);
          setDocumentData(documentData);
          console.log(documentData);
        } else {
          console.log('指定されたドキュメントが存在しません。');
        }
      } catch (error) {
        console.error('データの取得エラー:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {documentData && (
        <div>
          <h2>Document Data</h2>
          <pre>{JSON.stringify(documentData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

function Shihuto() {
    const [documentDataArray, setDocumentDataArray] = useState([]); // データを格納する配列
    let d = new Date();
    const nowMonth = d.getMonth() + 1;
    const nowHours = d.getHours();
    const nowMinutes = d.getMinutes();
    const nowDay = d.getDay();
    const names = GetEmployees();
  
    useEffect(() => {
      const fetchData = async (collectionName) => {
        try {
          // ここで documentDataArray を空の配列にリセット
          setDocumentDataArray([]);
  
          const documentId = nowMonth.toString();
          const documentRef = doc(db, collectionName, documentId);
          const documentSnapshot = await getDoc(documentRef);
  
          if (documentSnapshot.exists()) {
            // ドキュメントが存在する場合
            const documentData = documentSnapshot.data();
            console.log(`ドキュメントデータ (${collectionName}):`, documentData);
            // 配列にデータを追加
            setDocumentDataArray((prevDataArray) => [...prevDataArray, documentData]);
          } else {
            console.log(`指定されたドキュメント (${collectionName}) が存在しません。`);
          }
        } catch (error) {
          console.error(`データの取得エラー (${collectionName}):`, error);
        }
      };
  
      // names 配列をループして fetchData を呼び出す
      names.forEach((employee) => {
        fetchData(employee.name); // 各名前を collectionName に設定
      });
    }, [names]);
  
    // documentDataArray 配列の内容を表示
    console.log(documentDataArray);
  
    return null;
  }
  

export default MyComponent;
