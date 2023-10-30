import React, { useEffect, useState } from 'react';
import db from '../firebase';
import { collection, doc, getDocs,getDoc } from 'firebase/firestore';
import {GetEmployees,GetActive}from "./API.js"

function Hantei2() {
    const [data, setData] = useState([]); // データを格納するステート変数
    let d = new Date();
    const nowHours = d.getHours();
    const nowMinutes = d.getMinutes();
    const names = GetEmployees();
    console.log(names[1]);
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const postdata = collection(db, '佐藤 一郎');
                const querySnapshot = await getDocs(postdata);

                // Firestoreから取得したデータを多重配列に格納
                const newDataArray = querySnapshot.docs.map((doc) => {
                    const docData = doc.data();
                    return Object.values(docData); // ドキュメントのデータを配列に変換
                });

                // 多重配列をdataステート変数に設定
                setData(newDataArray);

                console.log(newDataArray);
            } catch (error) {
                console.error('データの取得エラー:', error);
            }
        };

        fetchData();
    }, []);

    // dataステート変数の内容を表示
    console.log(data);

    return null;
}

function Hyou() {
  const [documentDataArray, setDocumentDataArray] = useState([]);
  const [hanteiArray, setHanteiArray] = useState([]);
  const [lateCount, setLateCount] = useState(0); // 遅刻の人数の状態
  const [overtimeCount, setOvertimeCount] = useState(0); // 残業の人数の状態

  let d = new Date();
  const nowMonth = d.getMonth() + 1;
  const nowYear = d.getFullYear();
  const names = GetEmployees(); // GetEmployees の実装を確認してください
  const nowDay=d.getDay();

  useEffect(() => {
    // 初期化時に documentDataArray を空の配列にリセット
    setDocumentDataArray([]);
    setHanteiArray([]);

    // fetchData 関数の定義
    const fetchData = async (collectionName, id) => {
      try {
        const documentId = nowYear.toString()+"-"+nowMonth.toString();
        const documentRef = doc(db, documentId, collectionName); 
        const documentSnapshot = await getDoc(documentRef);

        if (documentSnapshot.exists()) {
          const documentData = documentSnapshot.data();
          console.log(documentSnapshot.data()[nowDay])//フィールド名を指定する方法パート2
          const specificField = documentData[nowDay];
          //const specificField=documentSnapshot.data()['1']
          const active = await GetActive(id); 
          const hantei = Hantei(active.available_types, specificField); 
          console.log(hantei);
          if (hantei === "遅刻") {
            // 遅刻の場合、適切に遅刻人数を増やす
            setLateCount((prevLateCount) => prevLateCount + 1);
          } else if (hantei === "残業") {
            // 残業の場合、適切に残業人数を増やす
            setOvertimeCount((prevOvertimeCount) => prevOvertimeCount + 1);
          }
          // 取得したデータを追加
          setDocumentDataArray((prevDataArray) => [...prevDataArray, specificField]);
          setHanteiArray((prevDataArray1) => [...prevDataArray1, hantei]);
          
        } else {
          console.log(`指定されたドキュメント (${collectionName}) が存在しません。`);
        }
      } catch (error) {
        console.error(`データの取得エラー (${collectionName}):`, error);
      }
    };

    // ループを外部で実行
    names.forEach((employee) => {
      fetchData(employee.name, employee.id);
    });
    
  }, [names]);

  return (
    <div>
      {lateCount > 0 ? <p>遅刻人数: {lateCount}人</p> : null}
      {overtimeCount > 0 ? <p>残業人数: {overtimeCount}人</p> : null}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>名前</th>
            <th>シフト</th>
            <th>勤務状態</th>
          </tr>
        </thead>
        <tbody>
          {names.map((employee, index) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{documentDataArray[index]}</td>
              <td>{hanteiArray[index]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
  


  function Hantei(active, sihuto1) {
    let d = new Date();
    const nowHours = d.getHours();
    const nowMinutes = d.getMinutes();
    let hantei;
    const sihuto = sihuto1[0];
    console.log(nowHours);
    const activeType = active[0];
    console.log(activeType);

    if (sihuto === "朝") {
        if (nowHours >= 8 && activeType !== 'clock_in') {
            hantei = "出勤中";
        } else if (nowHours >= 8 && activeType === 'clock_in') {
            hantei = "遅刻";
        } else if (nowHours >= 14 && activeType !== 'clock_out' && activeType !== 'clock_in') {
            hantei = "残業";
        }else{
            hantei = "休み";
        }
    } else if (sihuto === "昼") {
        if (nowHours >= 14 && activeType !== 'clock_in') {
            hantei = "出勤中";
        } else if (nowHours >= 14 && activeType === 'clock_in') {
            hantei = "遅刻";
        } else if (nowHours >= 17 && activeType !== 'clock_out' && activeType !== 'clock_in') {
            hantei = "残業";
        }else{
            hantei = "休み";
        }
    } else if (sihuto === "夜") {
        if (nowHours >= 17 && activeType !== 'clock_in') {
            hantei = "出勤中";
        } else if (nowHours >= 17 && activeType === 'clock_in') {
            hantei = "遅刻";
        } else if (nowHours >= 20 && activeType !== 'clock_out' && activeType !== 'clock_in') {
            hantei = "残業";
        }else{
            hantei = "休み";
        }
    } else if (sihuto === "休") {
        hantei = "休み";
    }

    return hantei;
}


  
  

export  default Hyou;
