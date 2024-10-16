import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from 'uuid';
import "react-toastify/dist/ReactToastify.css";

const Manager = () => {
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  const getPasswords=async ()=>{
    let req= await fetch("http://localhost:3000/")
    let passwords = await req.json();
    console.log(passwords)
      setPasswordArray(passwords);
    
  }

  useEffect(() => {
    getPasswords()
  }, []);

  const savePassword = async() => {
    console.log(form);
    setPasswordArray([...passwordArray, {...form,id:uuidv4()}]);

    await fetch("http://localhost:3000/",{method:"DELETE",headers:{"Content-Type":"application/json"},body: JSON.stringify({id: form.id})})

    await fetch("http://localhost:3000/",{method:"POST",headers:{"Content-Type":"application/json"},body: JSON.stringify({...form,id:uuidv4()})})
    setform({ site: "", username: "", password: "" })
    toast("Password Saved!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
  };

  const copyText=()=>{
    toast("Copied to Clipboard!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
  }

  const editPassword=(id)=>{
    console.log("Editing id is:",id)
    setform({...passwordArray.filter(i=>i.id===id)[0],id: id})
    setPasswordArray(passwordArray.filter(item=>item.id!==id))
    
  }

  const deletePassword=async (id)=>{
    console.log("Deleting id is:",id)
    let c=confirm("Do you really want to delete")
    if(c){
        setPasswordArray(passwordArray.filter(item=>item.id!==id))
        let res =await fetch("http://localhost:3000/",{method:"DELETE",headers:{"Content-Type":"application/json"},body: JSON.stringify({id})})
    }
    toast("Password Deleted!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
  }

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      <div class="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>
      <div className="text-center m-12">
        <h1 className="text-2xl font-bold">LockItDown</h1>
        <p>Your Password manager</p>
        <div className="flex flex-col mt-6">
          <input
            value={form.site}
            name="site"
            onChange={handleChange}
            type="text"
            className="w-full rounded-xl border-2 border-purple-400 outline-none p-4 py-1"
            placeholder="Enter website url" required
          />
          <div className="w-full flex gap-4 mt-6">
            <input
              value={form.username}
              onChange={handleChange}
              name="username"
              type="text"
              className="rounded-xl w-full border-2 border-purple-400 outline-none p-4 py-1"
              placeholder="Username" required
            />
            <input
              value={form.password}
              onChange={handleChange}
              name="password"
              type="text"
              className="rounded-xl w-full border-2 border-purple-400 outline-none p-4 py-1"
              placeholder="Password" required
            />
          </div>
          <button
            onClick={savePassword} 
            className="bg-purple-400 mt-6 rounded-xl w-[300px] block m-auto"
          >
            Save
          </button>
        </div>
      </div>
      <div className="show-passwords container mx-auto">
        <h2 className="text-2xl font-bold">Your Passwords</h2>
        {passwordArray.length === 0 && <div>No passwords to show</div>}
        {passwordArray.length != 0 && (
          <table className="table-auto w-full rounded-md overflow-hidden mt-6">
            <thead className="bg-purple-400 text-white ">
              <tr>
                <th className="py-2">Site</th>
                <th className="py-2">Username</th>
                <th className="py-2">Password</th>
                <th className="py-2">Action</th>
              </tr>
            </thead>
            <tbody className="bg-purple-200">
              {passwordArray.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="text-center w-32 ">
                      <a href={item.site} target="_blank">
                        {item.site}
                      </a>
                      <i onClick={copyText}  className="ri-clipboard-line px-3 cursor-pointer"></i>
                    </td>
                    <td className="text-center w-32">
                      {item.username}
                      <i onClick={copyText} className="ri-clipboard-line px-3 cursor-pointer"></i>
                    </td>
                    <td className="text-center w-32">
                      {item.password}
                      <i onClick={copyText} className="ri-clipboard-line px-3 cursor-pointer"></i>
                    </td>
                    <td className="text-center w-32 ">
                      <span onClick={()=>editPassword(item.id)}><i className="ri-edit-2-fill cursor-pointer"></i></span>
                      <span onClick={()=>deletePassword(item.id)}><i className="ri-delete-bin-6-line px-3 cursor-pointer"></i></span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default Manager;
