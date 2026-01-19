import React , {forwardRef} from "react"
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>
const Button = forwardRef<HTMLButtonElement , ButtonProps>(( props , ref)=>{
    return <button ref={ref} {...props} />
  }
  )


Button.displayName="Button Component"
export default Button