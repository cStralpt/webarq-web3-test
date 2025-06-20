"use client";
import { contractABI, contractAddress } from "@/constants/WEBARC_CONTRACT";
import { publicClient, walletClient } from "@/utils/client";
import Image from "next/image";
import { useState } from "react";
export default function Home() {
  const [account, setAccount] = useState<string | null>(null);
  const [value, setValueState] = useState<number | null>(0);
  const hanldeConnectWallet = async () => {
    try {

      const account = await walletClient.requestAddresses()

      console.log("Connected account:", account[0]);
      setAccount(account[0]);
      return account;
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  const setValue = (value: number) => {
    console.log("Setting value:", value);
    walletClient.writeContract({
      address: contractAddress,
      abi: contractABI,
      functionName: "storeValue",
      args: [value],
    }).then((result) => {
      console.log("Transaction result:", result);
    }).catch((error) => {
      console.error("Error setting value:", error);
    });
  }
  const handleGetValue = () => {
    publicClient.readContract({
      address: contractAddress,
      abi: contractABI,
      functionName: "getValue",
    }).then((result) => {
      console.log("Current value in contract:", result);
      setValueState(result);
    }).catch((error) => {
      console.error("Error getting value:", error);
    });
  }
  return (
    <main className="">
      {account && (<h1 className="text-2xl text-center">Connected Account: {account}</h1>)}
      <form action="" onSubmit={(e) => {
        e.preventDefault();

        const value = parseInt((e.target as HTMLFormElement).elements[0].value);
        if (!isNaN(value)) {
          setValue(value);
        } else {
          console.error("Invalid value entered");
        }
      }}>
        <input type="number" className="bg-amber-300 text-white" name="value" id="" />
        <button type="submit">set value</button>
      </form>
      {value !== null && (
        <h2 className="text-2xl text-center">Current Value: {value}</h2>
      )}
      <button type="button" className="p-2 bg-emerald-400 text-white" onClick={handleGetValue}>get value</button>
      <button type="button" className="hover:bg-amber-300" onClick={hanldeConnectWallet}>connect wallet</button>
    </main>
  );
}
