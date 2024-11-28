import doneRound from "../assets/Done_round.svg";

const DoneCircle = () => {
  return (
    <div className="w-5 h-5 rounded-full bg-[#3662E3] flex justify-center items-center" >
        <img src={doneRound} alt="done icon" className="w-3 h-3" />
    </div>
  )
}

export default DoneCircle