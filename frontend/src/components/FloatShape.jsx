import {motion}from 'framer-motion'
const FloatShape = ({color,size,top,delay,left}) => {
  return (
    <motion.div className={`${color} ${size} ${top}  ${left}
    absolute  opacity-0.2
    blur-xl
    rounded-full`}
    animate={{
        y:['0','100%','0'],
        x:['0','100%','0']
    }}
    transition={{
        duration:20,ease:'linear',repeat:Infinity,delay
    }}
    style={{
        left:left,
        top:top
    }}
    aria-hidden={true}
    >
      
    

    </motion.div>
  )
}

export default FloatShape
