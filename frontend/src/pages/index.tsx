import Head from "next/head";
import Link from "next/link";
import { useState, useCallback, useEffect } from "react";
import { Canvas, Layer, Rectangle, View } from "react-paper-bindings";
import DrawingCanvas from "~/components/DrawingCanvas";
import { env } from "~/env.mjs";

export default function Home() {
  const [color, setColor] = useState("red");
  const [room, setRoom] = useState<string>("1234");
  const [username, setUsername] = useState<string>(
    env.NEXT_PUBLIC_SECOND === "true" ? "user2" : "user1",
  );

  console.log(username);

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
          <DrawingCanvas username={username} room={room} />
        </div>
      </main>
    </>
  );
}
