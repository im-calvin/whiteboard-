import Head from "next/head";
import Link from "next/link";
import { useState, useCallback, useEffect } from "react";
import { Canvas, Layer, Rectangle, View } from "react-paper-bindings";
import { io } from "socket.io-client";
import { readEnv } from "~/utils/readEnv";

export default function Home() {
  const [color, setColor] = useState("red");
  const [roomId, setRoomId] = useState<string>("1234");

  const toggleColor = useCallback(() => {
    setColor(color === "red" ? "blue" : "red");
  }, [color]);

  const getRoomId = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/getRoomId`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    const roomId = (await response.json()) as string;
    setRoomId(roomId);
  };

  useEffect(() => {
    const socket = io(readEnv("NEXT_PUBLIC_API_ENDPOINT"));
    socket.on("connect", () => {
      console.log("socket connected");
    });
    socket.on("disconnect", () => {
      console.log("socket disconnected");
    });
    socket.on("message", (message) => {
      console.log("message received", message);
    });

    // whenever the user draws something, emit the event to the server
    socket.emit(
      "draw",
      {
        roomId: roomId,
        userId: "user1",
        shape: {
          x: 100,
          y: 100,
          width: 50,
          height: 50,
          color: "red",
        },
      },
      (data) => {
        console.log("draw event received", data);
      },
    );

    // whenever another user draws something, update the canvas
    socket.on("draw", (data) => {
      console.log("draw event received", data);
    });

    // Cleanup the socket connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <Head>
        <title>Whiteboard++</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-slate-600">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          {/* <Canvas width={window.innerWidth} height={window.innerHeight}>
            <View>
              <Layer>
                <Rectangle
                  center={[100, 100]}
                  fillColor={color}
                  size={[50, 50]}
                  onClick={toggleColor}
                />
              </Layer>
            </View>
          </Canvas> */}
          <button onClick={getRoomId}>
            <h2 className="text-2xl text-white">Create a Room</h2>
          </button>
          <h3 className="text-xl text-white">{"roomId:" + roomId}</h3>
        </div>
      </main>
    </>
  );
}
