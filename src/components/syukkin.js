import React, { useEffect, useState } from 'react';
import db from '../firebase';
import { collection, doc, getDocs,getDoc } from 'firebase/firestore';
import {GetEmployees}from "./API.js"

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

function Hantei(){
    let d = new Date();
    const nowHours = d.getHours();
    const nowMinutes = d.getMinutes();



}

function Hyou() {
    const [documentDataArray, setDocumentDataArray] = useState([]); // データを格納する配列
    let d = new Date();
    const nowMonth = d.getMonth() + 1;
    const nowHours = d.getHours();
    const nowMinutes = d.getMinutes();
    const nowDay = d.getDay();
    const Day = nowDay.toString();
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
            const specificField = documentData[1]; // ここで "specificField" を指定
          console.log(specificField);
            // 配列にデータを追加
            setDocumentDataArray((prevDataArray) => [...prevDataArray, specificField]);
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
  
  

export  default Hyou;
