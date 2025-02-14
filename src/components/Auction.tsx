import { useState } from "react";

const Auction = () => {
  const [name, setName] = useState("");
  return (
    <div>
      <p>Name: {name}</p>
      <input onChange={(e) => setName(e.target.value)} value={name} />
    </div>
  );
};

export default Auction;
