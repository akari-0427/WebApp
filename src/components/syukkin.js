import React, { useEffect, useState } from 'react';
import db from '../firebase';
import { collection, doc, getDocs,getDoc } from 'firebase/firestore';
import {GetEmployees,GetActive}from "./API.js"
import { addtikoku, addzangyo } from "./tuuti.js"

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
  const [lateCount, setLateCount] = useState(0);
  const [overtimeCount, setOvertimeCount] = useState(0);

  let d = new Date();
  const nowMonth = d.getMonth() + 1;
  const nowYear = d.getFullYear();
  const names = GetEmployees();
  const nowDay = d.getDate();

  useEffect(() => {
    const fetchData = async (collectionName, id) => {
      try {
        const documentId = nowYear.toString() + '-' + nowMonth.toString();
        const documentRef = doc(db, documentId, collectionName);
        const documentSnapshot = await getDoc(documentRef);

        if (documentSnapshot.exists()) {
          const documentData = documentSnapshot.data();
          const specificField = documentData[nowDay];
          const active = await GetActive(id);
          const hantei = Hantei(active.available_types, specificField, collectionName,id);

          setDocumentDataArray((prevDataArray) => [...prevDataArray, specificField]);
          setHanteiArray((prevDataArray1) => [...prevDataArray1, hantei]);

          if (hantei === '遅刻') {
            setLateCount((prevLateCount) => prevLateCount + 1);
          } else if (hantei === '残業') {
            setOvertimeCount((prevOvertimeCount) => prevOvertimeCount + 1);
          }
        } else {
          console.log(`指定されたドキュメント (${collectionName}) が存在しません。`);
        }
      } catch (error) {
        console.error(`データの取得エラー (${collectionName}):`, error);
      }
    };

    const fetchNames = async () => {
      setDocumentDataArray([]); // 前回のデータをクリア
      setHanteiArray([]); // 前回のデータをクリア
      setLateCount(0); // 前回のデータをクリア
      setOvertimeCount(0); // 前回のデータをクリア

      for (const employee of names) {
        await fetchData(employee.name, employee.id);
        // console.log(documentDataArray); // この位置での console.log は意味がない
      }
    };

    fetchNames(); // 初回のデータ取得

    const intervalId = setInterval(() => {
      // 1分ごとにデータを再取得
      fetchNames();
    }, 60000); // 1分ごとに実行

    return () => {
      // コンポーネントがアンマウントされるときにクリーンアップ
      clearInterval(intervalId);
    };
  }, [names]);

  return (
    <div>
      {lateCount > 0 ? <p className="tikoku hantei">遅刻人数: {lateCount}人</p> : null}
      {overtimeCount > 0 ? <p className="hantei">残業人数: {overtimeCount}人</p> : null}
      <table className="hyou">
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


  


  function Hantei(active, sihuto1,name,id) {
    let d = new Date();
    const nowHours = d.getHours();
    const nowMinutes = d.getMinutes();
    let hantei;
    const sihuto = sihuto1[0];
    console.log(nowHours);
    const activeType = active[0];
    console.log(activeType);
    console.log(nowMinutes)

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

    if(hantei==="遅刻"){
      if(nowMinutes===5){
        addtikoku(name,id);
        console.log("遅刻")
      }
    }else if(hantei==="残業"){
      if(nowMinutes===5){
        addtikoku(name,id);
        console.log("残業")
      }
    }

    return hantei;
}


  
  

export  default Hyou;
