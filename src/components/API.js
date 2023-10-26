import React, { useState, useEffect } from 'react';

const accessToken = '016ec907a4a77ff09cc0d6b65818b8b78d5e79b05125f2c15dba5490e106c211';
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



export { CompanyName, GetEmployees ,GetNames,GetActive};


