import React, { useEffect, useState } from 'react';
import db from '../firebase';
import { doc, documentId, getDoc } from 'firebase/firestore';
import {GetEmployees}from "./API.js"
import { Link } from 'react-router-dom';

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

function RestData(documentDataArray, setDocumentDataArray){//ステートの更新が外部から制御され、無限ループのリスクを減らす
  //const [documentDataArray, setDocumentDataArray] = useState([]); // データを格納する配列
  const names = GetEmployees();
  const today = new Date();
  const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1);
  const lastDay = new Date(nextMonth.getFullYear(), nextMonth.getMonth() + 1, 0);
  const numberOfDays = lastDay.getDate();
  useEffect(() => {
    const fetchData = async (collectionName) => {
      try {
        const documentId = "休み希望";
        const documentRef = doc(db, documentId, collectionName); // db と doc の実装を確認してください
        const documentSnapshot = await getDoc(documentRef);

        if (documentSnapshot.exists()) {
          const documentData = documentSnapshot.data();
          setDocumentDataArray((prevDataArray) => {
            // 新しいデータを追加するために配列をコピー
            const newDataArray = [...prevDataArray];

            // フィールド名が1から31のデータを格納する配列
            const dailyData = [];

            for (let i = 1; i <= numberOfDays; i++) {
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

  return documentDataArray;
}

function NextMonthData(documentDataArray, setDocumentDataArray){//ステートの更新が外部から制御され、無限ループのリスクを減らす
  const today = new Date();
  const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
  const lastDay = new Date(nextMonth.getFullYear(), nextMonth.getMonth() + 1, 0);
  const numberOfDays = lastDay.getDate();
  const [data, setData] = useState([]);
  const [results, setResults] = useState([]);
  //const [documentDataArray, setDocumentDataArray] = useState([]);
  const names =  GetEmployees();
  const nextMonthYear = nextMonth.getFullYear();
  const nextMonthNumber = nextMonth.getMonth()+1;
  useEffect(() => {
    const fetchData = async (collectionName) => {
      try {
        const documentId = nextMonthYear.toString()+"-"+nextMonthNumber.toString();
        const documentRef = doc(db, documentId, collectionName); // db と doc の実装を確認してください
        const documentSnapshot = await getDoc(documentRef);

        if (documentSnapshot.exists()) {
          const documentData = documentSnapshot.data();
          setDocumentDataArray((prevDataArray) => {
            // 新しいデータを追加するために配列をコピー
            const newDataArray = [...prevDataArray];

            // フィールド名が1から31のデータを格納する配列
            const dailyData = [];

            for (let i = 1; i <= numberOfDays; i++) {
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
  return documentDataArray;
}




function Rest(){
  const [documentDataArray, setDocumentDataArray] = useState([]); // データを格納する配列
  const names = GetEmployees();
  const today = new Date();
  const nowDay = today.getDay();
  const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1);
  const lastDay = new Date(nextMonth.getFullYear(), nextMonth.getMonth() + 1, 0);
  const numberOfDays = lastDay.getDate();
  const month = today.getMonth();

  if(nowDay >=15){
    month = nextMonth;
  }
  
  useEffect(() => {
    const fetchData = async (collectionName) => {
      try {
        const documentId = "休み希望";
        const documentRef = doc(db, documentId, collectionName); // db と doc の実装を確認してください
        const documentSnapshot = await getDoc(documentRef);

        if (documentSnapshot.exists()) {
          const documentData = documentSnapshot.data();
          setDocumentDataArray((prevDataArray) => {
            // 新しいデータを追加するために配列をコピー
            const newDataArray = [...prevDataArray];

            // フィールド名が1から31のデータを格納する配列
            const dailyData = [];

            for (let i = 1; i <= numberOfDays; i++) {
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

  return (
    <div>
      <h2>{month}月の休み予定</h2>
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
      <Link to="/Shihuto">戻る</Link>
    </div>
  );
}

function Shihuto() {
    const [documentDataArray, setDocumentDataArray] = useState([]); // データを格納する配列
    const d = new Date();
    const nowMonth = d.getMonth() + 1;
    const nowYear = d.getFullYear();
    const names = GetEmployees();
    const lastDay = new Date(d.getFullYear(), d.getMonth() + 1, 0);
    const numberOfDays = lastDay.getDate();
  
    useEffect(() => {
      const fetchData = async (collectionName) => {
        try {
          const documentId = nowYear.toString()+"-"+nowMonth.toString();
          const documentRef = doc(db, documentId, collectionName); // db と doc の実装を確認してください
          const documentSnapshot = await getDoc(documentRef);
  
          if (documentSnapshot.exists()) {
            const documentData = documentSnapshot.data();
            setDocumentDataArray((prevDataArray) => {
              // 新しいデータを追加するために配列をコピー
              const newDataArray = [...prevDataArray];
  
              // フィールド名が1から31のデータを格納する配列
              const dailyData = [];
  
              for (let i = 1; i <= numberOfDays; i++) {
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
  
  
  

export {Shihuto,Rest,RestData,NextMonthData};
