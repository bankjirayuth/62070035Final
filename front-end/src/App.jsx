import React, { useState, useEffect } from "react";
import fetch from "cross-fetch";

export default function App() {
  const [info, setInfo] = useState([]);
  // const [cloneInfo, setCloneInfo] = useState("");
  const [faculity, setFaculity] = useState("none");
  // let cloneInfo;
  useEffect(() => {
    getData();
  }, [faculity]);

  var getData = async () => {
    try {
      const res = await fetch("http://localhost:4000/database", {
        method: "POST",
        body: JSON.stringify({
          faculity: faculity,
        }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });

      if (res.status >= 400) {
        throw new Error("Bad response from server");
      }
      const user = await res.json();
      setInfo(user);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChangeCategory = (event) => {
    setFaculity(event.target.value);
  };

  const CardsInfo = info.map((data, index) => {
    return (
      <div className="container" key={index}>
        <hr></hr>
        <h4>
          <b>{`คณะ ${data.faculty_name}`}</b>
        </h4>
        <p>{`หลักสูตร ${data.course_name}`}</p>
        <p>{`วันที่เปิดรับสมัคร ${data.open_date}`}</p>
        <p>{`ช่วงเวลาเรียน ${data.study_time}`}</p>
        <hr></hr>
      </div>
    );
  });

  return (
    <div>
      <h1>ค้นหาหลักสูตร|ปริญญาโท</h1>
      <label htmlFor="selectFac">ค้นหาด้วย คณะ</label>
      <br />
      <select
        value={faculity}
        name="selectFac"
        id="selectFac"
        onChange={handleChangeCategory}
      >
        <option disabled value="none">
          เลือกคณะ
        </option>
        <option value="อุตสาหกรรมอาหาร">อุตสาหกรรมอาหาร</option>
        <option value="ครุศาสตร์อุตสาหกรรมและเทคโนโลยี">
          ครุศาสตร์อุตสาหกรรมและเทคโนโลยี
        </option>
        <option value="แพทยศาสตร์">แพทยศาสตร์</option>
        <option value="สถาปัตยกรรมศิลปะและการออกแบบ">
          สถาปัตยกรรมศิลปะและการออกแบบ
        </option>
        <option value="เทคโนโลยีการเกษตร">เทคโนโลยีการเกษตร</option>
      </select>
      <br />
      <br />
      {faculity!=='none' ? (<h2>ผลการค้นหา</h2>) : (<div></div>)}
      <br />
      {CardsInfo}
    </div>
  );
}
