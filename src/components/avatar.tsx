import  React , {useState } from "react";
import { forwardRef } from "react";

type AvatarProps = React.ImgHTMLAttributes<HTMLImageElement> & {
    src: string;
    alt: string;
    size?: number;
    fallback?: React.ReactNode;
}
const Avatar = forwardRef<HTMLImageElement , AvatarProps>((props, ref)=>{
     const [isLoaded, setLoaded] = useState(true);
     const [isError, setIsError] = useState(false);

     const { fallback , className} = props;



     console.log("isError", isError, "isLoading", isLoaded);

     if(isError || !isLoaded){
        return <div className={className}>{fallback || ''}</div>
     } 


    return <img ref={ref} {...props} 
    onLoad={()=> setLoaded(true)}
     onError={()=>{
         setIsError(true);
     }}
    />
   })


Avatar.displayName="Avatar"
export default Avatar;