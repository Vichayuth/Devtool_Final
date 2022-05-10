import {useState, useEffect} from 'react'
import profile from './profile';
import { Link, Route, Routes, Navigate} from 'react-router-dom';
import axios from 'axios'
import Modal from 'react-modal';



function Profile() {

    const [user, setUser] = useState([])
    const [id, setId] = useState("")
    const [fname, setFname] = useState("")
    const [lname, setLname] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [avatar, setAvatar] = useState("")
    const [_id, set_Id] = useState("")
    useEffect(() => {
        getUser()
      }, [])
    function getUser() {
        axios.get('http://localhost:3001/users', {crossdomain: true})
        .then(response => {
            setUser(response.data)
        })
    }

    function addUser() {
        if(user.filter((user) => user.id.toString() === id).length !== 0){
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
        <div style={{display:'grid',justifyContent:'center'}}>
            <h1 style={{textAlign:'center'}}> ระบบรับสมัครนักศึกษา </h1>
           <Link to='/'> <button>ค้นหาหลักสูตร</button></Link>

           <div style={{margin:'10%'}}>
           <h3 style={{textAlign:'center'}}> ค้นหาหลักสูตรที่ต้องการ </h3>

           <form style={{display:'grid',justifyContent:'center'}}>
           
                <label>
                     id: <br />
                     <input type="text" name="id" onChange={e => setId(e.target.value)} required/>
                </label><br />
                <label>
                     FirstName: <br />
                     <input type="text" name="fname" onChange={e => setFname(e.target.value)} required />
                </label><br />
                <label>
                     LastName: <br />
                     <input type="text" name="lname" onChange={e => setLname(e.target.value)} required />
                </label><br />
                <label>
                     UserName: <br />
                     <input type="text" name="username" onChange={e => setUsername(e.target.value)} required />
                </label><br />
                <label>
                     Email: <br />
                     <input type="email" name="email" onChange={e => setEmail(e.target.value)} required/>
                </label><br />
                <label>
                     Avatar: <br />
                     <input type="text" name="avatar" onChange={e => setAvatar(e.target.value)} required/>
                </label><br /><br />
                    <input type="submit" value="Submit" onSubmit={addUser} />
            </form>
            </div>
        </div>

        </>
    )

}

export default Profile;