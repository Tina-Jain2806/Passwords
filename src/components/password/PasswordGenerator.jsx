import { Copy } from 'lucide-react';
import { useCallback,  useEffect, useRef, useState } from 'react';
// import zxcvbn from 'zxcvbn';

function PasswordGenerator() {

  const [length, setLength] = useState(6);
  const [numAllow, setNumAllow] = useState(false);
  const [charAllow, setCharAllow] = useState(false);
  const [password, setPassword] = useState("");
  const [isCopied,setIsCopied]=useState(false);
  // const [strength,setStrength]=useState("");


  const generatePassword = useCallback(() => {

    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllow) {
      str += "0123456789";
    }
    if (charAllow) {
      str += "~!@#%$%^&*()_+-=`',./<>?";
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random()*str.length+1);
      pass += str.charAt(char);
    }
    setPassword(pass);
    // console.log(zxcvbn(password).crack_times_display);
   
    
  }, [length, numAllow, charAllow, setPassword]);

  useEffect(()=>{
      generatePassword();
      
  },[length,numAllow,charAllow,generatePassword]);

  const passwordRef=useRef(null);

  const copyPassword=useCallback(()=>{

    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
    setIsCopied(true);
    setTimeout(()=>{setIsCopied(false);
    },1500);
  },[password,setIsCopied]
  
  )

  return (

    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
      <div className="flex flex-col  w-full bg-slate-900 rounded-xl px-2 py-2 max-w-md ">
        <h1 className="text-3xl text-white text-center mb-4 ">Password Generator</h1>

        <div className="flex overflow-hidden rounded-lg shadow mb-4 mt-4 gap-x-2">
          <input type="text"
            value={password}
            className="outline-none rounded-lg w-full py-2 px-3"
            readOnly 
            ref={passwordRef}
            />
          <button className='shrink-0 px-3 text-white outline-none ' onClick={copyPassword}>
            <Copy />
            </button>
            {isCopied&&<span className='text-white py-2'>Copied!</span>}
            
        </div>

        <div className='flex gap-x-2 items-center mt-4'>

          <div className='flex gap-x-1 items-center'>
            <input type="range" min={6} max={20} className='cursor-pointer' value={length}
              onChange={(e) => setLength(e.target.value)} />
            <label className='text-orange-600'>Length: {length}</label>
          </div>

          <div className='flex gap-x-1'>
            <input type="checkbox" defaultChecked={numAllow} onChange={() => { setNumAllow((prev) => !prev) }} />
            <label className='text-orange-600'>Numbers</label>

          </div>
          <div className='flex gap-x-1'>
            <input type="checkbox" defaultChecked={charAllow} onChange={() => { setCharAllow((prev) => !prev) }} />
            <label className='text-orange-600'>Characters</label>

          </div>

        </div>
      

        <div className=' flex justify-center text-centerh-10 mt-4 '>
          <button className='text-white cursor-pointer font-medium bg-blue-600  w-full rounded-md py-2 mt-4 mb-4 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500' onClick={generatePassword}>Regenerate</button>
          {/* <h1>{zxcvbn(password).crack_times_display()}</h1> */}
        
        </div>
       
        


      </div>
    </div>

  )
}

export default PasswordGenerator;