import {useState, useEffect} from 'react'
import profile from './profile';
import { Link, Route, Routes, Navigate} from 'react-router-dom';
import axios from 'axios'
import Modal from 'react-modal';
import Dropdown from 'react-dropdown';
import Select from 'react-select'




function Home() {

    const [course, setCourse] = useState([])
    const [id, setId] = useState("")
    const [fname, setFname] = useState("")
    const [lname, setLname] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [avatar, setAvatar] = useState("")
    const [_id, set_Id] = useState("")
    const faculty = [
        { value: 'สถาปัตยกรรม ศิลปะและการออกแบบ', label: 'สถาปัตยกรรม ศิลปะและการออกแบบ' },
        { value: 'วิทยาศาสตร์', label: 'วิทยาศาสตร์' },
        { value: 'เทคโนโลยีสารสนเทศ', label: 'เทคโนโลยีสารสนเทศ' }
      ]
      const wait = [
        { value: '(1/2565)รอบ 1-รับสมัครประจำภาคการศึกษา', label: '(1/2565)รอบ 1-รับสมัครประจำภาคการศึกษา' },
        { value: '(1/2565) รอบ 1-รับสมัครแบบเลือกเข้าศึกษาในภาคการศึกษาที่ต้องการ', label: '(1/2565) รอบ 1-รับสมัครแบบเลือกเข้าศึกษาในภาคการศึกษาที่ต้องการ' },
        { value: '(2/2565) รอบ 1-รับสมัครประจำภาคการศึกษา', label: '(2/2565) รอบ 1-รับสมัครประจำภาคการศึกษา' }
      ]
      const project = [
        { value: 'รับเข้า 1/2565 คณะสถาปัตยกรรม ศิลปะและการออกแบบ', label: 'รับเข้า 1/2565 คณะสถาปัตยกรรม ศิลปะและการออกแบบ' },
        { value: 'รับเข้า 1/2565 คณะวิทยาศาสตร์', label: 'รับเข้า 1/2565 คณะวิทยาศาสตร์' },
        { value: 'รับเข้าเทอม 1/2565 คณะเทคโนโลยีสารสนเทศ', label: 'รับเข้าเทอม 1/2565 คณะเทคโนโลยีสารสนเทศ' }
      ]
      const courses = [
        { value: 'หลักสูตรนานาชาติ', label: 'หลักสูตรนานาชาติ' },
        { value: 'หลักสูตรไทย', label: 'หลักสูตรไทย' }
        
       
      ]
    useEffect(() => {
        getUser()
      }, [])
    function getUser() {
        axios.get('http://localhost:3001/course', {crossdomain: true})
        .then(response => {
            setCourse(response.data)
        })
    }

    function addUser() {
        if(course.filter((user) => user.id.toString() === id).length !== 0){
            alert("ไม่สามารถใช้ ID ซ้ำกันได้")

          }
          else{
            let body = {

            id: id,
            fname: fname,
            lname: lname,
            username: username,
            email: email,
            avatar: avatar

        };
        axios.post("http://localhost:3001/users/create", body)
      .then((res) => {
          alert("ADD COMPLETE")
        console.log(res)
      })
      .catch((error) => {
        console.log(error)
      })}

        
    }

    return(
        <>
        <div style={{backgroundColor:'#60AC63', padding:'5%'}}>
        <div style={{display:'grid',justifyContent:'center'}}>
            <h1 style={{textAlign:'center'}}> ระบบรับสมัครนักศึกษา </h1>
           <Link to='/Profile'> <button>เพิ่มหลักสูตร</button></Link>

           <div style={{margin:'10%'}}>
           <h3 style={{textAlign:'center'}}> ค้นหาหลักสูตรที่ต้องการ </h3>

           <form style={{display:'grid',justifyContent:'center', backgroundColor:'white', borderRadius:'5px'}}>
           
                <label>
                     ค้นหา คณะ: <br />
                     <Select options={faculty} />
                </label><br />
                <label>
                     ค้นหา รอรับสมัคร: <br />
                     <Select options={wait} />
                </label><br />
                <label>
                     ค้นหา โครงการ: <br />
                     <Select options={project} />
                </label><br />
                <label>
                     ค้นหาหลักสูตร ไทย/นานาชาติ: <br />
                     <Select options={courses} />
                </label><br />
                <label>
                     คำค้นหาเพิ่มเติม: <br />
                     <input type="email" name="email" onChange={e => setEmail(e.target.value)} required/>
                </label><br />

            </form>
            </div>

            

        </div>
        <div >
            {course.map((user, index) => (
                <div  key={user._id} style={{backgroundColor: "white", margin: 60, padding: 30, borderRadius:8}}>
                
                <h3>หลักสูตร: {user.course}</h3>
                <h3>แผนการศึกษา: {user.plan} | ช่วงเวลาเรียน: {user.period} </h3>
                <h4 style={{color: '#F1842E'}}>คณะ:{user.faculty}</h4>
                <h5>หลักสูตร: {user.course}</h5>
                <h4>วันที่เปิดรับสมัคร: {user.open_date} - {user.end_date}</h4>
                </div>
        ))}

            </div>
        </div>
        </>
    )

}

export default Home;