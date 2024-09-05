import React, { useState } from "react";
import "./app.css";

function App() {
  // [현재 국가 목록, 국가 목록을 업데이트하는 메서드] = useState(초기값)
  const [countries, setCountries] = useState([]);
  // [국가이름, 국가이름을 업데이트하는 메서드]
  const [countryName, setCountryName] = useState("");
  // [금메달 수, 금메달 수를 업데이트하는 메서드]
  const [goldMedal, setGoldMedal] = useState(0);
  // [은메달 수, 은메달 수를 업데이트하는 메서드]
  const [silverMedal, setSilverMedal] = useState(0);
  // [동메달 수, 동메달 수를 업데이트하는 메서드]
  const [bronzeMedal, setBronzeMedal] = useState(0);

  // 사용자가 국가이름 입력창에 무언가를 입력했을 때,
  // 실행되는 함수
  const updateCountryName = (e) => {
    setCountryName(e.target.value);
  };
  // 사용자가 금메달 입력창에 무언가를 입력했을 때,
  // 실행되는 함수
  const updateGoldMedal = (e) => {
    setGoldMedal(e.target.value);
  };
  // 사용자가 은메달 입력창에 무언가를 입력했을 때,
  // 실행되는 함수
  const updateSilverMedal = (e) => {
    setSilverMedal(e.target.value);
  };
  // 사용자가 동메달 입력창에 무언가를 입력했을 때,
  // 실행되는 함수
  const updateBronzeMedal = (e) => {
    setBronzeMedal(e.target.value);
  };

  const resetToInitState = () => {
    setCountryName("");
    setGoldMedal(0);
    setSilverMedal(0);
    setBronzeMedal(0);
  };

  const addNewCountry = (e) => {
    // 0. 유효성 검사
    // 이미 등록된 국가인지 확인하기
    // 이미 등록된 국가라면, 아무것도 안하기
    const existingCountry = countries.find(
      (country) => country.countryName === countryName
    );

    if (existingCountry) {
      alert("이미 등록된 국가입니다");
      return;
    }

    // 새로운 국가라면,
    // 1. 사용자가 입력창에 현재 입력한 값들을 가지고,
    // 새로운 국가 요소를 만들기
    const newCountry = {
      countryName: countryName,
      goldMedal: goldMedal,
      silverMedal: silverMedal,
      bronzeMedal: bronzeMedal,
    };

    const newCountries = [...countries, newCountry];
    // 2. countries 배열에 추가하기
    setCountries(newCountries);
    // 3. 입력창 값 초기화하기(리셋하기)
    resetToInitState();
  };

  const updateMedalInfo = (e) => {
    // 0. 유효성 검사
    // 이미 등록된 국가인지 확인하기
    // 이미 등록된 국가가 아니라면, 아무것도 안하기
    const existingCountry = countries.find(
      (country) => country.countryName === countryName
    );

    if (!existingCountry) {
      alert("등록되지 않은 국가입니다");
      return;
    }

    // CRUD: Create 생성 Read 조회(읽기) Update 업데이트 Delete 삭제
    // 업데이트 하기
    const updatedCountries = countries.map((country) => {
      // country는 어떤 구조냐면,
      // { countryName, goldMedal, silverMedal, bronzeMedal }
      if (country.countryName === countryName) {
        return {
          ...country,
          goldMedal: goldMedal,
          silverMedal: silverMedal,
          bronzeMedal: bronzeMedal,
        };
      } else {
        return country;
      }
    });

    setCountries(updatedCountries);
    // 3. 입력창 값 초기화하기(리셋하기)
    resetToInitState();
  };

  const deleteCountry = (countryName) => {
    const updatedCountries = countries.filter(
      (country) => country.countryName !== countryName
    );
    setCountries(updatedCountries);
  };
  return (
    <div className="main-container">
      <div className="input-form">
        <div className="input-field">
          <label>국가이름</label>
          <input type="text" value={countryName} onChange={updateCountryName} />
        </div>
        <div className="input-field">
          <label>금메달</label>
          <input type="number" value={goldMedal} onChange={updateGoldMedal} />
        </div>
        <div className="input-field">
          <label>은메달</label>
          <input
            type="number"
            value={silverMedal}
            onChange={updateSilverMedal}
          />
        </div>
        <div className="input-field">
          <label>동메달</label>
          <input
            type="number"
            value={bronzeMedal}
            onChange={updateBronzeMedal}
          />
        </div>
      </div>
      <div className="button-group">
        <button type="button" onClick={addNewCountry}>
          국가추가
        </button>
        <button type="button" onClick={updateMedalInfo}>
          업데이트
        </button>
      </div>
      {/* 국가 메달 대시보드 */}
      <div>
        {countries
          .sort((a, b) => b.goldMedal - a.goldMedal)
          .map((country) => (
            <div key={country.countryName}>
              <span>{country.countryName}</span>
              <span>{country.goldMedal}</span>
              <span>{country.silverMedal}</span>
              <span>{country.bronzeMedal}</span>
              <button
                type="button"
                onClick={() => deleteCountry(country.countryName)}
              >
                삭제
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
