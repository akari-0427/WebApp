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
    const d = new Date();
    const nowMonth = d.getMonth() + 1;
    const nowYear = d.getFullYear+1;
    const names = GetEmployees();
  
    useEffect(() => {
      const fetchData = async (collectionName) => {
        try {
          const documentId = nowMonth.toString()+"-"+nowYear.toString();
          const documentRef = doc(db, documentId, collectionName);
          const documentSnapshot = await getDoc(documentRef);
  
          if (documentSnapshot.exists()) {
            const documentData = documentSnapshot.data();
            setDocumentDataArray((prevDataArray) => {
              // 新しいデータを追加するために配列をコピー
              const newDataArray = [...prevDataArray];
  
              // フィールド名が1から31のデータを格納する配列
              const dailyData = [];
  
              for (let i = 1; i <= 31; i++) {
                // フィールド名が "1" から "31" のデータを取得して dailyData に追加
                dailyData.push(documentData[i.toString()] || null);
              }
  
              newDataArray.push(dailyData);
  
              return newDataArray;
            });
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
  
    return (
      <div>
        <h2>{nowMonth}月のシフト</h2>
        <table>
          <thead>
            <tr>
              <th>名前</th>
              {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                <th key={day}>{day}日</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {names.map((employee, index) => (
              <tr key={employee.id}>
                <td>{employee.name}</td>
                {documentDataArray[index] ? ( // 各要素が存在するかどうかを確認
                  documentDataArray[index].map((item, i) => (
                    <td key={i}>{item}</td>
                  ))
                ) : (
                  // 存在しない場合は空のセルを表示
                  Array.from({ length: 31 }, (_, i) => <td key={i}></td>)
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  
  
  

export default Shihuto;
