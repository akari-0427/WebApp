import React, { useEffect, useState } from 'react';
import db from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { GetEmployees } from './API';

function getPreviousMonthInfo(currentYear, currentMonth) {
    // 1ヶ月前の月と年を計算
    let previousMonth = currentMonth - 1;
    let previousYear = currentYear;
  
    if (previousMonth === 0) {
      // 1月の前月は12月で前年
      previousMonth = 12;
      previousYear--;
    }
  
    // 1ヶ月前の月の最終日を計算
    const lastDay = new Date(previousYear, previousMonth, 0);
    const numberOfDays = lastDay.getDate();
  
    return {
      previousYear,
      previousMonth,
      numberOfDays,
    };
  }
  
function Kako() {
    const [documentDataArray, setDocumentDataArray] = useState([]); // データを格納する配列
    const d = new Date();
    const currentMonth = d.getMonth() + 1; // 月は0から11の値なので+1する
    const currentYear = d.getFullYear();

// 1ヶ月前の情報を取得
    const { previousYear, previousMonth, numberOfDays } = getPreviousMonthInfo(currentYear, currentMonth);

    const names = GetEmployees();

  
    useEffect(() => {
      const fetchData = async (collectionName) => {
        try {
          const documentId = previousYear.toString()+"-"+previousMonth.toString();
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
        <h2>{previousMonth}月のシフト</h2>
        <table>
          <thead>
            <tr>
              <th>名前</th>
              {Array.from({ length: numberOfDays }, (_, i) => i + 1).map((day) => (
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
                  Array.from({ length: numberOfDays }, (_, i) => <td key={i}></td>)
                )}
              </tr>
            ))}
          </tbody>
        </table>
        <Link to="/">ホームへ</Link>
      </div>
    );
  }
  

export { Kako };
