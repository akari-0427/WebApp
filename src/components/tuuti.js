import { format, addDays } from 'date-fns';
import { updateDoc, doc } from 'firebase/firestore';
import db from '../firebase';

function time() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1; 
  const day = today.getDate();
  const formattedDate = year + "-" + month + "-" + day;
  return formattedDate;
}

// 既存のドキュメントに新しいフィールドを追加する関数
async function addFieldToDocument(collectionName, documentId, newField) {
  try {
    // ドキュメントへの参照を取得
    const myDocRef = doc(db, collectionName, documentId);

    // 既存のドキュメントに新しいフィールドを追加
    await updateDoc(myDocRef, newField);

    console.log('既存のドキュメントに新しいフィールドを追加しました。');
  } catch (error) {
    console.error('ドキュメント更新エラー:', error);
  }
}

// 遅刻の通知を追加
async function addtikoku(name,id) {
  const dateField = time();
  await addFieldToDocument('遅刻', dateField, { [id]: name });
}

// 残業の通知を追加
async function addzangyo(name,id) {
  const dateField = time();
  await addFieldToDocument('残業', dateField, { [id]: name });
}

export { addtikoku, addzangyo };
