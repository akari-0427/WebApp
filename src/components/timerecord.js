import React, { useState, useEffect } from 'react';
import { PostWorkRecord, GetTimeClocks, GetEmployeesNumber } from './API'; // API関数をインポートするファイルに合わせて修正してください
import { Link } from 'react-router-dom';

function Kensaku() {
  const [searchId, setSearchId] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  // 検索ボタンがクリックされたときに呼び出す関数
  const handleSearch = () => {
    // 検索処理を実行
    // searchId の値を使って検索を行う
    console.log(`検索ID: ${searchId}`);

    // 検索結果を表示するためにsearchResultステートを設定
    setSearchResult(searchId);
  };

  return (
    <div>
      <div>
      <input
      className='kensaku2'
        type="text"
        placeholder="IDを入力"
        value={searchId}
        onChange={(e) => setSearchId(e.target.value)}
      />
      <button onClick={handleSearch} className='kensaku'>検索</button>

      {searchResult !== null && <TimeRecord id={searchId} />}
      </div>
      <Link to ="/">ホームへ</Link>

    </div>
  );
}



function TimeRecord(props) {
  const number = props.id;
  console.log(number)
  const [memo, setMemo] = useState('');
  const [record, setRecord] = useState([]);
  const [targetDate, setTargetDate] = useState('');
  const [targetTime, setTargetTime] = useState('');
  const [targetType, setTargetType] = useState('clock_in');
  const [wrMessage, setWRMessage] = useState(''); // 新しいステート wrMessage を追加
  const [name, setName] = useState(''); // 初期値を設定

  // GetEmployeesNumber 関数からデータを取得
  useEffect(() => {
    async function fetchEmployeeData() {
      try {
        const response = await GetEmployeesNumber(number);
        if (response && response.display_name) {
          setName(response.display_name);
        } else {
          console.error('指定したIDの従業員が見つかりませんでした');
        }
      } catch (error) {
        console.error('APIリクエストエラー:', error);
      }
    }

    fetchEmployeeData();
  }, [number]);

  // GetTimeClocks 関数からデータを取得
  useEffect(() => {
    async function fetchTimeClockData() {
      try {
        const response = await GetTimeClocks(number);
        setRecord(response);
        console.log(record)
      } catch (error) {
        console.error('APIリクエストエラー:', error);
      }
    }

    fetchTimeClockData();
  }, [number]);

  const handleWorkRecordFormSubmit = async (e) => {
    e.preventDefault();
    setWRMessage('更新中...'); // ステートを更新

    const formObject = {
      target_date: targetDate,
      target_time: targetTime,
      target_type: targetType,
    };

    try {
      const response = await PostWorkRecord(formObject,number);
      setWRMessage(response.message);
    } catch (error) {
      console.error('APIリクエストエラー:', error);
      setWRMessage('エラーが発生しました');
    }
  };
 console.log(record)
  return (
    <div>
      <div className='name'>
        <span>名前:</span>
        <span>{name}</span>
      </div>
      <div>
        <h3>今月のタイムレコーダー履歴</h3>
        <div></div>
        <table border="1" className='record1'>
          <thead>
            <tr>
              <th>種別</th>
              <th>日時</th>
            </tr>
          </thead>
          <tbody className='record'>
            {record.map((entry, index) => (
              <tr key={index}>
                <th>{entry.type}</th>
                <th>{entry.date}</th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h3>タイムレコーダー(動作確認用)</h3>
        <form id="workRecordForm" onSubmit={handleWorkRecordFormSubmit}>
          <div>
            <label className='reco'>対象日時: </label>
            <input className='reco2' type="date" name="target_date" value={targetDate} onChange={(e) => setTargetDate(e.target.value)} />
            <input className='reco2'type="time" name="target_time" value={targetTime} onChange={(e) => setTargetTime(e.target.value)} />
            <br />
            <label className='reco'>登録種別</label>
            <select name="target_type" id="pet-select" value={targetType} onChange={(e) => setTargetType(e.target.value)}>
              <option value="clock_in">出勤</option>
              <option value="break_begin">休憩開始</option>
              <option value="break_end">休憩終了</option>
              <option value="clock_out">退勤</option>
            </select>
            <br />
            {/* <label>メモ</label>
            <input name="memo" type="text" size="50" value={memo} onChange={(e) => setMemo(e.target.value)} /> */}
            <div className="btn-frame">
              <input type="submit" value="登録" className="btn" />
              <div id="wr_submit_message">{wrMessage}</div> {/* メッセージを表示 */}
            </div>
          </div>
        </form>
      </div>
      <div>
        <div className="btn-frame">
          
        </div>
      </div>
    </div>
  );
}


export { TimeRecord ,Kensaku};
