import React, { useState, useEffect } from 'react';

const accessToken = '40ce25f173f463a012405a47a988210dd40aa5ebb29b197ade7c984afda0a66c';
const companyId = 10902758;

function getRequestOptions(method, payload) {
  return {
    method: method || 'get',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + accessToken,
    },
    body: payload ? JSON.stringify(payload) : null,
  };
}


async function GetTimeClocks(id) {
  try {
    const requestUrl = `https://api.freee.co.jp/hr/api/v1/employees/${id}/time_clocks?company_id=${companyId}`;
    const response = await fetch(requestUrl, getRequestOptions());
    if (response.status === 200) {
      const responseJson = await response.json();
      const formattedRecords = responseJson.map((timeClock) => {
        const type = timeClock.type;
        const datetime = new Date(timeClock.datetime);
        const dateStr = `${datetime.getFullYear()}年 ${datetime.getMonth() + 1}月 ${datetime.getDate()}日 ${datetime.getHours()}時 ${datetime.getMinutes()}分`;
        let typeName = '';

        switch (type) {
          case 'clock_in':
            typeName = '出勤';
            break;
          case 'break_begin':
            typeName = '休憩開始';
            break;
          case 'break_end':
            typeName = '休憩終了';
            break;
          case 'clock_out':
            typeName = '退勤';
            break;
          default:
            typeName = '不明';
        }

        return {
          date: dateStr,
          type: typeName,
        };
      });

      return formattedRecords;
    } else {
      console.error('APIエラー:', response.statusText);
    }
  } catch (error) {
    console.error('APIリクエストエラー:', error);
  }

  return []; // エラー時などに空の配列を返す
}


async function PostWorkRecord(form, id) {
  try {
    // ※デバッグするには以下の変数を直接書き換える必要があります
    const selectedEmpId = id
    // inputタグのnameで取得
    const targetDate = form.target_date
    const targetTime = form.target_time
    const targetType = form.target_type
    const memo = form.memo

    console.log(form)

    const requestPayload = {
      'company_id': companyId,
      'type': targetType,
      'date': 'string', // 正しい日付情報を提供
      'datetime': targetDate + ' ' + targetTime
    }

    const requestUrl = `https://api.freee.co.jp/hr/api/v1/employees/${selectedEmpId}/time_clocks`;
    const requestOptions = getRequestOptions('POST', JSON.stringify(requestPayload));
    const response = await fetch(requestUrl, requestOptions);
    const responseJson = await response.json();
    console.log(responseJson)

    if (response.status === 201) {
      console.log(responseJson);
      return '登録しました';
    } else {
      console.error(responseJson);
      return responseJson.message || 'エラーが発生しました';
    }
  } catch (error) {
    console.error('APIリクエストエラー:', error)
    return 'APIリクエストエラー';
  }
}



// async function GetTime(id) {
//   try {
//     const today = new Date();
//     const year = today.getFullYear();
//     const month = today.getMonth() + 1;
//     const day = today.getDate();
//     const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
//     const requestUrl = `https://api.freee.co.jp/hr/api/v1/employees/${id}/time_clocks?company_id=${companyId}&from_date=${formattedDate}`;

//     const response = await fetch(requestUrl, getRequestOptions());

//     if (response.status === 200) {
//       const responseJson = await response.json();
//       console.log(responseJson);
//       return responseJson;
//     } else {
//       console.error('APIエラー:', response.statusText);
//       return null;
//     }
//   } catch (error) {
//     console.error('APIリクエストエラー:', error);
//     return null;
//   }
// }


// function PostTime(id){
//   useEffect(() => {
//     async function fetchEmployees() {
//         try {
//             const requestUrl = `https://api.freee.co.jp/hr/api/v1/employees/${id}/time_clocks`;
//             const response = await fetch(requestUrl, getRequestOptions('POST'));

//             if (response.status === 200) {
//                 const responseJson = await response.json();
//                 // const employeeInfo = responseJson.map((employee) => {
//                 //   return {
//                 //     id: employee.id,
//                 //     name: employee.display_name,
//                 //   };
//                 // });
//                 // console.log(responseJson);
//                 // setEmployees(employeeInfo);
//                 console.log(responseJson);
               
