
import AspectRatio from "./components/aspect-ratio"
import Button from "./components/button"
import Avatar from './components/avatar'

const imgAddr = "https://images.pexels.com/photos/17791448/pexels-photo-17791448/free-photo-of-disposable-cup-by-sunglasses-on-table.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"

const imgAddr2 = "https://images.pexels.com/photos/15865635/pexels-photo-15865635/free-photo-of-empty-street-in-old-town-in-wroclaw.jpeg?auto=compress&cs=tinysrgb&h=400&fit=crop&crop=focalpoint&dpr=1"
const App = () => {
  const url = import.meta.env.VITE_API_URL;
  return (
    <div className="p-5">
      <div className="w-full flex items-center justify-center my-5" >
        <h1 className="text-3xl text-blue-400 font-bold underline">Build Reusable UI Components (prod)</h1>

      </div>
      <p> url : {url}</p>
      <Button className="bg-amber-300 rounded-sm px-5 py-2 hover:opacity-80 cursor-pointer" onClick={() => alert("hello world")}>
        this is button
      </Button>
      <AspectRatio ratio={1 / 1.2} className="bg-amber-200  w-[500px]" >
        <img src={imgAddr} alt="image" className="w-full h-full object-cover" />
      </AspectRatio>

      <Avatar src={imgAddr2} alt="image" className="w-10 h-10 rounded-full bg-blue-200 object-cover text-white flex items-center justify-center" fallback={"A"} />
    </div>
  );
};

export default App;