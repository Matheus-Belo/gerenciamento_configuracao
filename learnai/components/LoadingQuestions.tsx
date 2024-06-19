import React from 'react'
import { Progress } from "@/components/ui/progress"

type Props = {finished: boolean}

const LoadingQuestions = ({ finished }: Props) => {
  const [progress, setProgress] = React.useState(10);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (finished) return 100;
        if (prev === 100) {
          return 0;
        }

        if(prev > 90){
          if(prev>99){
            return prev
          }
          if (Math.random() < 0.1) {
            return prev + 0.3;
          }
          return prev + 0.05

          

        }
        if (Math.random() < 0.1) {
          return prev + 2;
        }
        
        return prev + 0.5;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [finished]);
  return (
    <div className='w-[50vw] h-[50vh] absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 bg-background '>
      <Progress value={progress}/>
    </div>
  )
}

export default LoadingQuestions