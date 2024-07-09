import React, { useState, useEffect } from 'react';

const Loader = ({ isLoading }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isLoading) {
      let timer;
      const updateProgress = () => {
        setProgress((prev) => {
          if (prev < 100) {
            const increment = Math.random() * 10;
            const nextProgress = prev + increment;
            return nextProgress < 100 ? nextProgress : 100;
          } else {
            clearInterval(timer);
            return 100;
          }
        });
      };
      timer = setInterval(updateProgress, 200);
      return () => clearInterval(timer);
    } else {
      setProgress(0);
    }
  }, [isLoading]);

  return (
    isLoading && (<div  className="pl-[20px] overflow-hidden mb-px rounded-[25px] w-[35vw] h-[33px] bg-transparent border-[#ffffff] border-[thin] text-[#54ff03]">
<input className="w-[35vw] bg-transparent border-[#ffffff] border-[thin] text-[#54ff03]"
 placeholder='   Loading------>'
 color='white'
    style={{
        width: `${progress}%`,
        backgroundColor: '#06ed06a6',
        position: 'relative',
        left: '-5%',
        height: '33px',
        transition: 'width 0.2s cubic-bezier(0.25, 0.46, 0.13, 1.03) 0s'
      }}/> </div>)
  );
};

export default Loader;
