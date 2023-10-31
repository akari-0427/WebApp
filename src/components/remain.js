import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import db from '../firebase';

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


function GetZansu() {
    const [documentDataArray, setDocumentDataArray] = useState([]);
    async function GetZansu() {
        try {
          const today = new Date();
          const thisMonth = today.getMonth() + 1;
          const lastMonth = (today.getMonth() + 12) % 12;
          const lastDayOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
          const lastDay = lastDayOfLastMonth.getDate();
          const yesterday = today.getDate() - 1;
      
          // 名前のデータを非同期で取得
          const names = await NameSyutoku();
      
          const namesCount = Object.keys(names[0]).length;
      
          const zansuData = [];
      
          for (let i = 0; i < namesCount; i++) {
            const month1 = thisMonth.toString() + "月";
            const month2 = lastMonth.toString() + "月";
      
            const name = names[0][i];
            const documentRef1 = doc(db, name, month1);
            const documentRef2 = doc(db, name, month2);
      
            const documentSnapshot1 = await getDoc(documentRef1);
            const documentSnapshot2 = await getDoc(documentRef2);
      
            const dailyData1 = [];
            const dailyData2 = [];
      
            for (let day = 1; day <= lastDay; day++) {
              dailyData1.push(documentSnapshot1.data()[day.toString()] || null);
            }
      
            for (let day = 1; day <= yesterday; day++) {
              dailyData2.push(documentSnapshot2.data()[day.toString()] || null);
            }
      
            zansuData.push([dailyData2, dailyData1]);
          }
      
          console.log(zansuData);
          setDocumentDataArray(zansuData)
      
          // ここで zansuData を使って必要な処理を実行できます
        } catch (error) {
          console.error('エラー:', error);
        }
      }
      
      GetZansu();
      
      return documentDataArray;
}

export { NameSyutoku ,GetZansu};
