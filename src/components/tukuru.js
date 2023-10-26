import React, { useState } from 'react';
import { GetEmployees } from "./API.js"


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
//   const employees = GetEmployees();
//   const today = new Date();
//   const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
//   const lastDay = new Date(nextMonth.getFullYear(), nextMonth.getMonth() + 1, 0);
//   const numberOfDays = lastDay.getDate();
//   const [shiftData, setShiftData] = useState(() =>
//     employees.map(() => Array(numberOfDays).fill(''))
//   );

//   const handleShiftChange = (employeeIndex, day, value) => {
//     setShiftData((prevData) => {
//       const newData = [...prevData];
//       newData[employeeIndex] = [...newData[employeeIndex]]; // 新しい配列を作成
//       newData[employeeIndex][day] = value;
//       return newData;
//     });
//   };

//   const handleSubmit = () => {
//     // 入力データを多重配列に変換する関数
//     const multiArray = shiftData;
//     console.log(multiArray);
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
//           {employees.map((employee, employeeIndex) => (
//             <tr key={employee.id}>
//               <td>{employee.name}</td>
//               {[...Array(numberOfDays).keys()].map((day) => (
//                 <td key={day + 1}>
//                   <input
//                     type="text"
//                     value={shiftData[employeeIndex][day] || ''}
//                     onChange={(e) =>
//                       handleShiftChange(employeeIndex, day, e.target.value)
//                     }
//                   />
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <button onClick={handleSubmit}>シフトデータ送信</button>
//     </div>
//   );
// }


function Sakusei(){
  const today = new Date();
  const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
  const lastDay = new Date(nextMonth.getFullYear(), nextMonth.getMonth() + 1, 0);
  const numberOfDays = lastDay.getDate();
  const names = GetEmployees();

  console.log(names);
}
export default Sakusei;
