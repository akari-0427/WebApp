import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import db from '../firebase';
import { Line } from "react-chartjs-2";


function NameSyutoku() {
  const [productData, setProductData] = useState([]);
  const [documentDataArray, setDocumentDataArray] = useState([]);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const collectionName = '商品';
        const collectionRef = collection(db, collectionName);
        const querySnapshot = await getDocs(collectionRef);

        const products = [];

        querySnapshot.forEach((doc) => {
          const product = doc.data();
          products.push(product);
        });

        setProductData(products);
      } catch (error) {
        console.error('データの取得中にエラーが発生しました:', error);
      }
    };

    fetchData();
  }, []);
  console.log(productData)
  const productArray = Object.values(productData).map((item) => Object.values(item));
  console.log(productArray);
  return productArray;
}


// function GetZansu() {
//     const [documentDataArray, setDocumentDataArray] = useState([]);
//     async function GetZansu() {
        
//         try {
//           const today = new Date();
//           const thisMonth = today.getMonth() + 1;
//           const lastMonth = (today.getMonth() + 12) % 12;
//           const lastDayOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
//           const lastDay = lastDayOfLastMonth.getDate();
//           const yesterday = today.getDate() - 1;
      
//           // 名前のデータを非同期で取得
//           const names = await NameSyutoku();
      
//           const namesCount = Object.keys(names[0]).length;
      
//           const zansuData = [];
      
//           for (let i = 0; i < namesCount; i++) {
//             const month1 = thisMonth.toString() + "月";
//             const month2 = lastMonth.toString() + "月";
      
//             const name = names[0][i];
//             const documentRef1 = doc(db, name, month1);
//             const documentRef2 = doc(db, name, month2);
      
//             const documentSnapshot1 = await getDoc(documentRef1);
//             const documentSnapshot2 = await getDoc(documentRef2);
      
//             const dailyData1 = [];
//             const dailyData2 = [];
      
//             for (let day = 1; day <= lastDay; day++) {
//               dailyData1.push(documentSnapshot1.data()[day.toString()] || null);
//             }
      
//             for (let day = 1; day <= yesterday; day++) {
//               dailyData2.push(documentSnapshot2.data()[day.toString()] || null);
//             }
      
//             zansuData.push([dailyData2, dailyData1]);
//           }
      
//           console.log(zansuData);
//           setDocumentDataArray(zansuData)
      
//           // ここで zansuData を使って必要な処理を実行できます
//         } catch (error) {
//           console.error('エラー:', error);
//         }
//       }
      
//       GetZansu();
      
//     return documentDataArray;
// }

function GetZansu() {
  const [documentDataArray, setDocumentDataArray] = useState([]);
  const today = new Date();
      const thisMonth = today.getMonth() + 1;
      const lastDayOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      const lastDay = lastDayOfLastMonth.getDate();
      const nowday=today.getDate()-1;
  async function GetZansu() {
    try {
      
      
      // 名前のデータを非同期で取得
      const names = await NameSyutoku();
      const namesCount = Object.keys(names[0]).length;

      const zansuData = [];

      for (let i = 0; i < namesCount; i++) {
        const month1 = thisMonth.toString() + "月";

        const name = names[0][i];
        const documentRef1 = doc(db, name, month1);
      
        const documentSnapshot1 = await getDoc(documentRef1);

        const dailyData1 = [];
      
        for (let day = 1; day <= nowday; day++) {
          dailyData1.push(documentSnapshot1.data()[day.toString()] || null);
        }

        zansuData.push([name, ...dailyData1]);
      }

      console.log(zansuData);
      setDocumentDataArray(zansuData);

      // ここで zansuData を使って必要な処理を実行できます
    } catch (error) {
      console.error('エラー:', error);
    }
  }

  GetZansu();

  return (
    <div>
        <div>
            <h1>{thisMonth}月の残数</h1>
        </div>
      <table>
        <thead>
          <tr>
            <th></th>
            {Array.from({ length: nowday }, (_, i) => i + 1).map((day) => (
              <th key={day}>{day}日</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {documentDataArray.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  );
}



function Hyou(){
    
    
}


// function Gurahu() {
//     const data = GetZansu();
//     const names = NameSyutoku();
//     const name = names[0];
//     const namesCount = Object.keys(name).length;
  
//     function generateLabelsForLastAndCurrentMonth() {
//       const today = new Date();
//       const lastMonthLastDay = new Date(today.getFullYear(), today.getMonth(), 0);
//       const currentMonthLastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
//       const labels = [];
  
//       for (let i = 1; i <= lastMonthLastDay.getDate(); i++) {
//         labels.push(`${lastMonthLastDay.getMonth() + 1} 月 ${i} 日`);
//       }
  
//       for (let i = 1; i < today.getDate(); i++) {
//         labels.push(`${today.getMonth() + 1} 月 ${i} 日`);
//       }
  
//       return labels;
//     }
  
//     function getRandomColor() {
//       const r = Math.floor(Math.random() * 256);
//       const g = Math.floor(Math.random() * 256);
//       const b = Math.floor(Math.random() * 256);
//       return `rgb(${r}, ${g}, ${b})`;
//     }
  
//     const labels = generateLabelsForLastAndCurrentMonth();
  
//     const datasets = [];
//     for (let i = 0; i < namesCount; i++) {
//       const dataset = {
//         label: name[i],
//         data: data[i][0], // 先月のデータ
//         borderColor: getRandomColor(),
//       };
//       datasets.push(dataset);
//     }
  
//     return (
//       <div>
//         {datasets.map((dataset, index) => (
//           <div key={index}>
//             <h2>{dataset.label}（先月）</h2>
//             <LineChart data={dataset.data} labels={labels} borderColor={dataset.borderColor} />
//           </div>
//         ))}
//       </div>
//     );
//   }
  
//   function LineChart({ data, labels, borderColor }) {
//     const chartData = {
//       labels: labels,
//       datasets: [
//         {
//           data: data,
//           fill: false,
//           borderColor: borderColor,
//         },
//       ],
//     };
  
//     const options = {
//       maintainAspectRatio: false,
//     };
  
//     return (
//       <div>
//         <Line data={chartData} options={options} />
//       </div>
//     );
//   }
  


export { NameSyutoku ,GetZansu};
