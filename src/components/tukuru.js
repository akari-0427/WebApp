import React, { useState,useEffect } from 'react';
import { GetEmployees } from "./API.js"
import db from '../firebase';
import { collection, doc, getDocs,getDoc,setDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { RestData,NextMonthData } from './sihuto.js';


// function Sakusei() {
//   const ShiftSchedule = ({ employees }) => {
//     const [shiftData, setShiftData] = useState({});
//     const daysInMonth = 31;

//     const handleShiftChange = (name, date, shift) => {
//       setShiftData((prevShiftData) => ({
//         ...prevShiftData,
//         [name]: {
//           ...prevShiftData[name],
//           [date]: shift,
//         },
//       }));
//     };

//     const saveShiftData = () => {
//       // シフト情報を保存する処理を実装
//       console.log('保存されたシフト情報:', shiftData);
//     };

//     return (
//       <div>
//         <table>
//           <thead>
//             <tr>
//               <th>名前</th>
//               {[...Array(daysInMonth).keys()].map((day) => (
//                 <th key={day + 1}>{day + 2}日</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {employees.map((employee) => (
//               <tr key={employee.id}>
//                 <td>{employee.name}</td>
//                 {[...Array(daysInMonth).keys()].map((day) => (
//                   <td key={day + 2}>
//                     <input
//                       type="text"
//                       value={shiftData[employee.name]?.[day + 2] || ''}
//                       onChange={(e) =>
//                         handleShiftChange(
//                           employee.name,
//                           day + 2,
//                           e.target.value
//                         )
//                       }
//                     />
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <button onClick={saveShiftData}>シフト情報を保存</button>
//       </div>
//     );
//   };
// }

// function Sakusei() {
//   const today = new Date();
//   const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
//   const lastDay = new Date(nextMonth.getFullYear(), nextMonth.getMonth() + 1, 0);
//   const numberOfDays = lastDay.getDate();
//   const [shiftData, setShiftData] = useState(new Array(numberOfDays).fill(''));
//   const [names, setNames] = useState([]); // ユーザーの名前を格納
//   const names1=GetEmployees();
//   useEffect(() => {
//     // ページがロードされた際に GetEmployees() から名前を取得
//     const fetchedNames = names1.map(employee => employee.name); // 名前を抽出
//     setNames(fetchedNames);
//   }, []); // [] 内の変数が変化したときに再実行される
//   // データを保存するための関数
//   const saveData = (data) => {
//     setShiftData(data);
//   };

//   // テキストフィールドの変更を処理する関数
//   const handleShiftChange = (index, value) => {
//     const newData = [...shiftData];
//     newData[index] = value;
//     saveData(newData);
//   };

//   // データ送信ボタンをクリックしたときの処理
//   const handleSubmit = () => {
//     // 1行ずつコンソールに表示
//     shiftData.forEach((row, rowIndex) => {
//       console.log(`名前: ${names[rowIndex]}, データ: ${row}`);
//     });
//   };

//   return (
//     <div>
//       <table>
//         <thead>
//           <tr>
//             <th>名前</th>
//             {[...Array(numberOfDays).keys()].map((day) => (
//               <th key={day + 1}>{day + 1}日</th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {names1.map((name, employeeIndex) => (
//             <tr key={employeeIndex}>
//               <td>{name.name}</td> {/* 実際の名前を表示 */}
//               {shiftData.map((value, index) => (
//                 <td key={index}>
//                   <input
//                     type="text"
//                     value={value}
//                     onChange={(e) => handleShiftChange(index, e.target.value)}
//                   />
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <button onClick={handleSubmit}>データ送信</button>
//     </div>
//   );
// }


// function Sakusei(){
//   const today = new Date();
//   const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
//   const lastDay = new Date(nextMonth.getFullYear(), nextMonth.getMonth() + 1, 0);
//   const numberOfDays = lastDay.getDate();
//   const names = GetEmployees();
//   const [shiftData, setShiftData] = useState({});

//   console.log(names);
//   return(
//     <div>
//         <table>
//           <thead>
//             <tr>
//               <th>名前</th>
//               {Array.from({ length: numberOfDays }, (_, i) => i + 1).map((day) => (
//                 <th key={day}>{day}日</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {names.map((employee, index) => (
//               <tr key={employee.id}>
//                 <td>{employee.name}</td>
//               </tr>
//             ))}


//           </tbody>
//         </table>
//       </div>
//   );
// }


// function Sakusei() {
//   const today = new Date();
//   const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
//   const lastDay = new Date(nextMonth.getFullYear(), nextMonth.getMonth() + 1, 0);
//   const numberOfDays = lastDay.getDate();
//   const [data, setData] = useState([]);
//   const [results, setResults] = useState([]);
//   const names =  GetEmployees();

//   useEffect(() => {
//     // GetEmployees()から名前を取得
//     const fetchNames = async () => {
//       try {
//         const length = names.length;
//         const initialData = new Array(length).fill([]).map(() => Array(numberOfDays).fill(''));
//         setData(initialData);
//       } catch (error) {
//         // エラーハンドリング
//         console.error("データの取得中にエラーが発生しました:", error);
//       }
//     };

//     fetchNames();
//   }, [names]);

//   const handleInputChange = (rowIndex, colIndex, value) => {
//     const newData = [...data];
//     newData[rowIndex][colIndex] = value;
//     setData(newData);
//   };

//   const handleDisplayData = () => {
//     const newData = []; // 新しいデータ配列
  
//     data.forEach((row, rowIndex) => {
//       const rowData = row.map((value) => {
//         return `${value}`;
//       });
//       const newRowData = {
//         row: rowIndex + 1,
//         data: rowData,
//       };
//       newData.push(newRowData);
//     });
  
//     // results ステートにデータを追加
//     setResults(newData);
//     console.log(results[1].data[2])//ひとつのデータを取れる
//   };
  
  

//   return (
//     <div>
//       <h1>データ入力</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>名前</th>
//             {[...Array(numberOfDays).keys()].map((day) => (
//               <th key={day + 1}>{day + 1}日</th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((row, rowIndex) => (
//             <tr key={rowIndex}>
//               <td>{names[rowIndex].name}</td>
//               {row.map((value, colIndex) => (
//                 <td key={colIndex}>
//                   <input
//                     type="text"
//                     value={value}
//                     onChange={(e) =>
//                       handleInputChange(rowIndex, colIndex, e.target.value)
//                     }
//                   />
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <button onClick={handleDisplayData}>データ表示</button>
//     </div>
//   );
// }
function Sakusei() {
  const today = new Date();
  const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
  const lastDay = new Date(nextMonth.getFullYear(), nextMonth.getMonth() + 1, 0);
  const numberOfDays = lastDay.getDate();
  const [results, setResults] = useState([]);
  const names =  GetEmployees();
  const nextMonthYear = nextMonth.getFullYear();
  const nextMonthNumber = nextMonth.getMonth()+1;
  const [documentDataArray, setDocumentDataArray] = useState([]);
  const resnt = RestData(documentDataArray, setDocumentDataArray);
  const [data, setData] = useState(resnt);
  //console.log(resnt[0][1])
  const sendDocumentToFirestore = (documentID, fieldName, value) => {
    //const docRef = db.collection(nextMonthYear+"-"+nextMonthNumber).doc(documentID);
  
    // フィールド名を日数から生成
    const fieldObject = {};
    fieldObject[fieldName] = value;
  
    // docRef.set(fieldObject)
    //   .then(() => {
    //     console.log(`ドキュメント ${documentID} にデータをFirestoreに送信しました`);
    //   })
    //   .catch((error) => {
    //     console.error(`ドキュメント ${documentID} へのデータ送信中にエラーが発生しました`, error);
    //   });
  };

  useEffect(() => {
    // GetEmployees()から名前を取得
    // const fetchNames = async () => {
    //   try {
    //     const length = names.length;
    //     const initialData = new Array(length).fill([]).map(() => Array(numberOfDays).fill(''));
    //     setData(initialData);
    //   } catch (error) {
    //     // エラーハンドリング
    //     console.error("データの取得中にエラーが発生しました:", error);
    //   }
    // };

    // fetchNames();
    
    setData(resnt);
    console.log(data)
  }, [resnt]);

  const handleInputChange = (rowIndex, colIndex, value) => {
    const newData = [...data];
    newData[rowIndex][colIndex] = value;
    setData(newData);
  };

  const handleDisplayData = () => {
    const newCollectionName = nextMonthYear+'-'+nextMonthNumber;
    console.log(newCollectionName)
    const newCollection = collection(db, newCollectionName);
    data.forEach((row, rowIndex) => {
      const documentID = names[rowIndex].name; // ドキュメントIDを名前から取得
      const newDocRef = doc(newCollection, documentID);
      const dataset = {}; // データを保存するための空のオブジェクト

      row.forEach((value, colIndex) => {
        const fieldName = `${colIndex + 1}`; // フィールド名を日数から生成
        dataset[fieldName] = value; // データをフィールド名と共にオブジェクトに保存
      });
    
      // Firestoreにデータをセット
      setDoc(newDocRef, dataset);
    });
    
      // setDoc(newDocRef, data[rowIndex]);
    
    console.log(data);
    
  };

  return (
    <div>
      <h1>データ入力</h1>
      <table>
        <thead>
          <tr>
            <th>名前</th>
            {[...Array(numberOfDays).keys()].map((day) => (
              <th key={day + 1}>{day + 1}日</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td>{names[rowIndex].name}</td>
              {row.map((value, colIndex) => (
                <td key={colIndex}>
                  <input
                    type="text"
                    value={value||""}
                    onChange={(e) =>
                      handleInputChange(rowIndex, colIndex, e.target.value)
                    }
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/confirm">
        <button onClick={handleDisplayData}>作成する</button>
      </Link>
    </div>
  );
}

function Kakunin(){
  const today = new Date();
  const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
  const lastDay = new Date(nextMonth.getFullYear(), nextMonth.getMonth() + 1, 0);
  const numberOfDays = lastDay.getDate();
  const [data, setData] = useState([]);
  const [results, setResults] = useState([]);
  const [documentDataArray, setDocumentDataArray] = useState([]);
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
  return (
    <div>
      <h2>{nextMonthNumber}月のシフト</h2>
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

function Hensyu(){
  const today = new Date();
  const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
  const lastDay = new Date(nextMonth.getFullYear(), nextMonth.getMonth() + 1, 0);
  const numberOfDays = lastDay.getDate();
  const [results, setResults] = useState([]);
  const names =  GetEmployees();
  const nextMonthYear = nextMonth.getFullYear();
  const nextMonthNumber = nextMonth.getMonth()+1;
  const [documentDataArray, setDocumentDataArray] = useState([]);
  const nextMonthdata = NextMonthData(documentDataArray, setDocumentDataArray);
  const [data, setData] = useState(nextMonthdata);

  useEffect(() => {
    // GetEmployees()から名前を取得
    // const fetchNames = async () => {
    //   try {
    //     const length = names.length;
    //     const initialData = new Array(length).fill([]).map(() => Array(numberOfDays).fill(''));
    //     setData(initialData);
    //   } catch (error) {
    //     // エラーハンドリング
    //     console.error("データの取得中にエラーが発生しました:", error);
    //   }
    // };

    // fetchNames();
    setData(nextMonthdata);
    console.log(data)
  }, [nextMonthdata]);

  const handleInputChange = (rowIndex, colIndex, value) => {
    const newData = [...data];
    newData[rowIndex][colIndex] = value;
    setData(newData);
  };

  const handleDisplayData = () => {
    const newCollectionName = nextMonthYear+'-'+nextMonthNumber;
    console.log(newCollectionName)
    const newCollection = collection(db, newCollectionName);
    data.forEach((row, rowIndex) => {
      const documentID = names[rowIndex].name; // ドキュメントIDを名前から取得
      const newDocRef = doc(newCollection, documentID);
      const dataset = {}; // データを保存するための空のオブジェクト

      row.forEach((value, colIndex) => {
        const fieldName = `${colIndex + 1}`; // フィールド名を日数から生成
        dataset[fieldName] = value; // データをフィールド名と共にオブジェクトに保存
      });
    
      // Firestoreにデータをセット
      setDoc(newDocRef, dataset);
    });
    
      // setDoc(newDocRef, data[rowIndex]);
    
    console.log(data);
    
  };

  return (
    <div>
      <h1>データ入力</h1>
      <table>
        <thead>
          <tr>
            <th>名前</th>
            {[...Array(numberOfDays).keys()].map((day) => (
              <th key={day + 1}>{day + 1}日</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td>{names[rowIndex].name}</td>
              {row.map((value, colIndex) => (
                <td key={colIndex}>
                  <input
                    type="text"
                    value={value||""}
                    onChange={(e) =>
                      handleInputChange(rowIndex, colIndex, e.target.value)
                    }
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/confirm">
        <button onClick={handleDisplayData}>作成する</button>
      </Link>
    </div>
  );
}

export {Sakusei,Hensyu,Kakunin};
