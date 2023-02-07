import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import {
  Button,
  ButtonGroup,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { Input } from "@chakra-ui/react";
import { DummyData } from "../types";
import { Flex, Spacer } from "@chakra-ui/react";

// key press of anything other than a-g should be dealt with

// DO THE ABOVE TOMORROW

type Props = {
  data: DummyData;
};

const Home: NextPage<Props> = (Props) => {
  const [noClicks, setNoClicks] = useState(0);
  const [keyPress, setKeyPress] = useState(+new Date());
  const [keyRelease, setKeyRelease] = useState(0);
  const [count, setCount] = useState(0);

  const router = useRouter();

  let date: number;

  const updateClicks = () => {
    // store the last click to preserve the button rendered
    setNoClicks(noClicks + 1);
    if (noClicks > 4) {
      router.push("/");
      setNoClicks(0);
    }
  };

  const onKeUp = (e: React.KeyboardEvent) => {
    console.log("key pressed date/time");
    date = +new Date();
    setKeyPress(date);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    console.log("key released date/time");
    const diff: number = +new Date() - keyPress;
    console.log(diff);
    setKeyRelease(diff / 1000);
    console.log(e.key);
    // if e.key is not a-g alert box
    if (e.key.match(/[h-z]/gi)) alert("This is not a musical note.");
    // figure out how to disable/look into focus
  };

  const dummyData: { id: number; name: string }[] = [
    {
      id: 1,
      name: "test",
    },
    {
      id: 2,
      name: "test 2",
    },
  ];

  console.log(Props);

  const handleClick = () => {
    setCount(count + 1);
  };

  const buttons = Array(count)
    .fill(count)
    .map((_, i: number) => (
      <Link key={i} href={`/${i}`}>
        <Button key={i} colorScheme="green">
          Button {i + 1}
        </Button>
      </Link>
    ));

  return (
    <div className={styles.container}>
      <Head>
        <title>Music App</title>
        <meta name="description" content="Music App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
			<h1 className="app-title">music app</h1>
		<div className="main-instructions">
				<ol>
					<li>Select a time signature from the menu</li>
					<li>Hold down a letter between a to g into the input box</li>
					<li>The type of note will be shown on screen </li>
					<li>You may create new pages to experiment with different notes and signatures</li>
					<li>You cannot input notes outside of a to g</li>
				</ol>
		</div>
        <div className="main-section">
          <Flex direction={"row"} justifyContent={"space-between"}>
            <Button colorScheme="red" onClick={handleClick}>
              New
            </Button>
            <Menu>
              <MenuButton as={Button}>Time Signature [TO DO]</MenuButton>
              <MenuList>
                <MenuItem>2/4</MenuItem>
                <MenuItem>3/4</MenuItem>
                <MenuItem>4/4</MenuItem>
                <MenuItem>6/8</MenuItem>
              </MenuList>
            </Menu>
          </Flex>

          <Flex key={count} direction={"row"} justifyContent="center">
            {buttons}
          </Flex>
          {/*<p>
          Add a dropdown menu to select the time signature and then program the
          timing of each note!!!! beats per min etc.
	</p>*/}

          {/*<Button colorScheme="red" onClick={updateClicks}>
          New
        </Button>
        {dummyData.map((a: { id: number; name: string }) => (
          <Link key={a.id} href={`/${a.id}`}>
            {a.name}
          </Link>
				))}*/}

          {/* map over the number of clicks and create a button for each  */}

          {/*Store the Date when the key is pressed. Store the Date when the key is released. Subtract the dates. */}
          <h1>CALCULATIONS FOR TIME SIGNATURES</h1>

					<p>2/4 => two crochets per semibreve</p>
					<p>3/4 => three crochet per semibreve</p>
					<p>4/4 => one crochet per semibreve</p>

          <p>
            program the functionality of upper and lower case (and remember
            steps between things like e/f etc etc)
          </p>
          {/* the input needs to be a component that can be used in all pages */}
          {/* deal with the upper and lower case letters */}
          {/* program functionality of mapping the time to a type of note */}
          {/* show the note either normal, flat, sharp and the type of note */}
          <Flex direction={"row"} justifyContent="center">
            <Input type="text" onKeyDown={onKeyDown} onKeyUp={onKeUp} />
            {/*<Button colorScheme="blue">Submit</Button>*/}
          </Flex>

          {/*Use submit instead of entering???*/}
          {keyRelease}
          {keyRelease < 0
            ? ""
            : keyRelease <= 0.25
            ? "semi-quaver"
              ? keyRelease <= 0.5
              : "quaver"
              ? keyRelease <= 1
              : "crotchet"
              ? keyRelease <= 2
              : "minimum"
              ? keyRelease <= 4
              : "semibreve"
            : ""}
          {/*keyRelease > 0 && keyRelease <= 0.25 ? "semi-quaver" : "no"*/}
          {keyRelease >= 0.25 && "semi-quaver"}
          {keyRelease >= 0.5 && "quaver"}
          {keyRelease >= 1 && "crotchet"}
          {keyRelease >= 2 && "minimum"}
          {keyRelease >= 4 && "semibreve"}
          {/*<h1>TO DO</h1>
         <p>Show the type of note and the case</p>
          <p>
            Program upper and lower case (for step up or down) and then show the
            type of note
          </p>
          <p>
            Maybe: detect the key pressed and why the note shown (oh that's an
            upper C so it's c#)
						</p>*/}
        </div>
      </main>
    </div>
  );
};

export default Home;
/* {noClicks === 0 && (
          <Link href="/">
            <Button colorScheme="green">one</Button>
          </Link>
        )}
        {noClicks === 1 && (
          <Link href="/page-two">
            <Button colorScheme="green">two</Button>
          </Link>
        )}
        {noClicks === 2 && (
          <Link href="/page-three">
            <Button colorScheme="green">three</Button>
          </Link>
        )}
        {noClicks === 3 && (
          <Link href="/page-four">
            <Button colorScheme="green">four</Button>
          </Link>
        )}
 */
