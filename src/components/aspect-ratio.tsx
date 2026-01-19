
import React , {forwardRef} from "react";
type AspectRatioProps = React.HTMLAttributes<HTMLDivElement> & {
    ratio?: number;
    className?: string;
}

const AspectRatio = forwardRef<HTMLDivElement, AspectRatioProps>((props, ref)=>{
     const  { ratio = 1/1, style , className, ...restProps} = props;
    return <div className={`relative ${className}`}  style={{
           aspectRatio : ratio,
    }}>
           <div 
             {...restProps}
             ref={ref}
             style={{
                  ...style,
                  position : 'absolute',
                  inset : 0,
             }}
           />
    </div>
})

AspectRatio.displayName="Aspect Ratio Component"

export default AspectRatio;