//             } else {
//                 console.error('APIエラー:', response.statusText);
//             }
//         } catch (error) {
//             console.error('APIリクエストエラー:', error);
//         }
//     }
//     fetchEmployees();
// }, []);

// return null;

// }

function CompanyName() {
  const [companyName, setCompanyName] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const requestUrl = `https://api.freee.co.jp/api/1/companies/${companyId}`;
        const response = await fetch(requestUrl, getRequestOptions('GET'));
        if (response.status === 200) {
          const responseJson = await response.json();
          const companyName = responseJson.company.display_name;
          setCompanyName(companyName);
        } else {
          console.error('APIエラー:', response.statusText);
        }
      } catch (error) {
        console.error('APIリクエストエラー:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      {companyName ? (
        <div>
          <h1>企業名: {companyName}</h1>
        </div>
      ) : (
        <p>データを読み込んでいます...</p>
      )}
    </div>
  );
}

function GetEmployees() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
      async function fetchEmployees() {
          try {
              const requestUrl = `https://api.freee.co.jp/hr/api/v1/companies/${companyId}/employees?limit=50&with_no_payroll_calculation=true`;
              const response = await fetch(requestUrl, getRequestOptions('GET'));

              if (response.status === 200) {
                  const responseJson = await response.json();
                  const employeeInfo = responseJson.map((employee) => {
                    return {
                      id: employee.id,
                      name: employee.display_name,
                    };
                  });
                  console.log(responseJson);
                  setEmployees(employeeInfo);
                 
              } else {
                  console.error('APIエラー:', response.statusText);
              }
          } catch (error) {
              console.error('APIリクエストエラー:', error);
          }
      }
      fetchEmployees();
  }, []);

  return employees;
}

async function GetEmployeesNumber(id) {
  try {
    const requestUrl = `https://api.freee.co.jp/hr/api/v1/companies/${companyId}/employees?limit=50&with_no_payroll_calculation=true`;
    const response = await fetch(requestUrl, getRequestOptions('GET'));
    if (response.status === 200) {
      const responseJson = await response.json();
      const matchedEmployee = responseJson.find((employee) => employee.id == id);
      console.log(id)
      console.log(response)

      if (matchedEmployee) {
        return {
          display_name: matchedEmployee.display_name,
          // 他の必要な情報もここで追加できます
        };
      } else {
        console.error('指定したIDの従業員が見つかりませんでした');
      }
    } else {
      console.error('APIエラー:', response.statusText);
    }
  } catch (error) {
    console.error('APIリクエストエラー:', error);
  }

  return {}; // エラー時などに空のオブジェクトを返す
}



function GetNames() {
    const [employeeNames, setEmployeeNames] = useState([]);
  
    useEffect(() => {
        async function fetchEmployees() {
            try {
                const requestUrl = `https://api.freee.co.jp/hr/api/v1/companies/${companyId}/employees?limit=50&with_no_payroll_calculation=true`;
                const response = await fetch(requestUrl, getRequestOptions('GET'));
  
                if (response.status === 200) {
                    const responseJson = await response.json();
                    const names = responseJson.map((employee) => employee.display_name);
                    setEmployeeNames(names);
                    console.log(responseJson);
                   
                } else {
                    console.error('APIエラー:', response.statusText);
                }
            } catch (error) {
                console.error('APIリクエストエラー:', error);
            }
        }
        fetchEmployees();
    }, []);

   
  
    return employeeNames;
  }


async function GetActive(id) {
    try {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1;
        const day = today.getDate();
        const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
        const requestUrl = `https://api.freee.co.jp/hr/api/v1/employees/${id}/time_clocks/available_types?company_id=${companyId}&date=${formattedDate}`;

        const response = await fetch(requestUrl, getRequestOptions());

        if (response.status === 200) {
            const responseJson = await response.json();
            console.log(responseJson);
            return responseJson;
        } else {
            console.error('APIエラー:', response.statusText);
            return null;
        }
    } catch (error) {
        console.error('APIリクエストエラー:', error);
        return null;
    }
}



export { CompanyName, GetEmployees ,GetNames,GetActive,GetEmployeesNumber,PostWorkRecord,GetTimeClocks};


