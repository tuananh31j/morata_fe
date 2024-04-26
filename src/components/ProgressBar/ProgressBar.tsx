import { Progress } from "antd"

const ProgressBar = ({stock}: {stock: number}) => {
  return (
    <>
      <Progress 
                            size={'small'}
                            percent={stock} 
                            showInfo={false} 
                            status="exception"/>  
    </>
  )
}

export default ProgressBar
