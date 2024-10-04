
import { motion } from 'framer-motion';
import { Loader } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
const EmailVerification = () => {
   
    const [code,setCode]=useState(["","","","","",""]);
    const{verifyEmail,isLoading,error}=useAuthStore();
    
    const inputRefs =useRef([]);
    const nav=useNavigate();
    const handleSubmit=async(e)=>{
        e.preventDefault()
        const ver=code.join("");
        try {
            await verifyEmail(ver);
            nav('/')
            alert("Email verified successfully");
        } catch (error) {
            console.log(error);
            
        }        
    }
    const [loading,setLoading]=useState(false)
    const handleChange=(index,value)=>{
        const newCode = [...code];

		// Handle pasted content
		if (value.length > 1) {
			const pastedCode = value.slice(0, 6).split("");
			for (let i = 0; i < 6; i++) {
				newCode[i] = pastedCode[i] || "";
			}
			setCode(newCode);

			// Focus on the last non-empty input or the first empty one
			const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
			const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
			inputRefs.current[focusIndex].focus();
		} else {
			newCode[index] = value;
			setCode(newCode);

			// Move focus to the next input field if value is entered
			if (value && index < 5) {
				inputRefs.current[index + 1].focus();
			}
		}
    }
    const handleKeyDown=(index,e)=>{
        if (e.key === "Backspace" && !code[index] && index > 0) {
			inputRefs.current[index - 1].focus();
		}
    }
    useEffect(()=>{
        if(code.every(diget=>diget !="")){
            handleSubmit(new Event('submit') )
        }
    },[code])
  return (
    <div>
      <motion.div 
    animate={{opacity:1,y:0}}
    initial={{opacity:0,y:20}}
    transition={{ duration: 0.5 }}
			className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl 
			overflow-hidden'>

      <div className='p-8'>
      <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500
       text-transparent bg-clip-text'>
          Verifiy Your Email
				</h2>
        <form className='space-y-6' onSubmit={handleSubmit} >
       <div className="flex gap-1 justify-between">
       {code.map((digit, index) => (
							<input
								key={index}
								ref={(el) => (inputRefs.current[index] = el)}
								type='text'
								maxLength='6'
								value={digit}
								onChange={(e) => handleChange(index, e.target.value)}
								onKeyDown={(e) => handleKeyDown(index, e)}
								className='w-12 h-12 text-center text-2xl font-bold bg-gray-700 text-white border-2 border-gray-600 rounded-lg focus:border-green-500 focus:outline-none'
							/>
						))}
       </div>
       {error&&<p className='text-red-500 font-bold '>{error}</p>}
          <motion.button
						className='mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white 
						font-bold rounded-lg shadow-lg hover:from-green-600
						hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
						 focus:ring-offset-gray-900 transition duration-200'
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						type='submit'
                        disabled={isLoading}
            
					>
                        {isLoading?<Loader className=' animate-spin  ' /> :"Verify"}
			</motion.button>

        </form>
      </div>


    </motion.div>
    </div>
  )
}

export default EmailVerification
